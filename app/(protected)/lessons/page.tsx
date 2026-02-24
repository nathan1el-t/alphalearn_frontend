import { apiFetch } from "@/lib/api";
import type { LessonSummary } from "@/interfaces/interfaces";
import NotFound from "@/components/notFound";
import {
  SimpleGrid,
  Container,
  Text,
  Group,
  Stack,
  Title,
} from "@mantine/core";
import LessonCard from "@/components/lessons/lessonCard";
import GradientButton from "@/components/common/gradientbutton";
import SpotlightSearch from "@/components/spotlightsearch";
import SearchTrigger from "@/components/lessons/searchTrigger";
import { redirectAdminFromPublicRoute } from "@/lib/rbac";

// --- Main Lessons Page Component ---

export default async function LessonsPage() {
  await redirectAdminFromPublicRoute("lessons-list");

  let lessons: LessonSummary[] = [];
  try {
    lessons = await apiFetch<LessonSummary[]>("/lessons");
    console.log(lessons);
  } catch (err) {
    console.error(err);
    return <NotFound />;
  }

  return (
    <>
      <div className="min-h-screen bg-[var(--color-background)]">
        {/* Hero */}
        <div className="relative z-10 pt-20 pb-14 border-b border-[var(--color-border)]">
          <Container size="lg">
            <Stack gap="xl">
              <Stack gap="xs">
                {/* Eyebrow */}
                <Group gap="xs" align="center" className="mb-1">
                  <div className="w-5 h-px bg-[var(--color-primary)]" />
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-primary)]">
                    Big Brain Hub
                  </span>
                </Group>

                <Title
                  order={1}
                  className="text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-tight leading-[1.1] text-[var(--color-text)]"
                >
                  Level Up Your{" "}
                  <span className="text-[var(--color-primary)]">Skills</span>
                </Title>

                <Text
                  size="lg"
                  className="text-[var(--color-text-secondary)] max-w-xl font-light leading-relaxed"
                >
                  Farm XP with interactive lessons. Learn peak skills.
                  Gain elite ball knowledge.
                </Text>
              </Stack>

              <Group justify="flex-end" wrap="wrap" gap="sm">
                <SearchTrigger />
                <GradientButton href="/lessons/mine">
                  My Peak Creations
                </GradientButton>
              </Group>
            </Stack>
          </Container>
        </div>

        {/* Grid */}
        <div className="relative z-10 py-14 pb-32">
          <Container size="lg">
            {lessons.length === 0 ? (
              <Stack align="center" py={100} gap="md">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-[var(--color-text-muted)]">
                    menu_book
                  </span>
                </div>
                <Title
                  order={3}
                  className="text-[var(--color-text-muted)] font-semibold"
                >
                  No lessons yet
                </Title>
                <Text className="text-[var(--color-text-muted)] text-sm">
                  No lessons available yet. Be the first to create one!
                </Text>
              </Stack>
            ) : (
              <Stack gap="lg">
                <Group gap="md" align="center" justify="center">
                  <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--color-text-muted)]">
                    {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}{" "}
                    available
                  </span>
                  {/* <div className="flex-1 h-px bg-[var(--color-border)]" /> */}
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                  {lessons.map((lesson) => (
                    <LessonCard key={lesson.lessonId} {...lesson} />
                  ))}
                </SimpleGrid>
              </Stack>
            )}
          </Container>
        </div>
      </div>
            
      <SpotlightSearch lessons={lessons} />
    </>
  );
}
