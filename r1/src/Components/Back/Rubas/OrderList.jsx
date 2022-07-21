import { useContext } from "react";
import BackContext from "../BackContext";


function OrderList() {

    const { revOrder } = useContext(BackContext);

    const handleOrderYes = () => {
        console.log('Yes')
    }

    const handleOrderNo = () => {
        console.log('No')
    }

    return (
        <div className="card mt-4">
            <div className="card-header">
              <h2>List of orders</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                {
                    
                  revOrder ? revOrder.map(o => 
                  <li className="list-group" key={o.id} order={o}>
                    <p className="mt-2">Order Id: <b>{o.id}</b> userId: <b>{o.users_id}</b></p>
                    <button type="button" className="btn btn-outline-success mt-2" onClick={handleOrderYes}>Accept</button>
                    <button type="button" className="btn btn-outline-danger mt-2" onClick={handleOrderNo}>Remove</button>
                  </li>) : null
                }
                </ul>
            </div>
          </div>
    )
}

export default OrderList;