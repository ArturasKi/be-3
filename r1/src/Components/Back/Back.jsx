import { useState, useEffect } from "react";
import axios from "axios";
// import CatsCrud from "./Cats/Crud";
// import ProductsCrud from "./Products/Crud";
// import ComCrud from "./Com/Crud";
import Nav from './Nav';
import List from "./Rubas/List";
import BackContext from "./BackContext";
import Create from "./Rubas/Create";
import Edit from "./Rubas/Edit";
// import { v4 as uuidv4 } from "uuid";
import { authConfig } from '../../Functions/auth.js';
import OrderList from "./Rubas/OrderList";

function Back() {

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [clothes, setClothes] = useState(null);
  const [createClothes, setCreateClothes] = useState(null);
  const [deleteClothes, setDeleteClothes] = useState(null);
  const [editClothes, setEditClothes] = useState(null);
  const [modalClothes, setModalClothes] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(null);

  const [revOrder, setRevOrder] = useState(null);
  // const [acceptRevOrder, setAcceptRevOrder] = useState(null);
  const [removeRevOrder, setRemoveRevOrder] = useState(null);

// READ CLOTHING
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/clothes", authConfig())
      .then((res) => setClothes(res.data));
  }, [lastUpdate]);

// READ REVIEW ORDER
  useEffect(() => {
    axios
      .get("http://localhost:3003/orders", authConfig())
      .then((res) => setRevOrder(res.data));
  }, [lastUpdate]);
    
// CREATE CLOTHING
  useEffect(() => {
    if (null === createClothes) return;
    axios
      .post("http://localhost:3003/admin/clothes", createClothes, authConfig())
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "success" });
      });
  }, [createClothes]);

// DELETE CLOTHING
  useEffect(() => {
    if (null === deleteClothes) return;
    axios
      .delete("http://localhost:3003/admin/clothes/" + deleteClothes.id, authConfig())
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "danger" });
      });
  }, [deleteClothes]);

// DELETE REV ORDER
  useEffect(() => {
    if (null === removeRevOrder) return;
    axios
      .delete("http://localhost:3003/orders/" + removeRevOrder.id, authConfig())
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "danger" });
      });
  }, [removeRevOrder]);

  // DELETE PHOTO
  useEffect(() => {
    if (null === deletePhoto) return;
    axios
      .delete("http://localhost:3003/admin/photos/" + deletePhoto.id, authConfig())
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "danger" });
      });
  }, [deletePhoto]);

  // EDIT CLOTHING
  useEffect(() => {
    if (null === editClothes) return;
    axios
      .put("http://localhost:3003/admin/clothes/" + editClothes.id, editClothes, authConfig())
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "info" });
      });
  }, [editClothes]);

  // // EDIT ORDER
  // useEffect(() => {
  //   if (null === acceptRevOrder) return;
  //   axios
  //     .put("http://localhost:3003/orders/" + acceptRevOrder.id, acceptRevOrder, authConfig())
  //     .then((res) => {
  //       // showMessage(res.data.msg);
  //       setLastUpdate(Date.now()); // irasymas, update;
  //     })
  //     .catch((error) => {
  //       // showMessage({ text: error.message, type: "info" });
  //     });
  // }, [acceptRevOrder]);

  return (
    <BackContext.Provider value={{
        clothes,
        setCreateClothes,
        setDeleteClothes,
        setEditClothes,
        modalClothes,
        setModalClothes,
        setDeletePhoto,
        revOrder,
        setRemoveRevOrder,
    }}>
      <Nav />
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <Create />
                    <OrderList />
                </div>
                <div className="col-8">
                    <List/>
                </div>
            </div>
        </div>
        <Edit />
    </BackContext.Provider>
  );
}

export default Back;