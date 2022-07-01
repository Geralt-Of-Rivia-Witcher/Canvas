import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

function Final(props) {
    useEffect(() => {
        var elements = document.getElementsByClassName("simple");
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        elements = document.getElementsByClassName("draggable");
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }, []);
    return (
        <>
            <div
                style={{
                    height: "100vh",
                    overflowY: "hidden",
                    pointerEvents: "none",
                }}
            >
                <div className="dropzone" id="dropzone">
                    <div
                        className="pickzone"
                        id="pickzone"
                        style={{ left: 15, visibility: "hidden" }}
                    >
                        <div style={{ visibility: "visible" }}>
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                children={props.innerHtml}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Final;
