import type { PublicAuthor } from "@/interfaces/interfaces";
import "@mantine/tiptap/styles.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Card, Container, Stack, Text, Title } from "@mantine/core";
import AdminBreadcrumb from "@/components/admin/breadcrumb";
import { TextDisplayer } from "@/components/texteditor/textDisplayer";
import { apiFetch } from "@/lib/api";

type AdminLessonDetail = {
  lessonPublicId: string;
  title: string;
  content: unknown;
  conceptPublicIds?: string[];
  author?: PublicAuthor | null;
  lessonModerationStatus?: string;
  moderationStatus?: string;
};

export default async function AdminLessonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const lesson = await apiFetch<AdminLessonDetail>(`/admin/lessons/${id}`);

    return (
      <div className="min-h-screen bg-[var(--color-background)] py-8 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <AdminBreadcrumb />

          <Container size="lg" px={0}>
            <Stack gap="lg">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Title order={1}>{lesson.title}</Title>
                  <Text size="sm" c="dimmed">
                    Status: {lesson.lessonModerationStatus ?? lesson.moderationStatus ?? "UNKNOWN"}
                  </Text>
                </div>
                <Link href="/admin/lessons">
                  <Button variant="light">Back to Lessons</Button>
                </Link>
              </div>

              <Card className="admin-card">
                <Stack gap="xs">
                  <Text size="sm" c="dimmed">Lesson ID: {lesson.lessonPublicId}</Text>
                  <Text size="sm" c="dimmed">
                    Contributor: {lesson.author ? `${lesson.author.username} (${lesson.author.publicId})` : "-"}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Concept IDs: {lesson.conceptPublicIds?.join(", ") || "-"}
                  </Text>
                </Stack>
              </Card>

              <Card className="admin-card">
                {lesson.content ? (
                  <TextDisplayer content={lesson.content} />
                ) : (
                  <Text c="dimmed">No lesson content available.</Text>
                )}
              </Card>
            </Stack>
          </Container>
        </div>
      </div>
    );
  } catch {
    return notFound();
  }
}
