import { Table } from 'reactstrap';
import Purchase from './Purchase';

export default function PurchaseseHistory(props) {
    return (
        <>
            <div style={{ fontSize: "20px", marginLeft: "10%", }}>Purchase History</div>
            <Table striped bordered dark style={{
                width: "80%",
                marginLeft: "10%",
                marginTop: "40px",
            }}>
                <thead>
                    <tr>
                        <th>#</th><th>Purchased items</th><th>Date</th><th>Total Amount &#8377;</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        props.history.map((order, idx) => {
                            return (<Purchase key={idx} order_no={idx + 1} order={order} />);
                        })}

                </tbody>
            </Table>
        </>
    );
}