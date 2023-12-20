import CommentDropDown from "../comments/CommentDropDown";
import ReactHtmlParser from "react-html-parser";
import OwnerBar from "../reusable/OwnerBar";

export default function ContentItem({ httpRequester, item }) {
  const new_item = {
    ...item,
    type: "Story",
    uuid: item.story_uuid,
    content: item.story,
    url: "stories",
  };
  return (
    <>
      <section>
        {" "}
        <header className="articleHeader" id="p1">
          <b>{item.title}</b> by {item.author} on {item.date}
        </header>
        <p class="article">
          <div>
            {ReactHtmlParser(item.story)}
            <OwnerBar httpRequester={httpRequester} item={new_item} />
          </div>
        </p>
        <CommentDropDown
          key={item.uuid}
          viewType="comments/display"
          storyID={item.uuid}
        />
      </section>
    </>
  );
}
