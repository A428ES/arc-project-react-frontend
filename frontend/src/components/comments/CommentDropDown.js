import { useState } from "react";
import Viewer from "../reusable/Viewer";

export default function CommentDropDown({ storyID }) {
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
      <Viewer
        url="comments/display"
        parentId={storyID}
        inView={viewingComment}
        updateState={setSubmissions}
        payload={{ story_id: storyID }}
        itemType="comment"
      />
    </>
  );
}
