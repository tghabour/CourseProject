import React from 'react';
import uiuc from './images/uiuc.png';
import "./css/output.css"

export function Header() {
    return (
        <div className='flex item-center max-h-sx shadow-md mb-10'>
            <div className='max-w-xs'>
                <img src={uiuc} alt="uiuc logo" className=''/>
            </div>
            <div className='flex-col'>
                <div className='container h-1/3 w-full align-middle min-w-1/3'></div>
                <span className=' text-3xl'>CS410 Text Retrieval Project</span>
                <div className='h-1/3 w-full align-middle '></div>
            </div>
        </div>

    )
}
