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
    <section>
      <header className="articleHeader" id="p1">
        {item.author} said the following on {item.date}
      </header>
      <p className="article">{item.content}</p>
      {authState.userData?.uuid === item.author_uuid && (
        <OwnerBar item={new_item} httpRequester={httpRequester} />
      )}
    </section>
  );
}
