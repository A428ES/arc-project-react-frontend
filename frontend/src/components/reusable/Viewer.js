import React, { useEffect } from "react";
import { useState } from "react";
import PaginatedItems from "../layout/Pagination";
import ContentItem from "../content/Content";
import HTTPRequester from "../../utility/Requester";
import NewComment from "../comments/NewComment";
import Comment from "../comments/Comment";

function MarkupBuilder({ submissions, httpRequester, itemType }) {
  const componentMap = { comment: Comment, content: ContentItem };
  const ComponentFind = componentMap[itemType];

  return (
    <>
      {submissions.map((item) => (
        <ComponentFind
          key={"content-item-" + item.uuid}
          httpRequester={httpRequester}
          item={item}
        />
      ))}
    </>
  );
}

export default function Viewer({
  itemType,
  url = null,
  inView = true,
  payload = {},
  parentId = null,
  updateState = null,
}) {
  const [submissions, setSubmissions] = useState("Loading content...");
  const httpRequester = HTTPRequester();

  const requestRefresh = () => {
    httpRequester.submitRequest(url, "POST", payload);
  };

  useEffect(() => {
    if (!Array.isArray(httpRequester.dataFeed?.results)) {
      requestRefresh();
    } else {
      if (updateState !== null) {
        updateState(httpRequester.dataFeed);
      }
      setSubmissions(httpRequester.dataFeed);
    }
  }, [httpRequester.dataFeed]);

  return (
    <section>
      {Array.isArray(submissions?.results) && inView === true ? (
        <PaginatedItems
          items={submissions.results}
          ComponentCall={MarkupBuilder}
          httpRequester={httpRequester}
          itemsPerPage={5}
          itemType={itemType}
        />
      ) : (
        <></>
      )}
      <>
        {inView && url === "comments/display" ? (
          <NewComment
            key={"newcomment-" + parentId}
            storyID={parentId}
            httpRequester={httpRequester}
          />
        ) : (
          <></>
        )}
      </>
    </section>
  );
}
