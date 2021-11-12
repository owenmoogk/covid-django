import React from 'react';

export default function Nav(props) {
    return (
        <div className="nav">
            <a href="/">Home</a>
            <a href="/health">My Health</a>
            <a href="/points">Points</a>
            <a href="https://www.ontario.ca/page/covid-19-stop-spread" target="_blank">Guidelines</a>
        </div>
    )
}