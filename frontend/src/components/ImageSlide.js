import React, { useState } from 'react';
import { CardImg } from 'reactstrap';
import '../App.css';

export default function ImageSlide(props) {
    const [index, setIndex] = useState(0);
    return (
        <div style={{
            position: "relative",
            justifyContent: "center",
            display: "flex",
            alignItems: "center"
        }}>
            <button
                style={{ left: "0px" }}
                onClick={() => setIndex(index - 1)}
                className="slideButtons"
                disabled={index === 0}
            >{'<'}
            </button>
            <CardImg variant="top" src={`${props.imageArray[index]}`} style={{ height: "250px" }} />
            <button
                style={{ right: "0px" }}
                onClick={() => setIndex(index + 1)}
                className="slideButtons"
                disabled={index === props.imageArray.length - 1}
            >{">"}
            </button>
        </div >

    );
}