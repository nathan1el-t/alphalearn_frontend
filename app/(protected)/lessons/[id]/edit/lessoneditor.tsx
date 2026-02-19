"use client";
import { useState } from "react";
import { RichTextEditor } from "@/components/textEditor";
import { Button, Stack, TextInput } from "@mantine/core";
import { showSuccess, showError } from "@/lib/notifications";

export default function LessonEditor({
  id,
  initialTitle,
  initialContent,
  onEmit
}: {
  id: string;
  initialTitle: string;
  initialContent: any;
  onEmit: (data: { title: string; content: any }) => Promise<{ success: boolean; message?: string }>;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const {success, message} = await onEmit({ title, content });
      success == true ? showSuccess(message || "yay") : showError(message || "nooo");
    } catch (e:any) {
      console.error(e);
      showError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack>
      <TextInput
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        label="Lesson Title"
      />
      <RichTextEditor value={content} onChange={setContent} isEditing />
      <Button loading={loading} onClick={handleSave}>Save</Button>
    </Stack>
  );
}
