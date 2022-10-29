import React, {Component} from 'react'
import ReactPlayer from 'react-player'

export class ResponsivePlayer extends Component {
    render () {
      return (
        <div className='player-wrapper'>
          {/* <ReactPlayer
            className='react-player'
            //url = {video}
            url='https://www.youtube.com/watch?v=W-jvyGyEifQ&list=RDze1pC-4mhfY'
            width='100%'
            height='100%'
            controls={true}
          /> */}
            <video  className="rounded-md"
            width="100%" 
            height="100%" 
            controls
            //</div>src='https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'>
            //src='https://cs410videostorage.s3.amazonaws.com/Chapter1-Introduction.mp4'>
            src='https://cs410videostorage.s3.amazonaws.com/Lesson1.1.mp4'>
            </video>
        </div>
      )
    }
  }
