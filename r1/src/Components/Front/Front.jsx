import Nav from '../Back/Nav';
import FrontContext from './FrontContext';
import { useState, useEffect } from "react";
import { authConfig } from "../../Functions/auth";
import axios from "axios";
import List from './List';
import Cart from './Cart';
import Message from './Message';

function Front() {

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [clothes, setClothes] = useState(null);
  const [users, setUsers] = useState(null);
  const [order, setOrder] = useState(null);
  const [addOrder, setAddOrder] = useState(null);
  // const [editOrder, setEditOrder] = useState(null);
  const [modalCart, setModalCart] = useState(null);
  const [deleteOrder, setDeleteOrder] = useState(null);

  const [message, setMessage] = useState(null);

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

  // READ USER
  useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem('user'))[0].id)
    axios
      .get("http://localhost:3003/users", authConfig())
      .then((res) => setUsers(res.data.find(el => el.id === JSON.parse(localStorage.getItem('user'))[0].id)));
  }, []);

  // CREATE ORDER
  useEffect(() => {
    if (null === addOrder) return;
    axios
      .post("http://localhost:3003/orders", addOrder, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "success" });
      });
  }, [addOrder]);

  const showMessage = (msg) => {
    setMessage(msg); // set'inam msg, kad pasirodytų;
    setTimeout(() => setMessage(null), 5000); // vienkartinis intervalas, žinutė dingsta už 5s;
  };

  // DELETE ORDER
  useEffect(() => {
    if (null === deleteOrder) return;
    axios
      .delete("http://localhost:3003/orders/" + deleteOrder.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      });
  }, [deleteOrder]);

  return (
    <FrontContext.Provider value={{
      clothes,
      order,
      setClothes,
      setAddOrder,
      users,
      modalCart,
      setModalCart,
      setDeleteOrder,
      message
    }}>
      <Nav />
        <div className="container">
            <div className="row">
                <div className="col-12">
                  <List />
                </div>
            </div>
        </div>
        <Cart />
        <Message />
    </FrontContext.Provider>
  );
}

export default Front;