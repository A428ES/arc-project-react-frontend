import { useContext, useState } from "react";
import Delete from "./Delete";
import Edit from "./Edit";
import PopupEditor from "../layout/Popup";
import { AuthContext } from "../../context/UserContext";

export default function OwnerBar({ httpRequester, item }) {
  const [authState] = useContext(AuthContext);
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectValue, setSelectValue] = useState("default"); // State to manage select value
  const [componentToRender, setComponentToRender] = useState(null); // State for the dynamic component

  const actionMap = {
    delete: Delete,
    edit: Edit,
  };

  const onClose = () => {
    setEditorOpen(false);
    setSelectValue("default");
  };

  let handleSubmit = (action) => {
    const ActionComponent = actionMap[action];

    if (ActionComponent) {
      setComponentToRender(() => (
        <ActionComponent
          key={action + item.uuid}
          httpRequester={httpRequester}
          item={item}
          setEditorOpen={setEditorOpen}
          setResetMenu={setSelectValue}
          onClose={onClose}
        />
      ));

      setEditorOpen(true);
    }
  };

  return (
    <>
      {authState.userData && authState.userData?.uuid === item.author_uuid && (
        <>
          <select
            onChange={(e) => {
              setSelectValue(e.target.value); // Update state with the selected value
              handleSubmit(e.target.value);
            }}
            value={selectValue} // Controlled component
          >
            <option value="default" disabled>
              Owner Options
            </option>
            <option value="edit">Edit {item.type}</option>
            <option value="delete">Delete {item.type}</option>
          </select>

          {isEditorOpen && componentToRender && (
            <PopupEditor
              item={currentItem}
              onSave={() => {}}
              onClose={onClose}
              componentToRender={() => componentToRender}
            />
          )}
        </>
      )}
    </>
  );
}
