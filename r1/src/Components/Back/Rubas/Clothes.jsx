import { useContext } from "react";
import BackContext from "../BackContext";

function Clothes({clothes}) {

    const { setDeleteClothes, setModalClothes } = useContext(BackContext);

    const handleDelete = () => {
        setDeleteClothes(clothes);
    }
    
    const handleEdit = () => {
        setModalClothes(clothes);
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
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default Clothes;