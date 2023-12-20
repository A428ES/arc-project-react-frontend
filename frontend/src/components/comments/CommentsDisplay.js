import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import NewComment from "./NewComment";
import Comment from "./Comment";
import HTTPRequester from "../../utility/Requester";

export default function CommentDisplay(prop) {
  const [authState] = useContext(AuthContext);
  const [submissions, setSubmissions] = useState(null);
  const httpRequester = HTTPRequester();
  let inView = prop?.viewing === undefined ? true : prop?.viewing;

  const requestRefresh = () => {
    httpRequester.submitRequest(prop.viewType, "POST", {
      story_id: prop.storyID,
    });
  };

  useEffect(() => {
    if (!Array.isArray(httpRequester.dataFeed?.results)) {
      requestRefresh();
    } else {
      if (prop?.extraState !== undefined) {
        prop.extraState(httpRequester.dataFeed);
      }

      setSubmissions(httpRequester.dataFeed);
    }
  }, [httpRequester.dataFeed]);

  return (
    <>
      <section>
        {Array.isArray(submissions?.results) ? (
          submissions.results.map((item) => (
            <>
              {inView ? (
                <Comment
                  key={item.comment_uuid}
                  httpRequester={httpRequester}
                  item={item}
                />
              ) : (
                <></>
              )}
            </>
          ))
        ) : (
          <p class="article">No comments to view</p>
        )}
        {inView && prop.viewType !== "comments/mycomments" ? (
          <NewComment
            key={prop.storyID}
            storyID={prop.storyID}
            httpRequester={httpRequester}
            loggedIn={authState.userLoggedIn}
          />
        ) : (
          <></>
        )}
      </section>
    </>
  );
}
