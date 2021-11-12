import React from 'react';

export default function Health(props) {
    return (
        <>
            <div className='display'>
                <canvas id="myChart" width="400" height="100"></canvas>
            </div>
            <div className="input">
                <p>Enter temperature in fahrenheit.</p>
                <input type="text" id="tempInput" />
                <br />
                <button onclick="logTempFromInput()" type="button">Enter</button>
            </div>
        </>
    )
}