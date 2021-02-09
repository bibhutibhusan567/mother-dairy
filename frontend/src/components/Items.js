import { Table } from 'reactstrap';

export default function Items(props) {
    return (
        <Table borderless>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Number Of Products</th>
                    <th>Price &#8377;</th>
                    <th>Quantity</th>
                    <th>Plan For</th>
                </tr>
            </thead>
            <tbody >
                {
                    props.itemsArray.map((item, idx) => {
                        return (
                            <tr key={idx} >
                                <td>{idx + 1}</td>
                                <td>{item.product}</td>
                                <td>{item.items}</td>
                                <td>{item.itemPrice}</td>
                                <td>{item.quantity}</td>
                                <td>{item.days === 1 ? (<span>{item.days}day</span>) : <span>{item.days}days</span>} </td>
                            </tr>
                        );
                    })
                }

            </tbody>
        </Table>
    );
}