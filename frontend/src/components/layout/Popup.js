import React from "react";

const PopupEditor = ({ item, onSave, onClose, componentToRender }) => {
  const [editedItem, setEditedItem] = React.useState(item);

  const handleChange = (event) => {
    setEditedItem({ ...editedItem, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    onSave(editedItem);
    onClose();
  };

  return (
    <div className="popup-editor">
      <div className="popup-content">
        {componentToRender && componentToRender()}
        <center>
          <button onClick={() => onClose()}>Close Window</button>
        </center>
      </div>
    </div>
  );
};

export default PopupEditor;
