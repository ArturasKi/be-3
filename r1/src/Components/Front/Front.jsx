import Nav from '../Back/Nav';
import FrontContext from './FrontContext';
import { useState, useEffect } from "react";
// import List from "./List";
import { authConfig } from "../../Functions/auth";
import axios from "axios";
import List from './List';

function Front() {

  // const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [clothes, setClothes] = useState(null);

  // READ CLOTHES
  useEffect(() => {
    axios
      .get("http://localhost:3003/clothes", authConfig())
      .then((res) => setClothes(res.data));
  }, []);

  return (
    <FrontContext.Provider value={{
      clothes,
      setClothes
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