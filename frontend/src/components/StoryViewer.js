import React, { useEffect } from "react";
import { useState } from "react";
import HTTPRequester from "../utility/Requester";
import PageTitle from "./layout/PageTitle";
import PaginatedItems from "./layout/Pagination";
import ContentItem from "./content/Content";

function MarkupBuilder(props) {
  const httpRequester = HTTPRequester();

  return (
    <>
      {props.submissions
        ? props.submissions.map((item) => (
            <ContentItem httpRequester={httpRequester} item={item} />
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
