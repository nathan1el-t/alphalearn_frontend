import LessonEditor from "./lessoneditor";
import { apiFetch } from "@/lib/api";
import { Lesson } from "@/interfaces/interfaces";
import NotFound from "@/components/notFound";
import { Container, Stack, Group, Text, Title } from "@mantine/core";
import { getUserRole } from "@/lib/rbac";
import { redirect } from "next/navigation";
import Link from "next/link";

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
    const lesson: Lesson = await apiFetch(`/lessons/${id}`);
    const status = lesson.moderationStatus?.toUpperCase() ?? "UNPUBLISHED";
    const badge = statusConfig[status] ?? statusConfig["UNPUBLISHED"];

    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        {/* Header */}
        <div className="border-b border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)]">
          <Container size="md" className="py-10">
            <Stack gap="md">
              {/* Breadcrumb */}
              <Group gap="xs" className="text-xs font-medium text-[var(--color-text-muted)]">
                <Link href="/lessons" className="hover:text-[var(--color-primary)] transition-colors">
                  Lessons
                </Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <Link href="/lessons/mine" className="hover:text-[var(--color-primary)] transition-colors">
                  My Library
                </Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-[var(--color-primary)]">Edit Lesson</span>
              </Group>

              {/* Eyebrow + badge row */}
              <Group gap="sm" align="center">
                <Group gap="xs" align="center">
                  <div className="w-5 h-px bg-[var(--color-primary)]" />
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-primary)]">
                    Status
                  </span>
                </Group>

                {/* Moderation status badge */}
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

              {/* Page Title */}
              <Stack gap={4}>
                <Title
                  order={1}
                  className="text-3xl font-black tracking-tight text-[var(--color-text)]"
                >
                  Edit{" "}
                  <span className="text-[var(--color-primary)]">Lesson</span>
                </Title>

                <Text className="text-[var(--color-text-secondary)] max-w-lg font-light leading-relaxed">
                  {status === "REJECTED"
                    ? "This lesson was rejected. Revise your content and resubmit."
                    : status === "APPROVED"
                      ? "This lesson is live. Edits will require re-approval."
                      : status === "PENDING"
                        ? "This lesson is under review. You can still make edits."
                        : "Update your lesson content. Changes save directly."}
                </Text>
              </Stack>
            </Stack>
          </Container>
        </div>

        {/* Editor */}
        <Container size="md" className="py-10 pb-32">
          <LessonEditor
            id={id}
            initialTitle={lesson.title}
            initialContent={lesson.content}
            initialConceptPublicIds={lesson.conceptPublicIds}
          />
        </Container>
      </div>
    );
  } catch (err: any) {
    console.log(err);
    return <NotFound />;
  }
}
