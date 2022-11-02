import React from 'react';
import {ResponsivePlayer} from "./player"


export function LeftNav() {
    return (
        <div>
            <h3>Table of Contents</h3>
            <ul>
                <li>Week 1</li>
                <li>Week 2</li>
                <li>Week 3</li>
                <li>Week 4</li>
                <li>Week 5</li>
                <li>Week 6</li>
                <li>Week 7</li>
                <li>Week 8</li>
                <li>Week 9</li>
                <li>Week 10</li>
            </ul>
        </div>
    )
}
export function SearchButton() {
    return (
        <div className='container mx-auto flex flex-row mb-3'>
            <input className='container w-2/3 px-10 mr-2 focus:outline-2 outline-orange-300 bg-orange-100 rounded text-sm text-gray-500' type="text" placeholder="Search query..." />
            <button class="container w-1/3 h-10 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white rounded text-sm">
                Search Class Content
            </button>
        </div>

    )
}
export function Result(props) {
    return (
        <div className='button flex flex-col hover:bg-orange-50 rounded p-3 object-fit'>
            <a href={props.link} className='hover:underline text-sky-400 visited:text-indigo-800'>{props.title}</a>
            <span className='text-gray-500'>{props.description}</span>
        </div>
    )
}
export function SearchResults() {
    return (
        <div className=' container mx-auto max-h-80 overflow-x-auto mb-3'>
                <Result link='1' title="Lesson 1.1: Natural language processing" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." video="" />
                <Result link='2' title="Lesson 1.2: Text access" description="Ultrices neque ornare aenean euismod elementum nisi. Venenatis lectus magna fringilla urna porttitor rhoncus dolor. Mi in nulla posuere sollicitudin. Volutpat ac tincidunt vitae semper quis. Ac tincidunt vitae semper quis lectus nulla at volutpat diam. Magna sit amet purus gravida quis blandit turpis cursus. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Ipsum consequat nisl vel pretium lectus. Nec ultrices dui sapien eget. Dolor sit amet consectetur adipiscing elit. Tincidunt lobortis feugiat vivamus at. Arcu felis bibendum ut tristique et egestas. Nibh praesent tristique magna sit amet purus gravida quis. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor." video="" />
                <Result link='3' title="Lesson 1.3: Text retrieval" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nulla facilisi etiam dignissim diam quis enim lobortis. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Id consectetur purus ut faucibus pulvinar elementum integer. Nisi lacus sed viverra tellus in." video="" />
                <Result link='4' title="Lesson 1.4: Overview of text retrieval methods" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." video="" />
                <Result link='5' title="Lesson 1.5: Vector space model" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sodales ut etiam sit amet nisl purus in. Id volutpat lacus laoreet non curabitur gravida arcu ac. Massa vitae tortor condimentum lacinia. Nunc scelerisque viverra mauris in." video="" />
        </div>
    )
}
export function VideoPlayer() {

    return (
        <div className=' mb-3'>
            <ResponsivePlayer />
        </div>
    )
}

export function DownloadBar() {
    return (
        <div className=' text-center '>
            <button className='pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4'>
                MP4
                <span className='pl-1 pt-0.5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-arrow-down" viewBox="0 0 16 16">
                    <path d="M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z"/>
                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                    </svg>
                </span>
            </button>
            <button className='pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4'>
                PDF
                <span className='pl-1 pt-0.5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-arrow-down" viewBox="0 0 16 16">
                    <path d="M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z"/>
                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                    </svg>
                </span>
            </button>
            <button className='pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4'>
                Texts
                <span className='pl-1 pt-0.5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-arrow-down" viewBox="0 0 16 16">
                    <path d="M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z"/>
                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                    </svg>
                </span>
            </button>

        </div>
    )
}

