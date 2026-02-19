import { TextDisplayer } from "@/components/textDisplayer";
import { apiFetch } from "@/lib/api";
import { LessonContent } from "@/interfaces/interfaces";
import { notFound } from "next/navigation";
import {
  Container,
  Title,
  Text,
  Card,
  Divider,
  Stack,
  Button,
  Group,
} from "@mantine/core";
import Link from "next/link";
import BackButton from "@/components/backButton";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const lessonContent: LessonContent = await apiFetch(`/lessons/${id}`);

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

            <Text c="dimmed" size="sm">
              Lesson ID: {id}
            </Text>
          </div>

          <Divider />

          <Card withBorder radius="md" p="lg">
            <Title order={3} mb="sm">
              Learning Objectives
            </Title>
            <Text>{lessonContent.learningObjectives}</Text>
          </Card>

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
