import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Checkout(props) {
    let total = 0;
    return (
        <>
            <Table striped bordered hover variant="dark"
                style={{
                    width: "450px",
                    marginLeft: "30%",
                    marginTop: "30px",
                    justifyContent: "center"
                }}>
                <thead>
                    <tr><th>Item No.</th><th>Items</th><th>Price &#8377;</th>
                    </tr>
                </thead>
                <tbody>
                    {props.purchaseItems.map((item, idx) => {
                        total = total + item.itemPrice;
                        return (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>
                                    <span style={{ color: "rgb(255, 81, 0)" }}>{item.items} </span>
                                    <span style={{ color: " rgb(2, 168, 66)", width: "2px" }}>&#10006; </span>
                                    {item.product} ({item.quantity}) for {
                                        (item.days === 1) ? (
                                            <span style={{ color: "rgb(87, 230, 98)" }}>1day</span>
                                        ) : (
                                                <span style={{ color: "rgb(252, 138, 9)" }}>{item.days}days</span>
                                            )}
                                </td>
                                <td>{item.itemPrice}</td>
                            </tr>);
                    })}
                    <tr style={{ fontStyle: "italic", fontWeight: "bold", backgroundColor: "rgba(75, 104, 235, 0.705)" }}>
                        <td colSpan="2">Final Amount</td>
                        <td>{total}</td>
                    </tr>
                </tbody>
            </Table>
            <Button variant="success" style={{ marginLeft: "355px" }} onClick={props.paymentProcess}>Proceed To Pay</Button>
        </>
    );
}