import { useContext } from "react";
import Clothes from "./Clothes";
import FrontContext from "./FrontContext";
import Sort from "./Sort";

function List() {

    const { clothes, setModalCart, order, users } = useContext(FrontContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h3>List of clothes</h3>
                <button type="button" className="btn btn-outline-success nav-link-cart mt-3 mr-4" onClick={() => setModalCart(clothes)}>
                    <i className="bi bi-bag">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                        </svg>
                    </i>
                    <div className="order-amount">
                    {
                        order && users ? order.filter(o => o.users_id === users.id).length : null
                    }
                    </div>
                </button>
            </div>
            <Sort />
            <div className="card-body">
                <ul className="list-group">
                    {
                    clothes ? clothes.map(c => <Clothes key={c.id} clothes={c}></Clothes>) : null
                    }
                </ul>
            </div>
          </div>
    )
}

export default List;

// {
//     clothes ? clothes.map(c => <Clothes key={c.id} clothes={c}></Clothes>) : null
// }

// order ? order.filter(o => o.users_id === users.id).length : null