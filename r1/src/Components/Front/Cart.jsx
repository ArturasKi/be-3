import { useContext, useEffect } from "react";
import FrontContext from "./FrontContext.jsx";
import Order from "./Order.jsx";

function Cart({clothes}) {

  const { modalCart, setModalCart, order, users } = useContext(FrontContext);

  useEffect(() => {
    if (null === modalCart) {
        return;
    }
}, [modalCart, clothes]);

  const handleProcceed = () => {
    console.log(order.users_id)
    console.log(users.id)
    console.log(order ? [...order].filter(o => o.users_id === users.id).length : null)
    console.log(order)
  }

  if (modalCart === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cart</h5>
            <button
              type="button"
              className="close"
              onClick={() => setModalCart(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-header">
            <b>User: {users.name}</b>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <ul className="list-group">
                {
                  order ? order.map(o => o.users_id === users.id ? <Order key={o.id} order={o}></Order> : null) : null
                }
              </ul>
            </div>
            <div className="total">
              <b>
              Total price:{' '}
              {
                order ? order.filter(o => o.users_id === users.id).reduce((total, item) => total + +item.price, 0).toFixed(2) : null
              }{' '}
              EUR
              </b>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" onClick={handleProcceed}>Procceed</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalCart(null)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

// order ? order.map(o => <Order key={o.id} order={o}></Order>) : null