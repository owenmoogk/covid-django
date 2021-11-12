import React, { useState } from 'react';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';

export default function Health(props) {

    const [alert, setAlert] = useState()

    function logTemp() {
        var temp = document.getElementById("tempInput").value
        temp = parseInt(temp)
        console.log(temp)
        if (Number.isInteger(temp) || isFloat(temp)) {
            if (temp > 100.4) {
                setAlert("That is a high temperature. Please have a look at public health guidelines for next steps.")
                return
            }
            else if (temp < 95) {
                setAlert("This is a very cold temperature. You may have hypothermia. Retake temperature for source of errors, and if you still have a low temperature consider contacting a doctor.")
                return
            }
            // MAKE THE REQUEST TO PUSH DATA HERE
        }
        else {
            setAlert("Please enter a valid number.")
        }
    }

    function isFloat(n) {
        return Number(n) == n && n % 1 == 0
    }


    const data = [{ name: 'Day 1', temperature: 98.6 }, { name: 'Day 1', temperature: 98.6 }, { name: 'Day 1', temperature: 98.6 }, { name: 'Day 1', temperature: 98.6 }, { name: 'Day 1', temperature: 98.6 }, { name: 'Day 1', temperature: 98.6 }, { name: 'Day 1', temperature: 98.6 }]

    return (
        <>
            <div id='chartContainer'>
                <LineChart width={900} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="temperature" stroke="#ff0000" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} domain={[95, 101]} />
                    <Tooltip style={{ color: 'black' }} />
                </LineChart>
            </div>
            <div className="input" >
                <p>Enter temperature in fahrenheit.</p>
                <input type="text" id="tempInput" />
                <br />
                <button onClick={() => logTemp()}>Enter</button>
                <p>{alert}</p>
                <br />
            </div>
        </>
    )
}