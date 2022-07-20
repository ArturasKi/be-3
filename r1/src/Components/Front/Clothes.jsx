// import { useContext } from "react";
import FrontContext from "./FrontContext";
import { useState, useContext } from "react";

function Clothes({clothes}) {

    const { setAddOrder, users } = useContext(FrontContext);

    const [size, setSize] = useState('');

    const handleAdd = () => {
        const data = { 
            size,
            price: clothes.price,
            type: clothes.type,
            color: clothes.color,
            usersId: users[0].id,
            clothesId: clothes.id
         };
         console.log(data);
            setAddOrder(data);
            setSize('');
    }

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b>Color: {clothes.color}{' '}</b>
                    <b>Type: {clothes.type}{' '}</b>
                    <b>Price: {clothes.price} EUR</b>
                    {
                        clothes.photo ? <div className="photo-bin"><img src={clothes.photo} alt='nice'/></div> : null
                    }
                    <div className="form-group">
                        <label>Size</label>
                        <select className="form-control" value={size} onChange={(e) => setSize(e.target.value)}>
                            <option value="0">Select size</option>
                            <option value="1">XS</option>
                            <option value="2">S</option>
                            <option value="3">M</option>
                            <option value="4">L</option>
                            <option value="5">XL</option>
                            <option value="6">XXL</option>
                        </select>
                        <small className="form-text text-muted">Select category here.</small>
                    </div>
                    <div className="buttons">
                        <button type="button" className="btn btn-outline-success ml-2" onClick={handleAdd}>Add to cart</button>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default Clothes;