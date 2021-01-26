import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'

function PriceCard(props) {

    return (
        <Card bg="dark" style={{
            color: "white",
            width: "350px",
            height: "300px",
            justifyContent: "center",
            marginLeft: "32%",
            marginTop: "40px"
        }}>
            <Card.Header >Here Is Your Final Amount</Card.Header>
            <Card.Body style={{ backgroundColor: "rgb(12, 65, 90)" }}>
                <Card.Title>Keep purchasing<span>&#128522;</span></Card.Title>

                <Container style={{
                    color: "white",
                    fontSize: "18px"
                }}>
                    <Row>
                        {(props.numberOfDays !== 1) ? (<Col>No need to pay {(props.price) * (props.numberOfDays)} &#8377;</Col>) : null}
                        <Col style={{}}>
                            You will pay {props.finalPrice}<span>&#8377; only</span>{(props.numberOfDays !== 1) ? (<span>&#128522;</span>) : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                style={{ width: "140px", marginTop: "45px" }}
                                onClick={props.purchaseMore}
                            >Purchase More</Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={props.checkOut}
                                variant="success"
                                style={{ width: "140px", marginTop: "45px" }}
                            >Check Out</Button>
                        </Col>
                    </Row>

                </Container>
            </Card.Body>
        </Card >);
}
export default PriceCard;