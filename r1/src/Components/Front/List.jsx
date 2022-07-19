import { useContext } from "react";
import Clothes from "./Clothes";
import FrontContext from "./FrontContext";


function List() {

    const { clothes } = useContext(FrontContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
              <h2>List of clothes</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    clothes ? clothes.map(c => <Clothes key={c.id} clothes={c}></Clothes>) : null
                    }
                </ul>
            </div>
          </div>
    )
}

export default List;