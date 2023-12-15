import { useState } from "react";
import DeleteComment from "./DeleteComment";

export default function CommentOwnerBar({ httpRequester, commentUUID }) {
  const [isActive, setActive] = useState(false);
  const [modContext, setMod] = useState("");

  let handleSubmit = () => {
    setActive(true);
    setMod(
      <DeleteComment
        setActive={setActive}
        httpRequester={httpRequester}
        commentUUID={commentUUID}
        key={commentUUID}
      />
    );
  };
  return (
    <>
      {isActive === false ? (
        <header className="articleHeader" id="p1">
          <a href="javascript:void(0)" onClick={() => handleSubmit()}>
            Delete Comment
          </a>
        </header>
      ) : (
        <>{modContext}</>
      )}
    </>
  );
}
