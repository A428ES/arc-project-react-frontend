import { useEffect, useState, useContext } from "react";
import CommentDisplay from "./CommentsDisplay";
import HTTPRequester from "../../utility/Requester";
import { AuthContext } from "../../context/UserContext";

export default function CommentDropDown(prop) {
  const [authState] = useContext(AuthContext);
  const [viewingComment, setView] = useState(false);
  const [submissions, setSubmissions] = useState(null);
  const httpRequester = HTTPRequester();

  const requestRefresh = () => {
    httpRequester.submitRequest("comments/display", "POST", {
      story_id: prop.storyID,
    });
  };

  const getCommentCount = () => {
    if (Array.isArray(submissions?.results)) {
      return submissions.results.length;
    }

    return 0;
  };

  useEffect(() => {
    if (!Array.isArray(httpRequester.dataFeed?.results)) {
      requestRefresh();
    } else {
      setSubmissions(httpRequester.dataFeed);
    }
  }, [httpRequester.dataFeed]);

  return (
    <>
      {viewingComment === false ? (
        <header className="articleHeader" id="p2">
          <a href="javascript:void(0)" onClick={() => setView(true)}>
            comments ({getCommentCount()})
          </a>
        </header>
      ) : (
        <>
          <header className="articleHeader" id="p2">
            <a href="javascript:void(0)" onClick={() => setView(false)}>
              Close {getCommentCount()} comments
            </a>
          </header>
          <CommentDisplay
            key={prop.storyID}
            httpRequester={httpRequester}
            submissions={submissions}
            storyID={prop.storyID}
            authorUUID={
              authState.userData ? authState.userData.uuid : undefined
            }
          />
        </>
      )}
    </>
  );
}
