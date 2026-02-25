"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "@/components/texteditor/textEditor";
import { MultiSelect, Stack } from "@mantine/core";
import { showSuccess, showError } from "@/lib/notifications";
import { createLesson, saveLesson, submitLesson } from "@/lib/lessons";
import { Concept, CreateLessonRequest } from "@/interfaces/interfaces";
import ConfirmModal from "@/components/common/confirmModal";

export interface LessonEditorProps {
  id?: string;
  initialTitle: string;
  initialContent: any;
  availableConcepts?: Concept[];
  initialConceptIds?: number[];
  contributorId: string;
}

export default function LessonEditor({
  id,
  initialTitle,
  initialContent,
  availableConcepts = [],
  initialConceptIds = [],
  contributorId,
}: LessonEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [selectedConceptIds, setSelectedConceptIds] = useState<string[]>(
    initialConceptIds.map(String),
  );
  const [loading, setLoading] = useState(false);
  const [discardModalOpened, setDiscardModalOpened] = useState(false);
  const isCreateMode = !id;

  const handleSave = async () => {
    if (!title.trim()) {
      showError("Please enter a lesson title");
      return;
    }

    if (isCreateMode && selectedConceptIds.length === 0) {
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

  const handleSubmitForReview = async () => {
    if (!id) return;

    // Optional: Save changes first if the user has edited things. 
    // For now, let's just submit as requested.
    setLoading(true);
    try {
      const response = await submitLesson(id);
      if (response.success) {
        showSuccess(response.message);
        router.refresh();
      } else {
        showError(response.message);
      }
    } catch (e: any) {
      showError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Title Input ── */}
      <div className="space-y-2">
        <label
          htmlFor="lesson-title"
          className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
        >
          Lesson Title
        </label>
        <input
          id="lesson-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your lesson a bold title..."
          className="w-full px-5 py-4 rounded-xl text-2xl font-bold
            bg-[var(--color-surface)] border border-[var(--color-border)]
            text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/40
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]
            transition-all duration-300"
        />
      </div>

      {/* ── Concept Selector (Create mode only) ── */}
      {isCreateMode && (
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Linked Concepts
          </label>
          <MultiSelect
            placeholder="Search and select concepts..."
            data={availableConcepts.map((concept) => ({
              value: String(concept.conceptId),
              label: concept.title,
            }))}
            value={selectedConceptIds}
            onChange={setSelectedConceptIds}
            searchable
            clearable
            nothingFoundMessage="No concepts found"
            radius="xl"
            size="md"
            styles={{
              input: {
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
                minHeight: "48px",
              },
              dropdown: {
                backgroundColor: "var(--color-surface-elevated)",
                borderColor: "var(--color-border)",
              },
              option: {
                color: "var(--color-text)",
              },
              pill: {
                backgroundColor: "var(--color-primary)",
                color: "#fff",
              },
            }}
          />
        </div>
      )}

      {/* ── Rich Text Editor ── */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Content
        </label>
        <div
          className="rounded-xl border border-[var(--color-border)]
            focus-within:ring-2 focus-within:ring-[var(--color-primary)]/30 focus-within:border-[var(--color-primary)]
            transition-all duration-300"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <RichTextEditor
            value={content}
            onChange={setContent}
            isEditing
          />
        </div>
      </div>

      {/* ── Action Bar ── */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
        <button
          type="button"
          onClick={() => setDiscardModalOpened(true)}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold
            text-[var(--color-text-muted)] hover:text-[var(--color-text)]
            bg-transparent hover:bg-[var(--color-overlay)]
            border border-[var(--color-border)]
            transition-all duration-200 cursor-pointer"
        >
          Discard
        </button>

        <ConfirmModal
          opened={discardModalOpened}
          onClose={() => setDiscardModalOpened(false)}
          onConfirm={() => router.back()}
          title="Discard Changes?"
          message="Are you sure you want to discard your changes? This action cannot be undone."
          confirmText="Discard"
          confirmColor="red"
          icon="delete"
        />

        <div className="flex gap-3">
          {!isCreateMode && (
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmitForReview}
              className="px-6 py-3 rounded-xl text-sm font-bold
                bg-transparent hover:bg-[var(--color-overlay)]
                text-[var(--color-primary)] border border-[var(--color-primary)]
                active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 cursor-pointer
                flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">
                send
              </span>
              Submit for Review
            </button>
          )}

          <button
            type="button"
            disabled={loading}
            onClick={handleSave}
            className="px-8 py-3 rounded-xl text-sm font-bold
              bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]
              active:bg-[var(--color-primary-active)]
              text-white shadow-[0_0_20px_var(--color-shadow)]
              hover:shadow-[0_0_30px_var(--color-shadow-hover)]
              hover:-translate-y-0.5 active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              transition-all duration-200 cursor-pointer
              flex items-center gap-2"
          >
            {loading && (
              <span className="material-symbols-outlined text-base animate-spin">
                progress_activity
              </span>
            )}
            {loading
              ? "Saving..."
              : isCreateMode
                ? "Publish Lesson"
                : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
