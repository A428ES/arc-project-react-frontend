import React, { useState } from "react";
import PageTitle from "../../components/page_title";
import StoryViewer from "../../components/story_viewer";

export default function SearchPage() {
  const [searchString, setSearchString] = useState();
  const [results, setResults] = useState();

  const handleSubmit = (event) => {
    setResults(
      <StoryViewer
        key={searchString}
        author="stories/search"
        search_string={searchString}
      />
    );
  };

  return (
    <>
      <PageTitle text="Search Stories" />
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
