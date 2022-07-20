import { useContext, useEffect } from "react";
import FrontContext from "./FrontContext.jsx";
// import getBase64 from "../../../Functions/getBase64.js";

function Cart({clothes}) {

  const { modalCart, setModalCart } = useContext(FrontContext);

  useEffect(() => {
    if (null === modalCart) {
        return;
    }
}, [modalCart, clothes]);

  const handleProcceed = () => {
    
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
            {/* <p>Color: {clothes.color}</p> */}
            {/* <p>Type: {clothes.type}</p>
            <p>Size: {clothes.size}</p>
            <p>Price: {clothes.price}</p> */}
        </div>
          {/* {
            clothes.photoPrint ? <div className="photo-bin-modal"><img src={clothes.photoPrint} alt='nice'/></div> : null
          } */}
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