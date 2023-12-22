import { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import OwnerBar from "../reusable/OwnerBar";

export default function Comment({ item, httpRequester }) {
  const [authState] = useContext(AuthContext);

  const new_item = {
    ...item,
    uuid: item.comment_uuid,
    type: "Comment",
    url: "comments",
  };

  return (
    <>
      <div className="comment-container">
        <div className="comment-header">
          <h3>
            {item.author} commented the following on {item.date}
          </h3>
          <br />{" "}
          <OwnerBar
            key={"ownerbar-" + new_item.uuid}
            item={new_item}
            httpRequester={httpRequester}
          />
        </div>
        <div className="comment-content">{item.content}</div>
      </div>
    </>
  );
}
