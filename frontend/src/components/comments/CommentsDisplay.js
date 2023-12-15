import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import NewComment from "./NewComment";
import Comment from "./Comment";

export default function CommentDisplay(prop) {
  const [authState] = useContext(AuthContext);
  const httpRequester = prop.httpRequester;
  const submissions = prop.submissions;

  return (
    <>
      <section>
        {submissions.results && submissions.results !== "none" ? (
          submissions.results.map((item) => (
            <Comment
              key={item.comment_uuid}
              httpRequester={httpRequester}
              item={item}
            />
          ))
        ) : (
          <p class="article">No comments to view</p>
        )}

        <NewComment
          key={prop.storyID}
          storyID={prop.storyID}
          httpRequester={httpRequester}
          loggedIn={authState.userLoggedIn}
        />
      </section>
    </>
  );
}
