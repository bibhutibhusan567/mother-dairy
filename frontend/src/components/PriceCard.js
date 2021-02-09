import { Card, CardBody, CardTitle, Button } from 'reactstrap';

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
            <CardTitle >Here Is Your Final Amount</CardTitle>
            <CardBody style={{ backgroundColor: "rgb(12, 65, 90)" }}>
                <CardTitle>Keep purchasing<span>&#128522;</span></CardTitle>

                <div>
                    {(props.numberOfDays !== 1) ? (<div>No need to pay {(props.price) * (props.numberOfDays)} &#8377;</div>) : null}
                    <div style={{}}>
                        You will pay {props.finalPrice}<span>&#8377; only</span>{(props.numberOfDays !== 1) ? (<span>&#128522;</span>) : null}
                    </div>
                </div>
                <div>
                    <div>
                        <Button
                            style={{ width: "140px", marginTop: "45px" }}
                            onClick={props.purchaseMore}
                        >Purchase More</Button>
                    </div>
                    <div>
                        <Button
                            onClick={props.checkOut}
                            variant="success"
                            style={{ width: "140px", marginTop: "45px" }}
                        >Check Out</Button>
                    </div>
                </div>
            </CardBody>
        </Card >);
}
export default PriceCard;