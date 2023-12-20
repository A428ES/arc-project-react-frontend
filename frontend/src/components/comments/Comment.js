import { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import CommentOwnerBar from "./CommentOwnerBar";

export default function Comment({ item, httpRequester }) {
  const [authState] = useContext(AuthContext);

  return (
    <section>
      <header className="articleHeader" id="p1">
        {item.author} said the following on {item.date}
      </header>
      <p className="article">{item.content}</p>
      {authState.userData?.uuid === item.author_uuid && (
        <CommentOwnerBar
          commentUUID={item.comment_uuid}
          httpRequester={httpRequester}
        />
      )}
    </section>
  );
}
