import { useContext, useEffect } from "react";
import FrontContext from "./FrontContext.jsx";

function Cart({clothes}) {

  const { modalCart, setModalCart } = useContext(FrontContext);

  useEffect(() => {
    if (null === modalCart) {
        return;
    }
}, [modalCart, clothes]);

  const handleProcceed = () => {
    console.log('OK OK OK !')
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
          <div className="modal-body">
            <div className="form-group">
              Kazkas
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