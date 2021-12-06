import React, { useEffect, useState } from 'react';
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
    const [data, setData] = useState()

    useEffect(() => {
        fetch('/users/healthData/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
            setData(json['data'])
        })
    }, [])

    function logTemp() {
        var temp = document.getElementById("tempInput").value
        document.getElementById('tempInput').value = ''
        temp = parseInt(temp)
        function isFloat(n) {
            return Number(n) == n && n % 1 == 0
        }
        if (Number.isInteger(temp) || isFloat(temp)) {
            if (temp > 100.4) {
                setAlert("That is a high temperature. Please have a look at public health guidelines for next steps.")
                return
            }
            else if (temp < 95) {
                setAlert("This is a very cold temperature. You may have hypothermia. Retake temperature for source of errors, and if you still have a low temperature consider contacting a doctor.")
                return
            }
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var date = mm + '/' + dd + '/' + yyyy;
            fetch('/users/healthData/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({"date": date, "temperature": temp})
            })
            .then(response => response.json())
            .then(json => setData(json['data']))
        }
        else {
            setAlert("Please enter a valid number.")
        }
    }

    return (
        <>
            <div id='chartContainer'>
                <LineChart width={900} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="temperature" stroke="#ff0000" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis tick={{ fill: 'black' }} dataKey={'date'}/>
                    <YAxis tick={{ fill: 'black' }} domain={[95, 101]} />
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