import { useState, useEffect } from "react";
import axios from "axios";
// import CatsCrud from "./Cats/Crud";
// import ProductsCrud from "./Products/Crud";
// import ComCrud from "./Com/Crud";
import List from "./Rubas/List";
import BackContext from "./BackContext";
import Create from "./Rubas/Create";
// import { v4 as uuidv4 } from "uuid";
// import { authConfig } from '../../Functions/auth';

function Back() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [clothes, setClothes] = useState(null);
  const [createClothes, setCreateClothes] = useState(null);
  const [deleteClothes, setDeleteClothes] = useState(null);

//   READ CLOTHING
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/clothes")
      .then((res) => setClothes(res.data));
  }, [lastUpdate]);
    
//   CREATE CLOTHING
  useEffect(() => {
    if (null === createClothes) return;
    axios
      .post("http://localhost:3003/admin/clothes", createClothes)
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "success" });
      });
  }, [createClothes]);

  // DELETE CATEGORY
  useEffect(() => {
    if (null === deleteClothes) return;
    axios
      .delete("http://localhost:3003/admin/clothes/" + deleteClothes.id)
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "danger" });
      });
  }, [deleteClothes]);

  // EDIT CATEGORY
//   useEffect(() => {
//     if (null === editCat) return;
//     axios
//       .put("http://localhost:3003/admin/cats/" + editCat.id, editCat, authConfig())
//       .then((res) => {
//         showMessage(res.data.msg);
//         setLastUpdate(Date.now()); // irasymas, update;
//       })
//       .catch((error) => {
//         showMessage({ text: error.message, type: "info" });
//       });
//   }, [editCat]);

  return (
    <BackContext.Provider value={{
        clothes,
        setCreateClothes,
        setDeleteClothes
    }}>
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <Create />
                </div>
                <div className="col-8">
                    <List/>
                </div>
            </div>
        </div>
    </BackContext.Provider>
  );
}

export default Back;