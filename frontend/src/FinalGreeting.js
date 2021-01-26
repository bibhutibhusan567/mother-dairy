import Card from "react-bootstrap/Card";

export default function FinalGreeting(props) {
    let finalAmount = 0;
    {
        props.purchaseItems.forEach((item) => finalAmount = finalAmount + item.itemPrice);
    }
    return (
        <Card bg="dark"
            style={{ width: "400px", height: "auto", top: "100px", marginLeft: "300px" }}>
            <Card.Header style={{ fontSize: "20px", color: "white", backgroundColor: "purple" }}>
                <div>Thanks for purchasing </div>
                <div style={{ fontStyle: "italic", color: "black", fontWeight: "bold" }}>{props.userName}</div>
                <div>&#128522;</div>
            </Card.Header>
            <Card.Body
                style={{
                    color: "white",
                    fontSize: "18px"
                }}>
                <span
                    style={{ float: "left", color: "orange", fontSize: "20px" }}
                >Your Purchase Is Sucessful
                </span>
                <br />
                <br />
                <span>Your final Amout is : {finalAmount}&#8377;</span>
            </Card.Body>
        </Card >
    );
}