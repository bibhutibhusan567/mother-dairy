import { Table } from 'reactstrap';

function ItemList(props) {

    return (
        <>
            {
                (props.error !== undefined) ? (
                    <div style={{ color: "red", fontSize: "30px", }}>{props.error}</div>
                ) : (
                        <Table striped bordered hover dark style={{ width: "30rem", margin: "10%" }}>

                            <thead>
                                <tr><th>Item No.</th><th>Types Of {props.selectedProduct}</th><th>Quantity</th><th>Price &#8377;</th>
                                </tr>
                            </thead>

                            <tbody onClick={props.getPrice} >
                                {
                                    props.productArray.map((item, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td >{idx + 1}</td>
                                                <td>{item.product}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table >
                    )
            }</>

    );

}

export default ItemList;
