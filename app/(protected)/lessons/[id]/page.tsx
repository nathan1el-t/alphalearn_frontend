import "@mantine/tiptap/styles.css";
import { TextDisplayer } from "@/components/textDisplayer";
import { apiFetch } from "@/lib/api";
import type { Lesson } from "@/interfaces/interfaces";
import { notFound } from "next/navigation";
import {
  Container,
  Title,
  Card,
  Divider,
  Stack,
  Button,
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

    return (
      <Container size="md" py="xl">
        <Stack gap="xl">
          <Group justify="space-between">
            <BackButton />

            <Link href={`/lessons/${id}/edit`}>
              <Button>Edit Lesson</Button>
            </Link>
          </Group>

          <div>
            <Title order={1} mb="sm">
              {lessonContent.title}
            </Title>

          </div>

          <Divider />
          <Card withBorder radius="md" p="xl">
            <TextDisplayer content={lessonContent.content} />
          </Card>
        </Stack>
      </Container>
    );
  } catch (err: any) {
    return notFound();
  }
}
