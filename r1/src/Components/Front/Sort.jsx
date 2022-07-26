import { useState, useContext } from "react";
import FrontContext from "./FrontContext";

function Sort() {
  const { clothes, setClothes } = useContext(FrontContext);

  const [sortBy, setSortBy] = useState("default");
  
  const doSort = (e) => {
    setSortBy(e.target.value);
    const p = [...clothes];
    switch (e.target.value) {
      case "ascType":
        p.sort((a, b) => {
          if (a.type > b.type) return 1;
          if (a.type < b.type) return -1;
          return 0;
        });
        break;
      case "descType":
        p.sort((a, b) => {
          if (a.type > b.type) return -1;
          if (a.type < b.type) return 1;
          return 0;
        });
        break;
      case "ascPrice":
        p.sort((a, b) => a.price - b.price);
        break;
      case "descPrice":
        p.sort((a, b) => b.price - a.price);
        break;

      default:
        p.sort((a, b) => a.id - b.id); // sugrįžtam į pradžią;
    }
    setClothes(p);
  };

  return (
            <div className="col-3 mt-4 ml-1">
              <div className="form-group">
                <select
                  className="form-control"
                  value={sortBy}
                  onChange={doSort}
                >
                  <option value="default">Default Sort</option>
                  <option value="ascType">Type A-Z</option>
                  <option value="descType">Type Z-A</option>
                  <option value="ascPrice">Price min-max</option>
                  <option value="descPrice">Price max-min</option>
                </select>
              </div>
            </div>
  );
}

export default Sort;