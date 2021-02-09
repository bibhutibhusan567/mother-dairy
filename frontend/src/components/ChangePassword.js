import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

export default function Login(props) {
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
                <Button
                    onClick={() => props.changePasswordHandler(email, password)}
                    style={{ marginTop: "20px", marginLeft: "20px" }}
                >Change Password
                    </Button>
            </CardBody>
        </Card >
    );
}