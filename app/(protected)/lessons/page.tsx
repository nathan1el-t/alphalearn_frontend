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
import { redirectAdminFromPublicRoute, getUserRole } from "@/lib/rbac";




export default async function LessonsPage() {
  await redirectAdminFromPublicRoute("lessons-list");
  const role = await getUserRole();
  const lessons = await fetchLessons();

  if (!lessons) return <NotFound />;

  return (
    <>
      <div className="min-h-screen bg-[var(--color-background)]">
        <HeroSection role={role} />

        <Container size="lg" className="py-14 pb-32">
          {lessons.length === 0 ? (
            <EmptyState />
          ) : (
            <LessonsGrid lessons={lessons} />
          )}
        </Container>
      </div>

      <SpotlightSearch lessons={lessons} />
    </>
  );
}



async function fetchLessons(): Promise<LessonSummary[] | null> {
  try {
    return await apiFetch<LessonSummary[]>("/lessons");
  } catch {
    return null;
  }
}


function HeroSection({ role }: { role: string | null }) {
  return (
    <div className="border-b border-[var(--color-border)] min-h-screen flex">
      <Container className="my-auto w-full">
        <Stack gap="xl">
          <Stack gap="xs">
            <Group gap="xs" align="center">
              <div className="w-5 h-px bg-[var(--color-primary)]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-primary)]">
                Big Brain Hub
              </span>
            </Group>

            <Title
              order={1}
              className="text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-tight leading-[1.1]"
            >
              Level Up Your{" "}
              <span className="text-[var(--color-primary)]">Skills</span>
            </Title>

            <Text size="lg" className="max-w-xl font-light leading-relaxed">
              Farm XP with interactive lessons. Learn peak skills. Gain elite
              ball knowledge.
            </Text>
          </Stack>

          {role === "CONTRIBUTOR" && (
            <Group justify="flex-end">
              <GradientButton href="/lessons/mine">
                View My Lessons
              </GradientButton>
            </Group>
          )}

        </Stack>
      </Container>
    </div>
  );
}

function LessonsGrid({ lessons }: { lessons: LessonSummary[] }) {
  return (
    <Stack gap="lg">
      <LessonsHeader count={lessons.length} />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {lessons.map((lesson, idx) => (
          <LessonCard key={lesson.lessonId || (lesson as any).id || (lesson as any).lessonPublicId || idx} {...lesson} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

function LessonsHeader({ count }: { count: number }) {
  return (
    <Group justify="space-between" align="center">
      <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--color-text-muted)] px-3">
        {count} {count === 1 ? "lesson" : "lessons"} available
      </span>

      <SearchTrigger />
    </Group>
  );
}

function EmptyState() {
  return (
    <Stack align="center" py={100} gap="md">
      <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center">
        <span className="material-symbols-outlined text-3xl text-[var(--color-text-muted)]">
          menu_book
        </span>
      </div>

      <Title order={3} className="text-[var(--color-text-muted)]">
        No lessons yet
      </Title>

      <Text className="text-[var(--color-text-muted)] text-sm">
        No lessons available yet. Be the first to create one!
      </Text>
    </Stack>
  );
}