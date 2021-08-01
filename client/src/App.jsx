import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);
    const [handles, setHandles] = useState(-1);
    const [status, setStatus] = useState("offline");
    const [serverTime, setServerTime] = useState("");

    useEffect(() => {
        let timerId = 0;
        console.log("Timeout started.");
        timerId = setTimeout(() => {
            console.log("Timeout End, updating...");
            callBackendAPI()
                .then((res) => {
                    console.log(res);
                    setHandles(res.handles);
                    if (res.status !== status) {
                        setStatus(res.status);
                    }
                    setServerTime(res.time);
                })
                .catch((err) => console.log(err));
        }, 10000);

        return () => {
            console.log("Clearing Timout");
            clearTimeout(timerId);
        };
    });

    const callBackendAPI = async () => {
        const response = await fetch("http://localhost:5000/status", {
            mode: "cors",
        });
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }

        return body;
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Hello Vite + React!</p>
                <p>
                    <button
                        type="button"
                        onClick={() => setCount((count) => count + 1)}
                    >
                        count is: {count}
                    </button>
                </p>
                <p>
                    Edit <code>App.jsx</code> and save to test HMR updates.
                </p>
                <p>
                    Server Handles: {handles} <br />
                    Server Status: {status} <br />
                    Server Time: {serverTime} <br />
                </p>
                <p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    {" | "}
                    <a
                        className="App-link"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vite Docs
                    </a>
                </p>
            </header>
        </div>
    );
}

export default App;
