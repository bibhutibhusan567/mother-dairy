import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';
import { useHistory } from "react-router-dom";
import avtar from '../images/avtar.png';


export default function Login(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    return (
        <Card className="loginSignup" color="dark">
            <CardBody className='flex-col'>
                <CardTitle>
                    <img className="avtar" src={avtar} alt="" />
                </CardTitle>

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
                <br />
                <Button
                    color="success"
                    onClick={() => props.loginHandler(userName, password)}
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
            </CardBody>
        </Card >
    );
}