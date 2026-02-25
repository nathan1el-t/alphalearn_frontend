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
  initialContent: any;
  availableConcepts?: Concept[];
  initialConceptPublicIds?: string[];
}

export default function LessonEditor({
  id,
  initialTitle,
  initialContent,
  availableConcepts = [],
  initialConceptPublicIds = [],
}: LessonEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [selectedConceptPublicIds, setSelectedConceptPublicIds] = useState<string[]>(
    initialConceptPublicIds,
  );
  const [loading, setLoading] = useState(false);
  const isCreateMode = !id;

  const handleSave = async () => {
    if (isCreateMode && selectedConceptPublicIds.length === 0) {
      showError("Please select at least one concept");
      return;
    }

    setLoading(true);

    try {
      const response = id
        ? await saveLesson({ id, title, content })
        : await createLesson({
          title,
          content,
          conceptPublicIds: selectedConceptPublicIds,
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

      {isCreateMode && (
        <MultiSelect
          label="Concepts"
          placeholder="Select one or more concepts"
          data={availableConcepts.map((concept) => ({
            value: concept.publicId,
            label: concept.title,
          }))}
          value={selectedConceptPublicIds}
          onChange={setSelectedConceptPublicIds}
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
