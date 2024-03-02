//https://www.draft-js-plugins.com/
//<p>Hi Julian Krispel-Samsel , Nik Graf&nbsp;</p> <p></p> <p>Could you please work on this opportunity?</p>

import React, { useCallback, useMemo, useRef, useState } from "react";
import { EditorState, convertToRaw, convertFromHTML, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import createMentionPlugin, { defaultSuggestionsFilter } from "@draft-js-plugins/mention";
import createToolbarPlugin, { Separator } from "@draft-js-plugins/static-toolbar";
import createTextAlignmentPlugin from "@draft-js-plugins/text-alignment";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";
import createHashtagPlugin from "@draft-js-plugins/hashtag";

import "@draft-js-plugins/hashtag/lib/plugin.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";

import mentions from "./mentions";
import editorStyles from "./SimpleMentionEditor.module.css";
import "../../App.css";

const SimpleMentionEditor = (props) => {
  const { setContents } = props;
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // const sampleMarkup =
  //   "<p>Hi Julian Krispel-Samsel , Nik Graf&nbsp;</p> <p></p> <p>Could you please work on this opportunity?</p>";
  // const blocksFromHTML = convertFromHTML(sampleMarkup);
  // const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);

  // const [editorState, setEditorState] = useState(() => EditorState.createWithContent(state));
  const ref = useRef(Editor);
  const [open, setOpen] = useState(true);
  const [suggestions, setSuggestions] = useState(mentions);

  const { MentionSuggestions, plugins, Toolbar, TextAlignment } = useMemo(() => {
    const hashtagPlugin = createHashtagPlugin();

    const textAlignmentPlugin = createTextAlignmentPlugin();
    const { TextAlignment } = textAlignmentPlugin;

    // eslint-disable-next-line no-shadow
    const mentionPlugin = createMentionPlugin();
    const { MentionSuggestions } = mentionPlugin;

    const toolbarPlugin = createToolbarPlugin();
    const { Toolbar } = toolbarPlugin;

    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin, toolbarPlugin, textAlignmentPlugin, hashtagPlugin];

    return { plugins, MentionSuggestions, Toolbar, TextAlignment };
  }, []);

  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);

  const onSaveChangeHandler = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    const markup = draftToHtml(raw);
    let mentionedUsers = [];
    for (let key in raw.entityMap) {
      let entity = raw.entityMap[key];
      if (entity.type === "mention") {
        mentionedUsers.push(entity.data.mention);
      }
    }

    const data = { markup, mentionedUsers };

    props.setContents(data);
  };

  return (
    <React.Fragment>
      <div className={editorStyles.editor}>
        <Editor
          editorKey={"editor"}
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={ref}
          placeholder="Write something..."
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
          onAddMention={(mentionData) => {
            // get the mention object selected
            console.log("onAddMention", mentionData);
          }}
        />
        <div className={editorStyles.toolbar}>
          <Toolbar>
            {(externalProps) => (
              <React.Fragment>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <Separator {...externalProps} />

                <TextAlignment {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
              </React.Fragment>
            )}
          </Toolbar>
        </div>
      </div>
      <div>
        <button onClick={onSaveChangeHandler}>Save</button>
      </div>
    </React.Fragment>
  );
};

export default SimpleMentionEditor;
