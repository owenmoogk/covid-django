import React, { useEffect, useState } from 'react';

export default function Homepage(props){

    const [data, setData] = useState()

    useEffect(() => {
        fetch('/api/data')
        .then(response => response.json())
        .then(json => setData(json))
    }, [])

    return(
        data?
        <div className='display'>
            <div className="item" style={{backgroundColor: "rgba(118, 200, 255, 0.9)"}}>
                <div className="main">{data.cases}</div>
                <div className="sub">Cases</div>
            </div>
            <div className="item" style={{backgroundColor: "rgba(255, 118, 118, 0.9)"}}>
                <div className="main">{data.deaths}</div>
                <div className="sub">Deaths</div>
            </div>
            <div className="item" style={{backgroundColor: "rgba(180, 255, 118, 0.9)"}}>
                <div className="main" id="points"></div>
                <div className="sub">Points</div>
            </div>
            <div className="item" style={{backgroundColor: "rgba(255, 234, 118, 0.9)"}}>
                <div className="main" id="pointsToday"></div>
                <div className="sub">Points Today</div>
            </div>
        </div>
        :null
    )
}