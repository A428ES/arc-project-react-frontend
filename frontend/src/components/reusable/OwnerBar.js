import { useState } from "react";
import Delete from "./Delete";
import Edit from "./Edit";

export default function OwnerBar({ httpRequester, item }) {
  const [isActive, setActive] = useState(false);
  const [modContext, setModContext] = useState("");

  const actionMap = {
    delete: Delete,
    edit: Edit,
  };

  let handleSubmit = (action) => {
    const ActionComponent = actionMap[action];

    if (ActionComponent) {
      setActive(true);
      setModContext(
        <ActionComponent
          setActive={setActive}
          httpRequester={httpRequester}
          item={item}
        />
      );
    }
  };

  return (
    <>
      {!isActive && (
        <header className="articleHeader" id="p1">
          <button
            onClick={() => handleSubmit("delete")}
            className="link-button"
          >
            Delete {item.type}
          </button>
          <span> | </span>
          <button onClick={() => handleSubmit("edit")} className="link-button">
            Edit {item.type}
          </button>
        </header>
      )}
      {isActive && modContext}
    </>
  );
}
