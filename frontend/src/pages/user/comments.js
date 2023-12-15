import React, { useContext, useEffect, useState } from "react";
import CommentDisplay from "../../components/comments/CommentsDisplay";
import { AuthContext } from "../../context/UserContext";
import PageTitle from "../../components/layout/PageTitle";
import HTTPRequester from "../../utility/Requester";

export default function MyComments() {
  const [newComment, setNewComment] = useState();

  return (
    <>
      <PageTitle text="Viewing Your Comments" />
      <CommentDisplay
        viewType="comments/mycomments"
        storyID={null}
        setNew={setNewComment}
        newComment={newComment}
      />
    </>
  );
}
