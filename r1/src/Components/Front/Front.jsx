import FrontContext from './FrontContext';

function Front() {

  return (
    <FrontContext.Provider value={{}}>
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