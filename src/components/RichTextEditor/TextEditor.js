import React from "react";
import { EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, { defaultSuggestionsFilter } from "@draft-js-plugins/mention";
import editorStyles from "./editorStyle.module.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import mentions from "./mentions";

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      suggestions: mentions,
    };

    this.mentionPlugin = createMentionPlugin();
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  retnder() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];

    return (
      <div className={editorStyles.editor}>
        <Editor editorState={this.state.editorState} onChange={this.onChange} plugins={plugins} />
        <MentionSuggestions onSearchChange={this.onSearchChange} suggestions={this.state.suggestions} />
      </div>
    );
  }
}

export default TextEditor;
