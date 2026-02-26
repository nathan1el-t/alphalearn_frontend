"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "@/components/common/confirmModal";
import { deleteLesson } from "@/lib/lessons";
import { showError, showSuccess } from "@/lib/notifications";

interface LessonDetailOwnerActionsProps {
  lessonId: string;
  canEdit: boolean;
  canDelete: boolean;
}

export default function LessonDetailOwnerActions({
  lessonId,
  canEdit,
  canDelete,
}: LessonDetailOwnerActionsProps) {
  const router = useRouter();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteLesson(lessonId);
      if (response.success) {
        showSuccess(response.message);
        router.replace("/lessons/mine");
      } else {
        showError(response.message);
      }
    } catch (error: any) {
      showError(error?.message || "Failed to delete lesson");
    } finally {
      setLoading(false);
      setDeleteModalOpened(false);
    }
  };

  if (!canEdit && !canDelete) return null;

  return (
    <>
      <div className="flex items-center gap-2">
        {canDelete && (
          <button
            type="button"
            onClick={() => setDeleteModalOpened(true)}
            className="inline-flex h-10 items-center rounded-lg border border-red-500/20 bg-red-500/10 px-4 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20"
          >
            Delete
          </button>
        )}

        {canEdit && (
          <Link
            href={`/lessons/${lessonId}/edit`}
            className="inline-flex h-10 items-center rounded-lg border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/20"
          >
            Edit Lesson
          </Link>
        )}
      </div>

      <ConfirmModal
        opened={deleteModalOpened}
        onClose={() => !loading && setDeleteModalOpened(false)}
        onConfirm={handleDelete}
        title="Delete Lesson?"
        message="You can only delete unpublished lessons. This action cannot be undone."
        confirmText="Delete"
        confirmColor="red"
        icon="delete_forever"
        loading={loading}
      />
    </>
  );
}
