import { useContext } from "react";
import PageTitle from "../../components/layout/PageTitle";
import { AuthContext } from "../../context/UserContext";
import Viewer from "../../components/reusable/Viewer";

export default function MyComments() {
  const [authState] = useContext(AuthContext);

  return (
    <>
      <PageTitle text="Viewing Your Comments" />
      <Viewer key="USERCOMMENTS" itemType="comment" url="comments/mycomments" />
    </>
  );
}
