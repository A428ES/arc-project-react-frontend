import { useContext } from "react";
import CommentDisplay from "../../components/comments/CommentsDisplay";
import PageTitle from "../../components/layout/PageTitle";
import { AuthContext } from "../../context/UserContext";

export default function MyComments() {
  const [authState] = useContext(AuthContext);

  return (
    <>
      <PageTitle text="Viewing Your Comments" />
      <CommentDisplay
        key="USERCOMMENTS"
        storyID="USERCOMMENTS"
        viewType="comments/mycomments"
        authorUUID={authState.userData ? authState.userData.uuid : undefined}
      />
    </>
  );
}
