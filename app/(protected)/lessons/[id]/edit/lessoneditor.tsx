"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "@/components/textEditor";
import { Button, MultiSelect, Stack, TextInput } from "@mantine/core";
import { showSuccess, showError } from "@/lib/notifications";
import { createLesson, saveLesson } from "@/lib/lessons";
import { Concept, CreateLessonRequest } from "@/interfaces/interfaces";

export interface LessonEditorProps {
  id?: string;
  initialTitle: string;
  initialLearningObjectives?: string;
  initialContent: any;
  conceptId?: number;
  availableConcepts?: Concept[];
  initialConceptIds?: number[];
  contributorId: string;
}

export default function LessonEditor({
  id,
  initialTitle,
  initialLearningObjectives = "",
  initialContent,
  conceptId,
  availableConcepts = [],
  initialConceptIds = [],
  contributorId,
}: LessonEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [learningObjectives, setLearningObjectives] = useState(initialLearningObjectives);
  const [content, setContent] = useState(initialContent);
  const [selectedConceptIds, setSelectedConceptIds] = useState<string[]>(
    (initialConceptIds.length > 0
      ? initialConceptIds
      : conceptId
        ? [conceptId]
        : []
    ).map(String),
  );
  const [loading, setLoading] = useState(false);
  const isCreateMode = !id;

  const handleSave = async () => {
    if (isCreateMode && selectedConceptIds.length === 0) {
      showError("Please select at least one concept");
      return;
    }

    setLoading(true);

    try {
      const response = id
        ? await saveLesson({ id, title, learningObjectives, content })
        : await createLesson({
          title,
          learningObjectives,
          content,
          conceptIds: selectedConceptIds.map(Number).filter((value) => Number.isFinite(value)),
          contributorId,
          submit: true,
        } satisfies CreateLessonRequest); 

      if (response.success) {
        showSuccess(response.message || "Saved!");

        if (!id) {
          router.replace("/lessons/mine");
          return;
        }

        router.refresh();
      } else {
        showError(response.message || "Failed");
      }

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

      {isCreateMode && (
        <MultiSelect
          label="Concepts"
          placeholder="Select one or more concepts"
          data={availableConcepts.map((concept) => ({
            value: String(concept.conceptId),
            label: concept.title,
          }))}
          value={selectedConceptIds}
          onChange={setSelectedConceptIds}
          searchable
          clearable
          nothingFoundMessage="No concepts found"
        />
      )}

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
