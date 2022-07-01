import React from "react";
import interact from "interactjs";
import { Link } from "react-router-dom";

interact(".draggable").draggable({
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: ".dropzone",
            endOnly: true,
        }),
    ],

    listeners: {
        move: dragMoveListener,
        end(event) {
            var textEl = event.target.querySelector("p");

            textEl &&
                (textEl.textContent =
                    "moved a distance of " +
                    Math.sqrt(
                        (Math.pow(event.pageX - event.x0, 2) +
                            Math.pow(event.pageY - event.y0, 2)) |
                            0
                    ).toFixed(2) +
                    "px");
        },
    },
});

interact(".draggableAndResizable").draggable({
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: ".dropzone",
            endOnly: true,
        }),
    ],

    listeners: {
        move: dragMoveListener,
        end(event) {
            var textEl = event.target.querySelector("p");

            textEl &&
                (textEl.textContent =
                    "moved a distance of " +
                    Math.sqrt(
                        (Math.pow(event.pageX - event.x0, 2) +
                            Math.pow(event.pageY - event.y0, 2)) |
                            0
                    ).toFixed(2) +
                    "px");
        },
    },
});

interact(".draggableAndResizable").resizable({
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
        move: function (event) {
            let { x, y } = event.target.dataset;

            x = (parseFloat(x) || 0) + event.deltaRect.left;
            y = (parseFloat(y) || 0) + event.deltaRect.top;

            Object.assign(event.target.style, {
                width: `${event.rect.width}px`,
                height: `${event.rect.height}px`,
                transform: `translate(${x}px, ${y}px)`,
            });

            Object.assign(event.target.dataset, { x, y });
        },
    },
});

function dragMoveListener(event) {
    var target = event.target;
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    target.style.transform = "translate(" + x + "px, " + y + "px)";

    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
}

window.dragMoveListener = dragMoveListener;

function Home(props) {
    window.props = props;
    const changeBackgroundColor = (color) => {
        props.selectedComponent.style.backgroundColor = color;
    };

    const changeFontColor = (color) => {
        props.selectedComponent.style.color = color;
    };

    const generateTextInput = (
        <input
            type="text"
            className="textField draggable"
            onClick={(event) => {
                props.setSelectedComponent(event.target);
            }}
            value="Text Field"
        />
    );
    const generateButton = (
        <button
            className="button draggable"
            onClick={(event) => {
                props.setSelectedComponent(event.target);
            }}
        >
            Button
        </button>
    );

    interact(".dropzone").dropzone({
        ondropactivate: function (event) {
            event.target.classList.add("drop-active");
        },
        ondrop: function (event) {
            if (event.relatedTarget.classList.contains("draggable")) {
                if (event.relatedTarget.type === "text") {
                    window.props.setInput((input) => {
                        return [...input, generateTextInput];
                    });
                } else {
                    window.props.setButton((button) => {
                        return [...button, generateButton];
                    });
                }
            }
            event.relatedTarget.classList.remove("draggable");
            event.relatedTarget.classList.add("draggableAndResizable");
        },
        ondropdeactivate: function (event) {
            event.target.classList.remove("drop-active");
        },
    });

    return (
        <div
            style={{
                height: "100vh",
                overflowY: "hidden",
            }}
        >
            <div className="dropzone" id="dropzone">
                <div className="pickzone" id="pickzone" style={{ left: 15 }}>
                    <input
                        type="text"
                        className="textField simple"
                        value="Text Field"
                    />
                    {props.input.map((eachInput) => {
                        return eachInput;
                    })}
                    <br />
                    <br />
                    <button className="button simple">Button</button>
                    {props.button.map((eachButton) => {
                        return eachButton;
                    })}
                </div>
            </div>
            <div style={{ right: 15 }} className="pickzone">
                <br />
                <br />
                <label htmlFor="background-color" className="text">
                    Select background color:
                </label>
                <br />
                <br />
                <input
                    type="color"
                    id="background-color"
                    onChange={(event) => {
                        changeBackgroundColor(event.target.value);
                    }}
                    style={{ width: "200px" }}
                />
                <br />
                <br />
                <br />
                <br />
                <label htmlFor="font-color" className="text">
                    Select font color:
                </label>
                <br />
                <br />
                <input
                    type="color"
                    id="font-color"
                    onChange={(event) => {
                        changeFontColor(event.target.value);
                    }}
                    style={{ width: "200px" }}
                />
            </div>
            <Link
                to="/final"
                onClick={() => {
                    var pickzone = document.getElementById("pickzone");
                    window.props.setInnerHtml(pickzone?.innerHTML);
                }}
                className="link"
            >
                FINALIZE
            </Link>
        </div>
    );
}

export default Home;
