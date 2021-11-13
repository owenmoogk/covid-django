import React from 'react';

export default function Points(props){
    return(
        <div className='display'>
            <div className='display'>
                <div className="item" style={{backgroundColor: "rgba(118, 216, 255, 0.9)"}}>
                    <div className="main" id="totalPoints"></div>
                    <div className="sub">Points</div>
                </div>
            </div>
            <button onclick="setHome()">Set home to current location.</button>
        </div>
    )
}