import { createClient } from "@/lib/supabase/server";
import { apiFetch } from "@/lib/api";
import LessonEditor from "@/app/(protected)/lessons/[id]/edit/lessoneditor";
import { redirect } from "next/navigation";
import { Container, Stack, Group, Text, Title } from "@mantine/core";
import { Concept } from "@/interfaces/interfaces";
import { getUserRole } from "@/lib/rbac";
import Link from "next/link";

export default async function CreateLessonPage({
  searchParams,
}: {
  searchParams: Promise<{ conceptId?: string; conceptIds?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const role = await getUserRole();

  if (role === "ADMIN") {
    redirect("/admin/lessons");
  }

  if (role === "LEARNER") {
    redirect("/lessons");
  }

  const concepts: Concept[] = await apiFetch<Concept[]>("/concepts");
  const { conceptId, conceptIds } = await searchParams;
  const initialConceptIds = Array.from(
    new Set(
      [
        ...(conceptIds ? conceptIds.split(",") : []),
        ...(conceptId ? [conceptId] : []),
      ]
        .map((value) => Number(value))
        .filter((value) => Number.isFinite(value) && value > 0),
    ),
  );

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
              <span className="text-[var(--color-primary)]">New Lesson</span>
            </Group>

            {/* Page Title */}
            <Stack gap={4}>
              <Group gap="xs" align="center">
                <div className="w-5 h-px bg-[var(--color-primary)]" />
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-primary)]">
                  Lesson Creator
                </span>
              </Group>

              <Title
                order={1}
                className="text-3xl font-black tracking-tight text-[var(--color-text)]"
              >
                Create a New{" "}
                <span className="text-[var(--color-primary)]">Lesson</span>
              </Title>

              <Text className="text-[var(--color-text-secondary)] max-w-lg font-light leading-relaxed">
                Craft an interactive lesson and share your knowledge with the community.
              </Text>
            </Stack>
          </Stack>
        </Container>
      </div>

      {/* Editor */}
      <Container size="md" className="py-10 pb-32">
        <LessonEditor
          initialTitle=""
          initialContent={{ type: "doc", content: [] }}
          availableConcepts={concepts}
          initialConceptIds={initialConceptIds}
          contributorId={user.id}
        />
      </Container>
    </div>
  );
}
