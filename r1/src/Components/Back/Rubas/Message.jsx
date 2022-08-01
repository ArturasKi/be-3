import { useContext } from "react";
import BackContext from "../BackContext";

function Message() {

const { message } = useContext(BackContext);

if (null === message) { // pradžioje msg nėra, pasirodys, kai paset'insim;
    return null;
}

  return (
    <div className="show-message">
      <div className={'alert alert-' + message.type} role="alert">
        {message.text}
      </div>
    </div>
  );
}

export default Message;