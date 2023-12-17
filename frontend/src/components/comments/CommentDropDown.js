import { useState, useContext } from "react";
import CommentDisplay from "./CommentsDisplay";
import { AuthContext } from "../../context/UserContext";

export default function CommentDropDown(prop) {
  const [authState] = useContext(AuthContext);
  const [viewingComment, setView] = useState(false);
  const [submissions, setSubmissions] = useState({ results: [] });

  const getCommentCount = () =>
    Array.isArray(submissions?.results) ? submissions.results.length : 0;

  return (
    <>
      <header className="articleHeader" id="p2">
        <a href="javascript:void(0)" onClick={() => setView(!viewingComment)}>
          {viewingComment ? <>close</> : <></>} comments ({getCommentCount()})
        </a>
      </header>
      <CommentDisplay
        key={prop.storyID}
        viewType="comments/display"
        submissions={submissions}
        storyID={prop.storyID}
        viewing={viewingComment}
        extraState={setSubmissions}
        authorUUID={authState.userData ? authState.userData.uuid : undefined}
      />
    </>
  );
}
