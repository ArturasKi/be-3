// import { useState } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import BackContext from "../BackContext";

function OrderList() {

    const { revOrder, setRemoveRevOrder, setAcceptRevOrder } = useContext(BackContext);

    const [verify, setVerify] = useState(0);

    useEffect(() => {
      if (null === revOrder) {
          return;
      }
      setVerify(revOrder.verify);
  }, [revOrder]);

    const handleOrderNo = (one) => {
      setRemoveRevOrder(one);
    }

    const handleOrderYes = () => {
      const data = {
        verify: verify ? 1 : 0
    };
      console.log(data)
      console.log(verify)
      console.log(revOrder[0].verify ? 0 : 1)
      // setAcceptRevOrder(revOrder[0].verify ? 0 : 1);
      setAcceptRevOrder(data);
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
                  <li className="list-group" key={o.id}>
                    <p className="mt-2">Order Id: <b>{o.id}</b> userId: <b>{o.users_id} </b> Verify: <b>{o.verify}</b></p>
                    <button type="button" className="btn btn-outline-success mt-2" onClick={() => handleOrderYes(o)}>Accept</button>
                    <button type="button" className="btn btn-outline-danger mt-2" onClick={() => handleOrderNo(o)}>Remove</button>
                  </li>) : null
                }
                </ul>
            </div>
          </div>
    )
}

export default OrderList;