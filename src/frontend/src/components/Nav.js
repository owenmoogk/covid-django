import React from 'react';

export default function Nav(props) {
    return (
        <div className="nav">
            <a href="/">Home</a>
            <a href="https://www.ontario.ca/page/covid-19-stop-spread" target="_blank">Guidelines</a>
            {props.loggedIn
                ? <>
                    <a href="/health">My Health</a>
                    <a href='' onClick={() => props.logout()}>Logout ({props.username})</a>
                </>
                : <>
                    <a href='/login'>Login</a>
                    <a href='/signup'>Signup</a>
                </>
            }
        </div>
    )
}