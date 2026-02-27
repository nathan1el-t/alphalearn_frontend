import LessonEditor from "./lessoneditor";
import { apiFetch } from "@/lib/api";
import { Lesson, LessonSummary } from "@/interfaces/interfaces";
import NotFound from "@/components/notFound";
import { Group } from "@mantine/core";
import { getUserRole } from "@/lib/auth/rbac";
import { redirect } from "next/navigation";
import ContributorLessonEditorShell from "@/components/lessons/contributorLessonEditorShell";

// Badge config per moderation status
const statusConfig: Record<string, {
  label: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
}> = {
  PENDING: { label: "Pending Review", icon: "schedule", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
  APPROVED: { label: "Approved", icon: "check_circle", color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)" },
  REJECTED: { label: "Rejected", icon: "cancel", color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)" },
  UNPUBLISHED: { label: "Unpublished", icon: "visibility_off", color: "#9b5cff", bg: "rgba(155,92,255,0.1)", border: "rgba(155,92,255,0.3)" },
};

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const role = await getUserRole();

  if (role === "ADMIN") {
    redirect(`/admin/lessons/${id}`);
  }

  if (role === "LEARNER") {
    redirect("/lessons");
  }

  try {
    const myLessons = await apiFetch<LessonSummary[]>("/lessons/mine");
    const isOwnerLesson = myLessons.some((lesson) => lesson.lessonPublicId === id);

    if (!isOwnerLesson) {
      return <NotFound />;
    }

    const lesson: Lesson = await apiFetch(`/lessons/${id}`);
    const status = lesson.moderationStatus?.toUpperCase() ?? "UNPUBLISHED";
    const badge = statusConfig[status] ?? statusConfig["UNPUBLISHED"];
    const lessonConceptLabels = (lesson.concepts || [])
      .map((concept) => concept?.title)
      .filter(Boolean) as string[];

    return (
      <ContributorLessonEditorShell
        headerMeta={(
          <Group gap="sm" align="center">
            <Group gap="xs" align="center">
              <div className="w-5 h-px bg-[var(--color-primary)]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-primary)]">
                Status
              </span>
            </Group>

            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide"
              style={{
                color: badge.color,
                background: badge.bg,
                border: `1px solid ${badge.border}`,
              }}
            >
              <span className="material-symbols-outlined text-[13px]">
                {badge.icon}
              </span>
              {badge.label}
            </div>
          </Group>
        )}
        title={(
          <>
            Edit <span className="text-[var(--color-primary)]">Lesson</span>
          </>
        )}
        description={
          status === "REJECTED"
            ? "This lesson was rejected. Revise your content and resubmit."
            : status === "APPROVED"
              ? "This lesson is live. Edits will require re-approval."
              : status === "PENDING"
                ? "This lesson is under review. You can still make edits."
                : "Update your lesson content. Changes save directly."
        }
        titleMeta={lessonConceptLabels.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-2">
            {lessonConceptLabels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/70"
              >
                {label}
              </span>
            ))}
          </div>
        ) : null}
      >
        <LessonEditor
          id={id}
          initialTitle={lesson.title}
          initialContent={lesson.content}
          initialConceptPublicIds={lesson.conceptPublicIds}
          initialStatus={status}
        />
      </ContributorLessonEditorShell>
    );
  } catch (err: any) {
    console.log(err);
    return <NotFound />;
  }
}
