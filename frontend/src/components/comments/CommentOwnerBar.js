import { useState } from "react";
import DeleteComment from "./DeleteComment";

export default function CommentOwnerBar({ httpRequester, commentUUID }) {
  const [isActive, setActive] = useState(false);
  const [modContext, setModContext] = useState("");

  let handleSubmit = () => {
    setActive(true);
    setModContext(
      <DeleteComment
        setActive={setActive}
        httpRequester={httpRequester}
        commentUUID={commentUUID}
      />
    );
  };

  return (
    <>
      {!isActive && (
        <header className="articleHeader" id="p1">
          <button onClick={handleSubmit} className="link-button">
            Delete Comment
          </button>
        </header>
      )}
      {isActive && modContext}
    </>
  );
}
