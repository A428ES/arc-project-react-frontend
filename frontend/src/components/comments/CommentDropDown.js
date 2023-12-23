import { useState } from "react";
import Viewer from "../reusable/Viewer";
import NewComment from "./NewComment";
import HTTPRequester from "../../utility/Requester";
import PopupEditor from "../layout/Popup";

export default function CommentDropDown({ storyID }) {
  const [viewingComment, setView] = useState(false);
  const [submissions, setSubmissions] = useState({ results: [] });
  const [isEditorOpen, setEditorOpen] = useState(false);
  const httpRequester = HTTPRequester();

  const getCommentCount = () =>
    Array.isArray(submissions?.results) ? submissions.results.length : 0;

  const onClose = () => {
    setEditorOpen(false);
    setView(true);
  };

  const newComment = () => {
    return (
      <NewComment
        key={"newcomment-" + storyID}
        storyID={storyID}
        httpRequester={httpRequester}
        onClose={onClose}
      />
    );
  };

  return (
    <>
      <button onClick={() => setView(!viewingComment)}>
        {viewingComment ? "Close" : "Comments"} ({getCommentCount()})
      </button>{" "}
      | <button onClick={() => setEditorOpen(true)}>Leave a Comment</button>
      <Viewer
        url="comments/display"
        parentId={storyID}
        inView={viewingComment}
        updateState={setSubmissions}
        payload={{ story_id: storyID }}
        itemType="comment"
        requesterOverride={httpRequester}
      />
      {isEditorOpen && newComment && (
        <PopupEditor
          onSave={() => {}}
          onClose={onClose}
          componentToRender={newComment}
        />
      )}
    </>
  );
}
