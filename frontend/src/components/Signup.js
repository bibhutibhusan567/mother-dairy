import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

export default function LoginSignup(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <Card border="primary" className="loginSignup" bg="dark" style={{ color: "white" }}>
            <CardBody className='text-size'>
                <CardTitle style={{
                    height: "60px",
                    width: "60px",
                    backgroundColor: "lightblue",
                    marginLeft: "70px",
                    borderRadius: "50%",
                }}></CardTitle>

    User name:<input
                    style={{ textTransform: 'capitalize' }}
                    type="text"
                    placeholder="User Name"
                    onChange={(event) => setUserName(event.target.value)} />
    Email:<input
                    type="email"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)} />
    Password:<input
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}></input>
                {props.error ? (<div className="error">{props.error}</div>) : null}
                <Button
                    onClick={() => props.signupHandler(userName, email, password)}
                    style={{ marginTop: "10px", marginLeft: '55px' }}
                >Sign Up</Button>
            </CardBody>
        </Card >
    );
}