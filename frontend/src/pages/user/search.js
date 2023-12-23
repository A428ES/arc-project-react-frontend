import React, { useState } from "react";
import PageTitle from "../../components/layout/PageTitle";
import Viewer from "../../components/reusable/Viewer";

export default function SearchPage() {
  const [searchString, setSearchString] = useState();
  const [results, setResults] = useState();

  const handleSubmit = (event) => {
    setResults(
      <Viewer
        key={"search-" + searchString}
        itemType="content"
        payload={{ search: searchString }}
        url="stories/search"
      />
    );
  };

  return (
    <>
      <PageTitle text="Search Articles" />
      <section class="centercontent">
        <input
          type="input"
          size="40"
          onChange={(e) => setSearchString(e.target.value)}
        />
        <input type="submit" value="Search" onClick={(e) => handleSubmit(e)} />
      </section>
      <section>{results}</section>
    </>
  );
}
