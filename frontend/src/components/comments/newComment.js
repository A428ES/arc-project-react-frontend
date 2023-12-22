import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/UserContext";

export default function NewComment({ httpRequester, storyID, onClose }) {
  const [commentData, setComment] = useState("");
  const [authState] = useContext(AuthContext);
  let loggedIn = authState.userLoggedIn;

  let handleSubmit = (event) => {
    httpRequester.submitRequest("comments/submit", "POST", {
      comment: commentData,
      story: storyID,
    });
    onClose();
    event.preventDefault();
  };

  useEffect(() => {
    setComment("");
  }, [httpRequester.dataFeed]);

  return (
    <>
      {loggedIn ? (
        <div class="content">
          <div class="loginError">{httpRequester.errorFeed}</div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={commentData}
              name="comment"
              rows="10"
              cols="70"
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <input value="Submit Comment" type="submit" />
          </form>
        </div>
      ) : (
        <>Please log in to comment.</>
      )}
    </>
  );
}