export function TextBox() {
    return (
        <div className='container mx-auto mt-3 p-3 max-h-80 overflow-x-auto rounded-md border-2 border-gray-300 text-sm text-gray-500 '>
            <p className='m-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In ornare quam viverra orci sagittis. Eu consequat ac felis donec et. Leo duis ut diam quam nulla porttitor massa id. Pharetra magna ac placerat vestibulum lectus mauris. In tellus integer feugiat scelerisque varius morbi enim nunc. Nulla aliquet enim tortor at auctor urna nunc id. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Velit laoreet id donec ultrices tincidunt arcu non sodales. Sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum. Sem viverra aliquet eget sit amet tellus cras. Nibh praesent tristique magna sit amet purus. Pharetra pharetra massa massa ultricies mi. Arcu cursus vitae congue mauris rhoncus. Sem integer vitae justo eget magna fermentum.
            </p>
            <p className='m-2'>
            Integer quis auctor elit sed vulputate. Dui sapien eget mi proin sed libero enim. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Convallis posuere morbi leo urna molestie at elementum eu facilisis. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Facilisis sed odio morbi quis commodo odio. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Vitae aliquet nec ullamcorper sit amet. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Vitae et leo duis ut diam quam nulla porttitor massa. Sed arcu non odio euismod lacinia. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Morbi enim nunc faucibus a pellentesque sit amet porttitor eget. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh.
            </p>
            <p className='m-2'>
            Diam phasellus vestibulum lorem sed. Laoreet suspendisse interdum consectetur libero id faucibus. Non arcu risus quis varius quam quisque id diam vel. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Lacus vel facilisis volutpat est velit egestas dui id. Non sodales neque sodales ut etiam sit amet nisl. Neque gravida in fermentum et. Ut lectus arcu bibendum at varius. Sed odio morbi quis commodo odio aenean sed adipiscing diam. Arcu felis bibendum ut tristique et egestas quis ipsum suspendisse. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Mattis aliquam faucibus purus in massa tempor nec feugiat. Blandit libero volutpat sed cras ornare arcu dui vivamus. Vitae tempus quam pellentesque nec nam aliquam sem et. Porta non pulvinar neque laoreet suspendisse interdum. Massa id neque aliquam vestibulum morbi. Netus et malesuada fames ac. Urna neque viverra justo nec ultrices dui. Faucibus interdum posuere lorem ipsum.
            </p>
            <p className='m-2'>
            Elit at imperdiet dui accumsan sit. Diam donec adipiscing tristique risus nec feugiat in fermentum posuere. Porttitor rhoncus dolor purus non enim praesent elementum. Aliquet eget sit amet tellus cras adipiscing enim. Purus ut faucibus pulvinar elementum integer enim neque. Fermentum et sollicitudin ac orci phasellus egestas tellus. Interdum varius sit amet mattis vulputate. Duis at tellus at urna condimentum. Semper feugiat nibh sed pulvinar proin gravida. Eu consequat ac felis donec et.
            </p>
            <p className='m-2'>
            Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Enim nunc faucibus a pellentesque sit amet porttitor. Viverra orci sagittis eu volutpat odio facilisis mauris sit. Ac felis donec et odio pellentesque diam volutpat commodo. Facilisis volutpat est velit egestas. Aliquam sem et tortor consequat id porta nibh venenatis. Vitae elementum curabitur vitae nunc. A erat nam at lectus. Lectus quam id leo in. Vulputate mi sit amet mauris commodo quis. Nisl vel pretium lectus quam id leo. Mi bibendum neque egestas congue quisque egestas diam. Amet dictum sit amet justo donec. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin.
            </p>
        </div>
    )
}

export function MainBody() {
    return (
        <div className=''>
            <SearchButton />
            <SearchResults />
            <div className='flex flex-row w-full'>
                <div className='container w-1/3'></div>
                <div className='container mx-auto w-full'>
                    <VideoPlayer />
                    <DownloadBar />
                </div>
                <div className='container w-1/3'></div>
            </div>
            <TextBox />
        </div>
    )
}

