"use client";

import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import StarterKit from "@tiptap/starter-kit";
import { richTextContentStyles } from "./styles";


export function TextDisplayer({ content }: { content: any }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false }),
      Link,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Superscript,
      Subscript,
    ],
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    content: content,
    editable: false,
  });

  return (
    <>
      <style>{richTextContentStyles}</style>
      <RichTextEditor
        editor={editor}
        variant="subtle"
        className="lesson-rich-text"
        styles={{
          root: { border: "none", background: "transparent" },
          content: { background: "transparent" },
        }}
      >
        <RichTextEditor.Content />
      </RichTextEditor>
    </>
  );
}
