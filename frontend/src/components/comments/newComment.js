import React, { useEffect } from "react";
import { useState } from "react";

export default function NewComment({ httpRequester, storyID, loggedIn }) {
  const [commentData, setComment] = useState("");

  let handleSubmit = (event) => {
    httpRequester.submitRequest("comments/submit", "POST", {
      comment: commentData,
      story: storyID,
    });
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
