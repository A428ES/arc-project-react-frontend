import React, { useEffect } from "react";
import { useState } from "react";
import CommentDropDown from "./comments/CommentDropDown";
import HTTPRequester from "../utility/Requester";
import PageTitle from "./layout/PageTitle";
import ReactHtmlParser from "react-html-parser";
import PaginatedItems from "./layout/Pagination";

function MarkupBuilder(props) {
  return (
    <>
      {props.submissions
        ? props.submissions.map((item) => (
            <>
              <section>
                {" "}
                <header className="articleHeader" id="p1">
                  <b>{item.title}</b> by {item.author} on {item.date}
                </header>
                <p class="article">
                  <div>{ReactHtmlParser(item.story)}</div>
                </p>
                <CommentDropDown key={item.uuid} storyID={item.uuid} />
              </section>
            </>
          ))
        : "No results"}
    </>
  );
}

export default function StoryViewer(prop) {
  const [submissions, setSubmissions] = useState("Loading stories...");
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();

  useEffect(() => {
    if (dataFeed === null) {
      if (prop.author === "stories/search") {
        getData(prop.author, "POST", { search: prop.search_string });
      } else {
        getData(prop.author);
      }
    } else {
      setSubmissions(dataFeed);
    }
  }, [dataFeed]);

  return (
    <>
      <PageTitle text="Viewing Stories" />
      <section>
        {submissions && submissions.results ? (
          <PaginatedItems
            items={submissions.results}
            ComponentCall={MarkupBuilder}
            itemsPerPage={5}
          />
        ) : (
          "No results"
        )}
      </section>
    </>
  );
}
