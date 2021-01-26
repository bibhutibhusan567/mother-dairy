import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./App.css";
import { useHistory } from "react-router-dom";

function FrontPage(props) {
    const { transcript, resetTranscript } = useSpeechRecognition()
    const [searchValue, setSearchValue] = useState();
    const [micStart, setMicStart] = useState(false);
    let history = useHistory();

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    };
    const startMic = () => {
        resetTranscript();
        SpeechRecognition.startListening();
        setMicStart(true);
        setTimeout(stopMic, 7 * 1000);
    }
    const stopMic = () => {
        setMicStart(false);
        SpeechRecognition.stopListening();
    }
    const takeInput = (event) => {
        console.log(event.target.value.trim());
        resetTranscript();
        SpeechRecognition.stopListening();
        setSearchValue(event.target.value.trim());
    }

    return (<>
        <Navbar variant="dark" className="navbar">
            <Navbar.Brand href="home" style={{ font: "italic", color: "black" }}>MotherDairy</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/pricing">Pricing</Nav.Link>
                {props.showProductOption ? (
                    <NavDropdown title="Products" id="nav-dropdown" onClick={() => history.push("/products")} >
                        <NavDropdown.Item onClick={() => props.showProducts("Milk")}>Milk</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => props.showProducts("Curd")}>Curd</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => props.showProducts("Chach")}>Chach</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => props.showProducts("Paneer")}>Paneer</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => props.showProducts("Butter")}>Butter</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => props.showProducts("Cheese")}>Cheese</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => props.showProducts("Sweet")}>Sweets</NavDropdown.Item>
                        <DropdownButton variant="light" drop="right" title="Ice Creams">
                            <Dropdown.Item onClick={() => props.showProducts("Bricks And Super Saver Packs")}>Bricks And Super Saver Packs</Dropdown.Item>
                            <Dropdown.Item onClick={() => props.showProducts("Bar")}>Bars</Dropdown.Item>
                            <Dropdown.Item onClick={() => props.showProducts("Cone")}>Cones</Dropdown.Item>
                            <Dropdown.Item onClick={() => props.showProducts("Kulfi")}>Kulfi</Dropdown.Item>
                        </DropdownButton>
                    </NavDropdown>
                ) : null}
                {props.loggedin ? (<Nav.Link
                    onClick={() => {
                        props.purchaseHistoryHandler(props.userName);
                        history.push('/history')
                    }}
                >Purchase History</Nav.Link>) : null}
            </Nav>
            <i
                id="searchIcon"
                onClick={() => props.search(transcript || searchValue)}
                className="fa fa-search"></i>
            <input id='search'
                type="text"
                onChange={takeInput}
                onKeyDown={(event) => (event.key === 'Enter') ? props.search(transcript || searchValue) : null}
                defaultValue={(transcript === null) ? searchValue : transcript}
                placeholder="Search"
                className="mr-sm-2" />
            {micStart ? (
                <i id="mic" className="fa fa-microphone" onClick={stopMic}></i>

            ) : (
                    <i id="mic"
                        className="fa fa-microphone-slash"
                        onClick={startMic}
                    ></i>
                )}
            {props.loggedin ? (
                <>
                    <span className="userName">{props.userName}</span>
                    <Button onClick={() => props.logoutHandler(props.userName)} variant="danger" className="logout">Log Out</Button>

                </>

            ) : (
                    <>
                        <Button
                            disabled={props.buttonsDisable}
                            className="login"
                            onClick={() => {
                                props.setError();
                                history.push("/login");
                            }}
                        >Log In</Button>
                        <Button
                            disabled={props.buttonsDisable}
                            variant="info"
                            className="signup"
                            onClick={() => {
                                props.setError();
                                history.push("/signup");
                            }}
                        >Sign Up</Button>
                    </>
                )}
        </Navbar >
    </>
    )
}
export default FrontPage;