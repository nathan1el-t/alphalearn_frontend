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
import { redirectAdminFromPublicRoute, getUserRole } from "@/lib/rbac";
import LessonDetailOwnerActions from "@/components/lessons/lessonDetailOwnerActions";

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
    let ownsLesson = false;
    const normalizedStatus = lessonContent.moderationStatus?.toUpperCase?.() ?? "UNPUBLISHED";

    if (role !== "ADMIN") {
      try {
        const myLessons = await apiFetch<LessonSummary[]>("/lessons/mine");
        ownsLesson = myLessons.some((lesson) => lesson.lessonPublicId === lessonPublicId);
      } catch {
        ownsLesson = false;
      }
    }
    const canEdit = role === "CONTRIBUTOR" && ownsLesson;
    const canDelete = ownsLesson && normalizedStatus === "UNPUBLISHED";

    return (
      <Container size="md" py="xl">
        <div className="flex flex-col gap-8">
          <Group justify="space-between" align="flex-start">
            <Title order={1} mb="sm">
              {lessonContent.title}
            </Title>
            <LessonDetailOwnerActions
              lessonId={lessonPublicId}
              canEdit={canEdit}
              canDelete={canDelete}
            />
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
