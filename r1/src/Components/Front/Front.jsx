import Nav from '../Back/Nav';
import FrontContext from './FrontContext';

function Front() {

  return (
    <FrontContext.Provider value={{}}>
      <Nav />
        <div className="container">
            <div className="row">
                <div className="col-4">
                  FRONT
                </div>
            </div>
        </div>
    </FrontContext.Provider>
  );
}

export default Front;