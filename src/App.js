import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./Page/Home/Home.jsx";
import Final from "./Page/Final/Final.jsx";

import "./App.css";

function App() {
    const generateTextInput = (
        <input
            type="text"
            className="textField draggable"
            onClick={(event) => {
                setSelectedComponent(event.target);
            }}
            value="Text Field"
        />
    );
    const generateButton = (
        <button
            className="button draggable"
            onClick={(event) => {
                setSelectedComponent(event.target);
            }}
        >
            Button
        </button>
    );

    const [input, setInput] = useState([generateTextInput]);
    const [button, setButton] = useState([generateButton]);
    const [selectedComponent, setSelectedComponent] = useState();
    const [innerHtml, setInnerHtml] = useState();

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                input={input}
                                setInput={setInput}
                                button={button}
                                setButton={setButton}
                                selectedComponent={selectedComponent}
                                setSelectedComponent={setSelectedComponent}
                                setInnerHtml={setInnerHtml}
                            />
                        }
                    />
                    <Route
                        path="/final"
                        element={<Final innerHtml={innerHtml} />}
                    />
                    <Route path="*" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
