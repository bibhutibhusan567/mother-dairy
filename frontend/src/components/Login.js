import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

export default function Login(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    return (
        <Card border="primary" className="loginSignup" bg="dark" style={{ color: "white" }}>
            <Card.Body className='text-size'>
                <Card.Title style={{
                    height: "60px",
                    width: "60px",
                    backgroundColor: "lightblue",
                    marginLeft: "70px",
                    borderRadius: "50%",
                }}></Card.Title>

                        User name:<input
                    type="text"
                    placeholder="User Name"
                    style={{ textTransform: 'capitalize' }}
                    onChange={(event) => setUserName(event.target.value)} />
                        Password:<input
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)} />
                {props.error ? (
                    <>
                        <div className="error">{props.error}</div>
                        <div
                            style={{ color: "red", fontSize: "15px" }}
                            onClick={() => {
                                props.setError();
                                setPassword();
                                history.push('/changepassword');
                            }}
                        >Forgot password
                                </div>
                    </>
                ) : null}
                <Button
                    onClick={() => props.loginHandler(userName, password)}
                    style={{ marginTop: "10px", marginLeft: '57px' }}
                >Log In
                </Button>
                <div
                    style={{ fontSize: "15px", marginTop: "20px" }}
                >Dont have a account...
                            <span
                        style={{ textDecoration: "underline", color: "green" }}
                        onClick={() => {
                            props.setError();
                            setUserName();
                            setPassword();
                            history.push('/signup');
                        }}
                    >Signup
                            </span>
                </div>
            </Card.Body>
        </Card >
    );
}