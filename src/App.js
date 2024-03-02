import React, { useState } from "react";
// import TextEditor from "./components/RichTextEditor/TextEditor";
import SimpleMentionEditor from "./components/RichTextEditor/SimpleMentionEditor";

function App() {
  const [contents, setContents] = useState({});

  return (
    <div>
      <h1>Rich Text Editor</h1>
      <SimpleMentionEditor setContents={setContents} />

      <h2>Contents</h2>
      <div dangerouslySetInnerHTML={{ __html: contents?.markup }}></div>

      <h2>Users</h2>
      <ul>
        {contents?.mentionedUsers?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
