import Nav from '../Back/Nav';
import FrontContext from './FrontContext';
import { useState, useEffect } from "react";
// import List from "./List";
import { authConfig } from "../../Functions/auth";
import axios from "axios";
import List from './List';

function Front() {

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [clothes, setClothes] = useState(null);
  const [order, setOrder] = useState(null);
  const [addOrder, setAddOrder] = useState(null);

  // READ CLOTHES
  useEffect(() => {
    axios
      .get("http://localhost:3003/clothes", authConfig())
      .then((res) => setClothes(res.data));
  }, []);

  // READ ORDERS
  useEffect(() => {
    axios
      .get("http://localhost:3003/orders", authConfig())
      .then((res) => setOrder(res.data));
  }, []);

  // CREATE ORDER
  useEffect(() => {
    if (null === addOrder) return;
    axios
      .post("http://localhost:3003/orders", addOrder, authConfig())
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "success" });
      });
  }, [addOrder]);

  return (
    <FrontContext.Provider value={{
      clothes,
      order,
      setClothes,
      setAddOrder
    }}>
      <Nav />
        <div className="container">
            <div className="row">
                <div className="col-6">
                  <List />
                </div>
            </div>
        </div>
    </FrontContext.Provider>
  );
}

export default Front;