import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import avtar from '../images/avtar.png';

export default function LoginSignup(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <Card className="loginSignup" color="dark">
            <CardBody className='flex-col'>
                <CardTitle>
                    <img className="avtar" src={avtar} alt="" />
                </CardTitle>

    User name<input
                    style={{ textTransform: 'capitalize' }}
                    type="text"
                    placeholder="User Name"
                    onChange={(event) => setUserName(event.target.value)} />
    Email<input
                    type="email"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)} />
    Password<input
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)} />
                {props.error ? (<div className="error">{props.error}</div>) : null}
                <br />
                <Button
                    color="success"
                    onClick={() => props.signupHandler(userName, email, password)}
                >Sign Up</Button>
            </CardBody>
        </Card >
    );
}