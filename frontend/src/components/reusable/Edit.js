import React, { useState } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Edit({ httpRequester, setActive, item }) {
  const [updatedContent, updateContent] = useState("");
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(item.content))
    )
  );

  const onChange = (newState) => {
    setEditorState(newState);
    updateContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const handleEdit = () => {
    httpRequester.submitRequest(item.url + "/edit", "POST", {
      uuid: item.uuid,
      new_content: updatedContent,
    });
  };

  return (
    <section>
      <Editor
        editorState={editorState}
        toolbarClassName="white-background-editor"
        wrapperClassName="white-background-editor"
        editorClassName="white-background-editor"
        onEditorStateChange={onChange}
      />
      <br />
      <button onClick={() => handleEdit()}>Submit</button>
      <span> | </span>
      <button onClick={() => setActive(false)}>Cancel</button>
    </section>
  );
}
