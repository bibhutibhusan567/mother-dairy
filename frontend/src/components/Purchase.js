import React, { useState } from 'react';
import Items from './Items.js';
import { Button } from 'reactstrap';

export default function Purchase(props) {
    const [showMore, setShowMore] = useState(false);
    const [showItems, setShowItems] = useState(false);

    return (
        <>
            <tr onClick={() => setShowMore(!showMore)}>
                <td>{props.order_no}</td>
                <td>{props.order.purchaseItems.length}</td>
                <td>{props.order.date}</td>
                <td>{props.order.totalAmount}</td>
            </tr>

            {showMore ? (
                <tr style={{ background: "white", color: "black", fontSize: "16px" }}>
                    <td colSpan="4" >
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontStyle: "italic", fontWeight: "700" }}>
                                <span >Order Id : <span style={{ fontWeight: "400" }}>{props.order._id}</span></span>
                                <span style={{ float: "right" }}>Total Amount : {props.order.totalAmount}&#8377;</span>
                            </div>
                            <div><span style={{ fontWeight: "700" }}>Time :</span> {props.order.time}</div>
                            <br />
                        </div>
                        {showItems ? (
                            <>
                                <div onClick={() => setShowItems(!showItems)} style={{ textAlign: "left" }}>Products Detalis
                                    <Button color="dark" style={{ margin: "10px" }}> v </Button>
                                </div>
                                <Items itemsArray={props.order.purchaseItems} />
                            </>
                        ) : (
                                <div onClick={() => setShowItems(!showItems)}>Products Details
                                    <Button color="dark" style={{ margin: "10px" }}> {'>'} </Button></div>
                            )}
                    </td>
                </tr>
            ) : null}


        </>
    )
}