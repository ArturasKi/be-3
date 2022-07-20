import { useContext } from "react";
import FrontContext from "./FrontContext";
// import { useState, useContext } from "react";

function Order({order}) {

    const { setDeleteOrder } = useContext(FrontContext);

    const handleRemove = () => {
        setDeleteOrder(order);
    }

    return (
        <li className="list-group-item">
            <div className="item-front">
                <div className="content order-list">
                    <b>Id: {order.id}{' '}</b>
                    <b>Size: {order.size}{' '}</b>
                    <b>Color: {order.color}{' '}</b>
                    <b>Type: {order.type}{' '}</b>
                    <b>Price: {order.price} EUR</b>
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleRemove}>Remove</button>
                </div>
            </div>
        </li>
    );
}

export default Order;