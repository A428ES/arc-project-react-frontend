import { useState, useContext } from "react";
import CommentDisplay from "./CommentsDisplay";
import { AuthContext } from "../../context/UserContext";

export default function CommentDropDown({ storyID }) {
  const [authState] = useContext(AuthContext);
  const [viewingComment, setView] = useState(false);
  const [submissions, setSubmissions] = useState({ results: [] });

  const getCommentCount = () =>
    Array.isArray(submissions?.results) ? submissions.results.length : 0;

  return (
    <>
      <header className="articleHeader" id="p2">
        <button onClick={() => setView(!viewingComment)}>
          {viewingComment ? "Close" : "Comments"} ({getCommentCount()})
        </button>
      </header>
      <CommentDisplay
        viewType="comments/display"
        submissions={submissions}
        storyID={storyID}
        viewing={viewingComment}
        extraState={setSubmissions}
        authorUUID={authState.userData?.uuid}
      />
    </>
  );
}
