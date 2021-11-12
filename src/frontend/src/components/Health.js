import React from 'react';
import {
    LineChart, 
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';

export default function Health(props) {

    function logTempFromInput() {
        temp = document.getElementById("tempInput").value
        temp = parseInt(temp)
        if (Number.isInteger(temp) || isFloat(temp)) {
            if (temp > 100.4) {
                alert("That is a high temperature. Please have a look at public health guidelines for next steps.")
                window.open("https://www.ontario.ca/page/covid-19-stop-spread")
            }
            if (temp < 94) {
                alert("This is a very cold temperature. You may have hypothermia. Retake temperature for source of errors, and if you still have a low temperature consider contacting a doctor.")
                window.open("http://www.health.gov.on.ca/en/public/programs/emu/emerg_prep/et_cold.aspx")
            }
            var d = new Date()
            if (localStorage.getItem("lastEnterDate") != d.getDate()) {
                logTemp(temp)
                localStorage.setItem("lastEnterDate", d.getDate())
            }
        }
        else {
            alert("Please enter a valid number")
        }
    }

    function isFloat(n) {
        return Number(n) == n && n % 1 == 0
    }


    const data = [{ name: 'Page A', temperature: 400 },{ name: 'Page B', temperature: 425 },{ name: 'Page B', temperature: 450 },{ name: 'Page d', temperature: 400 },{ name: 'Page d', temperature: 425 },{ name: 'Page d', temperature: 450 },{ name: 'Page d', temperature: 400 }]

    return (
        <>
            <div id='chartContainer'>
                <LineChart width={900} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="temperature" stroke="#ff0000" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis tick={{fill:'white'}}/>
                    <YAxis tick={{fill:'white'}} domain={[300,500]}/>
                    <Tooltip style={{color: 'black'}}/>
                </LineChart>
            </div>
            <div className="input">
                <p>Enter temperature in fahrenheit.</p>
                <input type="text" id="tempInput" />
                <br />
                <button onclick={() => logTempFromInput()} type="button">Enter</button>
            </div>
        </>
    )
}