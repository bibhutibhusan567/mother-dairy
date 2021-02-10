import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import avtar from '../images/avtar.png';

export default function Login(props) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <Card className="loginSignup" color="dark">
            <CardBody className='flex-col'>
                <CardTitle>
                    <img className="avtar" src={avtar} alt="" />
                </CardTitle>

                Email:<input
                    type="text"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)} />
                New password:<input
                    type="password"
                    placeholder="New password"
                    onChange={(event) => setPassword(event.target.value)} />
                {props.error ? (
                    <div className="error">{props.error}</div>
                ) : null}
                <br />
                <Button
                    color="primary"
                    onClick={() => props.changePasswordHandler(email, password)}
                >Change Password
                    </Button>
            </CardBody>
        </Card >
    );
}