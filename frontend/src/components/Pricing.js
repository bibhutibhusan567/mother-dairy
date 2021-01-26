import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import milkArray from '../images/Milk/MilkArray';
import dahiArray from '../images/Curd/DahiArray';
import chachArray from '../images/Chach/ChachArray';
import paneerArray from '../images/Paneer/PaneerArray';
import butterArray from '../images/Butter/ButterArray';
import cheeseArray from '../images/Cheese/CheeseArray';
import sweetArray from '../images/Sweet/SweetArray';
import brickArray from '../images/Brick/BrickArray';
import barArray from '../images/Bar/BarArray';
import coneArray from '../images/Cone/ConeArray';
import kulfiArray from '../images/Kulfi/KulfiArray';
import ImageSlide from './ImageSlide';

const products = [
    { product: "Milk", imageArray: milkArray, variety: 10, quantity: "500ml-1L", minPrice: 19, maxPrice: 55 },
    { product: "Curd", imageArray: dahiArray, variety: 5, quantity: "90ml-5kg", minPrice: 15, maxPrice: 360 },
    { product: "Chach", imageArray: chachArray, variety: 2, quantity: "200ml", minPrice: 10, maxPrice: 10 },
    { product: "Paneer", imageArray: paneerArray, variety: 1, quantity: "200gm-1kg", minPrice: 70, maxPrice: 320 },
    { product: "Butter", imageArray: butterArray, variety: 1, quantity: "500gm", minPrice: 210, maxPrice: 210 },
    { product: "Cheese", imageArray: cheeseArray, variety: 4, quantity: "180gm-200gm", minPrice: 110, maxPrice: 150 },
    { product: "Sweet", imageArray: sweetArray, variety: 5, quantity: "2pc-1kg", minPrice: 50, maxPrice: 220 },
    { product: "Bricks And Super Saver Packs", imageArray: brickArray, variety: 14, quantity: "700ml-1.25L", minPrice: 180, maxPrice: 280 },
    { product: "Bar", imageArray: barArray, variety: 10, quantity: "65ml", minPrice: 10, maxPrice: 40 },
    { product: "Cone", imageArray: coneArray, variety: 5, quantity: "100ml", minPrice: 25, maxPrice: 40 },
    { product: "Kulfi", imageArray: kulfiArray, variety: 6, quantity: "60ml", minPrice: 20, maxPrice: 40 }
];
export default function Pricing(props) {
    let history = useHistory();

    const showProduct = (product) => {
        props.showProducts(product);
        history.push(`/${product}s`);
    }
    return (
        <container class="container">
            {
                products.map((product, idx) => {
                    return (
                        <Card key={idx} style={{ width: '18rem', marginTop: "20px" }}>
                            <ImageSlide imageArray={product.imageArray} />
                            < Card.Body >
                                <Card.Title>{product.product}s</Card.Title>
                                <Card.Text style={{ textAlign: "left" }}>
                                    <div>Variety: {product.variety}</div>
                                    <div>Quantity: {product.quantity}</div>
                                    <div>Price Range:</div>
                                    <div style={{ marginLeft: "30px" }}>
                                        <div>Minimum: {product.minPrice}&#8377;</div>
                                        <div>Maximum: {product.maxPrice}&#8377;</div>
                                    </div>

                                </Card.Text>
                                <Button variant="primary" onClick={() => showProduct(product.product)}>Purchase</Button>
                            </ Card.Body>
                        </Card >
                    );
                })
            }
        </container>
    )
}