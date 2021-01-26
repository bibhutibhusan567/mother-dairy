import React, { useState } from 'react';
import imageArray from '../images/HomeImage/ImageArray';
import '../App.css';

export default function HomePage() {
    const [index, setIndex] = useState(0);
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px"

        }}>
            <button
                onClick={() => setIndex(index - 1)}
                className="slideButton"
                disabled={index === 0}
            >{'<'}
            </button>
            <img src={`${imageArray[index]}`} />
            <button
                onClick={() => setIndex(index + 1)}
                className="slideButton"
                disabled={index === imageArray.length - 1}
            >{">"}
            </button>
        </div>

    );
}