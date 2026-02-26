import "@mantine/tiptap/styles.css";
import { TextDisplayer } from "@/components/texteditor/textDisplayer";
import { apiFetch } from "@/lib/api";
import type { Lesson, LessonSummary } from "@/interfaces/interfaces";
import { notFound } from "next/navigation";
import {
  Container,
  Title,
  Group,
} from "@mantine/core";
import Link from "next/link";
import { redirectAdminFromPublicRoute, getUserRole } from "@/lib/rbac";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await redirectAdminFromPublicRoute("lesson-detail", { id });

  try {
    const role = await getUserRole();
    const lessonContent: Lesson = await apiFetch(`/lessons/${id}`);
    const lessonPublicId = lessonContent.lessonPublicId || id;
    let canEdit = false;

    if (role === "CONTRIBUTOR") {
      try {
        const myLessons = await apiFetch<LessonSummary[]>("/lessons/mine");
        canEdit = myLessons.some((lesson) => lesson.lessonPublicId === lessonPublicId);
      } catch {
        canEdit = false;
      }
    }

    return (
      <Container size="md" py="xl">
        <div className="flex flex-col gap-8">
          <Group justify="space-between" align="flex-start">
            <Title order={1} mb="sm">
              {lessonContent.title}
            </Title>

            {canEdit && (
              <Link
                href={`/lessons/${lessonPublicId}/edit`}
                className="inline-flex h-10 items-center rounded-lg border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/20"
              >
                Edit Lesson
              </Link>
            )}
          </Group>

          <div
            className="rounded-xl border border-[var(--color-border)] overflow-hidden"
            style={{ background: "var(--color-surface)" }}
          >
            <TextDisplayer content={lessonContent.content} />
          </div>
        </div>
      </Container>
    );
  } catch (err: any) {
    return notFound();
  }
}
