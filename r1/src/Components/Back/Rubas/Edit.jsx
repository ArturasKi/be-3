import { useEffect, useState, useContext, useRef } from "react";
import BackContext from "../BackContext.jsx";
import getBase64 from "../../../Functions/getBase64.js";

function Edit() {

  const { modalClothes, setEditClothes, setModalClothes, clothes, setDeletePhoto } = useContext(BackContext);

  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState('0');
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);

useEffect(() => {
    if (null === modalClothes) {
        return;
    }
    setColor(modalClothes.color);
    setType(modalClothes.type);
    setPrice(modalClothes.price)
    setPhotoPrint(modalClothes.photo);
}, [modalClothes, clothes]);

const doPhoto = () => {
  getBase64(fileInput.current.files[0])
  .then(photo => setPhotoPrint(photo))
  .catch(_ => {
    // tylim
  });
}

const handleEdit = () => {
    const data = {
        color: color,
        id: modalClothes.id,
        type: type,
        price: parseFloat(price),
        photo: photoPrint
    };
    console.log(data);
    setEditClothes(data);
    setModalClothes(null);
}

const handleDeletePhoto = () => {
    setDeletePhoto({id: modalClothes.id});
    setModalClothes(p => ({...p, photo: null}));
    setPhotoPrint(null);
}

  if (modalClothes === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product changer</h5>
            <button
              type="button"
              className="close"
              onClick={() => setModalClothes(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <div className="form-group">
          <label>Color</label>
          <input
            type="color"
            className="form-control"
            value={color}
            id="colorPicker"
            onChange={(e) => setColor(e.target.value)}
          ></input>
          Hex Code: {color}
          <small className="form-text text-muted">Pick the color.</small>
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          ></input>
          <small className="form-text text-muted">Enter type.</small>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <small className="form-text text-muted">Enter price here.</small>
        </div>
        <div className="form-group">
          <label>Photo</label>
          <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
          <small className="form-text text-muted">Upload photo</small>
        </div>
          {
            photoPrint ? <div className="photo-bin-modal"><img src={photoPrint} alt='nice'/></div> : null
          }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
            <button type="button" className="btn btn-outline-danger" onClick={handleDeletePhoto}>Remove photo</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalClothes(null)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;