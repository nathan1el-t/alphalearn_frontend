import { apiFetch } from "@/lib/api";
import type { LessonSummary } from "@/interfaces/interfaces";
import NotFound from "@/components/notFound";
import {
  SimpleGrid,
  Container,
  Text,
  Button,
  Group,
  Stack,
  Title,
} from "@mantine/core";
import Link from "next/link";
import BackButton from "@/components/backButton";
import LessonCard from "@/components/lessons/lessonCard";
import GradientButton from "@/components/common/gradientbutton";
import { getUserRole } from "@/lib/rbac";
import { redirect } from "next/navigation";

export default async function MyLessonsPage() {
  const role = await getUserRole();

  if (role === "ADMIN") {
    redirect("/admin/lessons");
  }

  if (role === "LEARNER") {
    redirect("/lessons");
  }

  let lessons: LessonSummary[] = [];
  try {
    lessons = await apiFetch<LessonSummary[]>("/lessons/mine");
  } catch (err) {
    console.error(err);
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header Section */}
      <div className="pt-20 pb-12 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)]">
        <Container size="lg">
          <Stack gap="lg">
            <Group justify="space-between" align="center">
              <Stack gap={4} align="flex-start">
                <BackButton />
                <Title order={1} className="text-4xl font-black tracking-tight text-[var(--color-text)]">
                  My <span className="text-[var(--color-primary)]">Library</span>
                </Title>
                <Text className="text-[var(--color-text-secondary)]">
                  Manage and track the lessons you've contributed to AlphaLearn.
                </Text>
              </Stack>
              <GradientButton href="/lessons/create" icon="add">
                Create Lesson
              </GradientButton>
            </Group>
          </Stack>
        </Container>
      </div>


      <Container size="lg" py="xl" className="pb-32">
        {lessons.length === 0 ? (
          <Stack align="center" py={100} gap="md">
            <div className="w-20 h-20 rounded-full bg-[var(--color-surface)] flex items-center justify-center border border-[var(--color-overlay)]">
              <span className="material-symbols-outlined text-4xl text-[var(--color-text-muted)]">
                auto_stories
              </span>
            </div>
            <Title order={3} className="text-[var(--color-text-muted)]">No lessons yet</Title>
            <Text className="text-[var(--color-text-muted)]">Start your journey by creating your first lesson!</Text>
            <Link href="/lessons/create">
              <Button variant="outline" radius="xl">Create First Lesson</Button>
            </Link>
          </Stack>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.lessonId} {...lesson} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </div>
  );
}
