import "@mantine/tiptap/styles.css";
import { TextDisplayer } from "@/components/texteditor/textDisplayer";
import { apiFetch } from "@/lib/api";
import type { Lesson } from "@/interfaces/interfaces";
import { notFound } from "next/navigation";
import {
  Container,
  Title,
  Group,
} from "@mantine/core";
import Link from "next/link";
import BackButton from "@/components/backButton";
import { redirectAdminFromPublicRoute } from "@/lib/rbac";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await redirectAdminFromPublicRoute("lesson-detail", { id });

  try {
    const lessonContent: Lesson = await apiFetch(`/lessons/${id}`);
    const lessonPublicId = lessonContent.lessonPublicId || id;

    return (
      <Container size="md" py="xl">
        <div className="flex flex-col gap-8">
          <Group justify="space-between">
            <BackButton />
          </Group>

          <div>
            <Title order={1} mb="sm">
              {lessonContent.title}
            </Title>
          </div>

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
