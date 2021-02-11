import { Card, CardBody, CardTitle, Button } from 'reactstrap';

function PriceCard(props) {

    return (
        <Card className="loginSignup" color="dark" style={{
            color: "white",
            width: "30rem",

        }}>
            <CardTitle >Here Is Your Final Amount</CardTitle>
            <CardBody className='flex-col' style={{ backgroundColor: "rgb(12, 65, 90)" }}>
                <CardTitle>Keep purchasing<span>&#128522;</span></CardTitle>

                <div>
                    {(props.numberOfDays !== 1) ? (<div>No need to pay {(props.price) * (props.numberOfDays)} &#8377;</div>) : null}
                    <div>
                        You will pay {props.finalPrice}<span>&#8377; only</span>{(props.numberOfDays !== 1) ? (<span>&#128522;</span>) : null}
                    </div>
                </div>
                <br />
                <Button
                    color="primary"
                    onClick={props.purchaseMore}
                >Purchase More</Button>
                <br />
                <Button
                    onClick={props.checkOut}
                    color="success"
                >Check Out</Button>

            </CardBody>
        </Card >);
}
export default PriceCard;