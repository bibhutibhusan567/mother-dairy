import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'

function Duration(props) {
    const [count, setCount] = useState(1);
    const [done, setDone] = useState(false);

    return (
        <>
            {!done ? (
                <Card bg="dark"
                    style={{ width: "400px", position: "fixed", height: "auto", marginLeft: "550px", top: "120px" }}>
                    <Card.Header style={{ fontSize: "20px", color: "white", backgroundColor: "purple" }}>
                        Select Number of items
            </Card.Header>
                    <Card.Body>
                        <div>
                            {(count > 1) ? (<Button style={{ marginLeft: "10px" }} variant="danger" onClick={() => setCount(count - 1)}>-</Button>) : null}
                            <span style={{ color: "white", marginLeft: '10px', marginRight: '10px' }}>{count}</span>
                            <Button onClick={() => setCount(count + 1)}>+</Button>
                            <Button
                                style={{ marginLeft: "10px" }}
                                variant="success"
                                onClick={() => {
                                    props.confirm(count);
                                    setDone(true);
                                }}
                            > &#x2713; </Button>
                        </div>
                        <div style={{ float: "left", color: "white", marginTop: "10px" }}>Current Total : <span style={{ fontWeight: "bold", color: "orange" }}>{props.price * count} &#8377;</span></div>
                    </Card.Body>
                </Card>
            ) : (
                    (<Card bg="dark"
                        style={{ width: "500px", position: "fixed", height: "auto", marginLeft: "500px", top: "100px" }}>
                        <Card.Header style={{ fontSize: "20px", color: "white", backgroundColor: "purple" }}>
                            Here Is Your Discounts <span>&#128522;</span>
                        </Card.Header>
                        <Card.Body
                            style={{
                                color: "white",
                                fontSize: "18px"
                            }}>

                            <Container>
                                <Row>
                                    <Col>For 1Day you will not get any discount.
                            <span>&#128542;</span>
                                        <br />
                                        <Button id="1" variant="danger" onClick={props.discountPrice}>For 1 Day</Button>
                                        <span style={{ color: "red", fontSize: "60px" }}>&#10008;</span>
                                    </Col>

                                    <Col>For 1week you will get 5% discount.
                            <span>&#128522;</span>
                                        <br />
                                        <Button id="7" variant="warning"
                                            onClick={props.discountPrice}
                                        >For 1 Week</Button>
                                        <span>You will save {Math.round(props.price * 0.05 * 7)}&#8377; for this product.</span>
                                    </Col>

                                    <Col>For 1Month you will get 8% discount.
                            <span>&#128515;</span>
                                        <br />
                                        <Button id="30" variant="primary" onClick={props.discountPrice}>For 1 Month</Button>
                                        <span>You will save {Math.round(props.price * 0.08 * 30)}&#8377; for this product.</span>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={{ marginTop: "40px" }}>
                                        {(props.showConfirmButton) ? (<Button onClick={props.addToCart} variant="success" style={{ width: "200px" }}>
                                            Confirm</Button>) : (<span style={{ color: "orange" }}>Pick Your Offer</span>)}
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card >
                    )
                )}
        </>

    );
}

export default Duration;