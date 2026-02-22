"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/textEditor";
import { Button, Stack, TextInput } from "@mantine/core";
import { showSuccess, showError } from "@/lib/notifications";
import { createLesson, saveLesson } from "@/lib/lessons";
import { CreateLessonRequest } from "@/interfaces/interfaces";

export interface LessonEditorProps {
  id?: string;
  initialTitle: string;
  initialLearningObjectives?: string;
  initialContent: any;
  conceptId: number;
  contributorId: string;
}

export default function LessonEditor({
  id,
  initialTitle,
  initialLearningObjectives = "",
  initialContent,
  conceptId,
  contributorId,
}: LessonEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [learningObjectives, setLearningObjectives] = useState(initialLearningObjectives);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    try {
      const response = id
        ? await saveLesson({ id, title, learningObjectives, content })
        : await createLesson({
          title,
          learningObjectives,
          content,
          conceptId,
          contributorId,
          submit: true,
        } satisfies CreateLessonRequest); 

      response.success
        ? showSuccess(response.message || "Saved!")
        : showError(response.message || "Failed");

    } catch (e: any) {
      showError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap="xl">
      <TextInput size="lg"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        label="Lesson Title"
      />

      <TextInput size="lg"
        value={learningObjectives}
        onChange={(e) => setLearningObjectives(e.currentTarget.value)}
        label="Learning Objectives"
      />

      <RichTextEditor
    
        value={content}
        onChange={setContent}
        isEditing
      />

      <Button loading={loading} onClick={handleSave}>
        Save
      </Button>
    </Stack>
  );
}
