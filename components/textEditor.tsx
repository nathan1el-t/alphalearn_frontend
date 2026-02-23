"use client"

import { useEffect } from "react";
import { useEditor } from "@tiptap/react";
import { RichTextEditor as MantineRichTextEditor, Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import StarterKit from "@tiptap/starter-kit";

interface RichTextEditorProps {
  value: string | any;
  onChange: (value: string | any) => void;
  isEditing: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  isEditing,
}: RichTextEditorProps) {
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
    content: value,
    editable: isEditing,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
  if (editor) {
    editor.setEditable(isEditing);
  }
}, [editor, isEditing]);

  return (
    <MantineRichTextEditor editor={editor} variant="subtle" 
    >
      {isEditing && (
        <MantineRichTextEditor.Toolbar
          sticky
          stickyOffset="var(--docs-header-height)"
        >
          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Bold />
            <MantineRichTextEditor.Italic />
            <MantineRichTextEditor.Underline />
            <MantineRichTextEditor.Strikethrough />
            <MantineRichTextEditor.ClearFormatting />
            <MantineRichTextEditor.Highlight />
            <MantineRichTextEditor.Code />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.H1 />
            <MantineRichTextEditor.H2 />
            <MantineRichTextEditor.H3 />
            <MantineRichTextEditor.H4 />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Blockquote />
            <MantineRichTextEditor.Hr />
            <MantineRichTextEditor.BulletList />
            <MantineRichTextEditor.OrderedList />
            <MantineRichTextEditor.Subscript />
            <MantineRichTextEditor.Superscript />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Link />
            <MantineRichTextEditor.Unlink />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.AlignLeft />
            <MantineRichTextEditor.AlignCenter />
            <MantineRichTextEditor.AlignRight />
            <MantineRichTextEditor.AlignJustify />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Undo />
            <MantineRichTextEditor.Redo />
          </MantineRichTextEditor.ControlsGroup>
        </MantineRichTextEditor.Toolbar>
      )}

      <MantineRichTextEditor.Content />
    </MantineRichTextEditor>
  );
}
