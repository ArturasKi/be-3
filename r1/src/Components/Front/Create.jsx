import { useContext, useState, useRef } from "react";
import BackContext from "../BackContext";
import getBase64 from '../../../Functions/getBase64';

function Create() {
  const { setCreateClothes } = useContext(BackContext);

  const fileInput = useRef();

  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [photoPrint, setPhotoPrint] = useState(null);

  const handleCreate = () => {
    const data = { 
        color: color,
        type: type,
        price: parseFloat(price),
        photo: photoPrint
     };
    setCreateClothes(data);
    setColor('');
    setType('');
    setPrice('');
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
    .then(photo => setPhotoPrint(photo))
    .catch(_ => {
      // tylim
    });
  }

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Create new clothes</h2>
      </div>
      <div className="card-body">
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
            photoPrint ? <div className="photo-bin"><img src={photoPrint} alt='nice'/></div> : null
          }
        <button
          type="button"
          className="btn btn-outline-primary with-loader"
          onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
}

export default Create;