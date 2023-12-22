import CommentDropDown from "../comments/CommentDropDown";
import ReactHtmlParser from "react-html-parser";
import OwnerBar from "../reusable/OwnerBar";

export default function ContentItem({ httpRequester, item }) {
  console.log(item);
  const new_item = {
    ...item,
    type: "Story",
    content: item.story,
    url: "stories",
  };
  return (
    <>
      <div className="article-container">
        <div className="article-header">
          <h2>
            <b>{item.title}</b> by {item.author} on {item.date}
          </h2>
          <OwnerBar httpRequester={httpRequester} item={new_item} />
        </div>
        <div className="article-content">{ReactHtmlParser(item.story)}</div>
        <div className="article-footer">
          <CommentDropDown
            key={item.uuid}
            viewType="comments/display"
            storyID={item.uuid}
          />
        </div>
      </div>
    </>
  );
}
