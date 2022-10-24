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
            <video 
            width="100%" 
            height="100%" 
            controls
            src='https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'>
            </video>
        </div>
      )
    }
  }
