import React, { useState } from 'react';
import {
    Button, Dropdown, Collapse, Navbar, ButtonDropdown, NavbarBrand, Nav, NavLink, NavbarToggler, DropdownToggle, DropdownMenu, DropdownItem, NavbarText
} from 'reactstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useHistory } from "react-router-dom";

function Header(props) {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [searchValue, setSearchValue] = useState();
    const [micStart, setMicStart] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setOpen] = useState(false);
    let history = useHistory();
    // const [collapsed, setCollapsed] = useState(true);

    // const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const toggleButton = () => setOpen(!dropdownOpen);


    // const toggleNavbar = () => setCollapsed(!collapsed);
    // const toggle = () => setIsOpen(!isOpen);

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

    return (

        <Navbar color="dark" dark expand="md" style={{ color: "white", top: "0px", width: "100%", position: "sticky", zIndex: "1" }}>
            <NavbarBrand href="home" className="Pacifico">Mother Dairy</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavLink href="/home" className="link">Home</NavLink>
                    <NavLink href="/pricing" className="link">Pricing</NavLink>

                    {props.showProductOption ? (
                        <Dropdown isOpen={isOpen} toggle={toggle}>
                            <DropdownToggle className="link" nav caret id="nav-dropdown" toggle={toggle}>
                                Products
              </DropdownToggle>
                            <DropdownMenu onClick={() => history.push('/products')}>
                                <DropdownItem onClick={() => props.showProducts("Milk")}>Milk</DropdownItem>
                                <DropdownItem onClick={() => props.showProducts("Curd")}>Curd</DropdownItem>
                                <DropdownItem onClick={() => props.showProducts("Chach")}>Chach</DropdownItem>
                                <DropdownItem onClick={() => props.showProducts("Paneer")}>Paneer</DropdownItem>
                                <DropdownItem onClick={() => props.showProducts("Butter")}>Butter</DropdownItem>
                                <DropdownItem onClick={() => props.showProducts("Cheese")}>Cheese</DropdownItem>
                                <DropdownItem onClick={() => props.showProducts("Sweet")}>Sweets</DropdownItem>
                                <DropdownItem divider />

                                <Dropdown isOpen={dropdownOpen} toggle={toggleButton} direction="right" className="dropRight"                                >
                                    <DropdownToggle caret style={{ color: "black", background: "white", border: "0px solid white", outlineStyle: "none" }}>
                                        Ice-cream
                                    </DropdownToggle>
                                    <DropdownMenu onClick={() => {
                                        history.push('/products');
                                        toggle();
                                    }}>
                                        <DropdownItem onClick={() => props.showProducts("Bricks And Super Saver Packs")}>Bricks And Super Saver Packs</DropdownItem>
                                        <DropdownItem onClick={() => props.showProducts("Bar")}>Bars</DropdownItem>
                                        <DropdownItem onClick={() => props.showProducts("Cone")}>Cones</DropdownItem>
                                        <DropdownItem onClick={() => props.showProducts("Kulfi")}>Kulfi</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                            </DropdownMenu>
                        </Dropdown>
                    ) : null}
                    {props.loggedin ? (<NavLink
                        className="link"
                        onClick={() => {
                            props.purchaseHistoryHandler(props.userName);
                            history.push('/history')
                        }}
                    >Purchase History</NavLink>) : null}
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
                        <span className="userName Lobster">{props.userName}</span>
                        <Button onClick={() => props.logoutHandler(props.userName)} color="danger" className="logout">Log Out</Button>

                    </>

                ) : (
                        <>
                            <Button
                                disabled={props.buttonsDisable}
                                color="success"
                                className="login"
                                onClick={() => {
                                    props.setError();
                                    history.push("/login");
                                }}
                            >Log In</Button>
                            <Button
                                disabled={props.buttonsDisable}
                                color="info"
                                className="signup"
                                onClick={() => {
                                    props.setError();
                                    history.push("/signup");
                                }}
                            >Sign Up</Button>
                        </>
                    )}
            </Collapse>
        </Navbar >
    )
}
export default Header;