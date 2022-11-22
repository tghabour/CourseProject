import pysrt
import scenedetect
import glob
import re
import os
import shutil

def build_corpus(srt_file,data,metadata):
    print("  Processing {}...".format(srt_file),end='')
    # Get file name from path+filename
    file_name = srt_file.split("/")[-1]
    # Check if there are at least three numbers in filename, which are usually lesson, week, lesson (again)
    if len(re.findall(r'\d+',file_name)) < 3:
        print("ERROR: unexpected filename format")
        return
    # Format from coursera-dl seems to typically be $lesson_[lesson-]$week-$lesson-$lessonname.$lang.$extention
    nums = re.findall(r'\d+',file_name)
    wl = "W"+str(nums[1]).rjust(2,'0')+"_L"+str(nums[2]).rjust(2,'0')
    # Trim leading text
    lname = re.sub(r'^\d+.*\d+-\d-','',file_name)
    # Trim extensions
    lname = re.sub(r'\..*$','',lname)
    # Replace '-' with spaces
    lname = re.sub(r'-',' ',lname)
    # Capitalize every word
    lname = lname.title()
    # Check if there is a matching mp4 file
    mp4_filename = re.sub(r'\..*$','.mp4',srt_file)
    if not os.path.exists(mp4_filename):
        print("ERROR: matching .mp4 file missing")
        return
    print()

    # Load subtitles
    subs = pysrt.open(srt_file)

    # Find scenes in video file
    detector = scenedetect.ContentDetector(threshold=10,luma_only=True)
    scene_list = scenedetect.detect(mp4_filename, detector, show_progress=True)

    # Step through scenes and concatenate all subtitles in range of scene
    for i, scene in enumerate(scene_list):
        # Get start and end times, and split into hh:mm:ss components
        start_time = scene[0].get_timecode(precision=0).split(':')
        end_time = scene[1].get_timecode(precision=0).split(':')

        # Convert times to `int`s
        start_time = [int(_) for _ in start_time]
        end_time = [int(_) for _ in end_time]

        # Get matching subtitles for the time slice
        # XXX What happens to captions that span scenes? Which scene do they belong to? Currently neither, and they get lost
        section_subs = subs.slice(starts_after={'hours':start_time[0],'minutes':start_time[1],'seconds':start_time[2]},
                                  ends_before={'hours':end_time[0],'minutes':end_time[1],'seconds':end_time[2]+1})

        # Concatenate all of the slices together, removing any newlines along the way
        section_sub_list = []
        for part in section_subs:
            section_sub_list.append(re.sub('\n',' ',part.text))
        section_sub = " ".join(section_sub_list)

        # Remove any `[SOUND]` and `[MUSIC]` since they don't add any searchable information
        section_sub = re.sub(r'\[MUSIC\]','',section_sub)
        section_sub = re.sub(r'\[SOUND\]','',section_sub)

        # Write out only if there's data to write
        if len(section_sub) > 1:
            print('    Scene {}: {}:{}:{}-{}:{}:{}'.format(i,
                                                           start_time[0],
                                                           start_time[1],
                                                           start_time[2],
                                                           end_time[0],
                                                           end_time[1],
                                                           end_time[2]))
            data.write(section_sub + '\n')
            #print(wl + '\t' + str(start_time[0]*60*60+start_time[1]*60+start_time[2]) + '\t' + lname + '\t' + re.sub(r'\..*$','',file_name) + '\n')
            metadata.write(wl + '\t' + str(start_time[0]*60*60+start_time[1]*60+start_time[2]) + '\t' + lname + '\t' + re.sub(r'\..*$','',file_name) + '\n')

# Walk through each directory and create corpus based on it
for i in os.scandir():
    if i.is_dir() and i.name[0] != '.':
        corpus = i.name
    else:
        # Bail out if not a directory, or a hidden directory
        continue

    print("Processing {}...".format(corpus))
    print("  Clean up existing instance...",end='')
    # Delete existing instance of corpus in api/corpora/ so it can be replaced
    path = "../api/corpora/" + corpus
    shutil.rmtree(path, ignore_errors=True)
    print("Done")

    print("  Create new target directory...",end='')
    # (Re)create target corpus directory and populate configuration files
    path = "../api/corpora/" + corpus
    os.mkdir(path)
    print("Done")
    path = path + "/"
    print("  Creating {}-config.toml...".format(corpus),end='')
    # Create config.toml
    with open(path+corpus+'-config.toml','w') as file:
        file.write('prefix = "./corpora"\n')
        file.write('stop-words = "./corpora/stopwords.txt"\n')
        file.write('\n')
        file.write('dataset = "' + corpus + '"\n')
        file.write('corpus = "' + corpus + '-file.toml"\n')
        file.write('index = "./corpora/' + corpus + '/idx"\n')
        file.write('\n')
        file.write('[[analyzers]]\n')
        file.write('method = "ngram-word"\n')
        file.write('ngram = 1\n')
        file.write('filter = "default-unigram-chain"\n')
    print("Done")
    # Create file.toml
    print("  Creating {}-file.toml...".format(corpus),end='')
    with open(path+corpus+'-file.toml','w') as file:
        file.write('type = "line-corpus"\n')
        file.write('\n')
        file.write('store-full-text = true\n')
        file.write('\n')
        file.write('metadata = [{name = "video_id", type = "string"},\n')
        file.write('            {name = "start_time", type = "uint"},\n')
        file.write('            {name = "title", type = "string"},\n')
        file.write('            {name = "AWS_file", type = "string"}]\n')
    print("Done")
    # Create data and metadata files
    with open(path+corpus+'.dat','w') as data, open(path+'metadata.dat','w') as metadata:
        # Get list of files to process
        # Need SRT, MP4 file pairs, so start with SRT and look for other half later
        srt_files = glob.glob(corpus+'/**/*.en.srt', recursive=True)
        for srt_file in srt_files:
            build_corpus(srt_file,data,metadata)
    print("Done")