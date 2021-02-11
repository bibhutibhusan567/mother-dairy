import React from "react";
import { Button, Table } from 'reactstrap';
import { useHistory } from "react-router-dom";

export default function Checkout(props) {
    const history = useHistory();
    let total = 0;
    return (
        <>
            <Table striped bordered hover dark style={{ marginTop: "10%" }}>
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
            <Button color="success" onClick={() => {
                props.paymentProcess();
                history.push('/purchasedone');
            }}>Proceed To Pay</Button>
        </>
    );
}