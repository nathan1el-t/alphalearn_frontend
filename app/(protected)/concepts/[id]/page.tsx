import BackButton from "@/components/backButton";
import type { Concept, LessonSummary } from "@/interfaces/interfaces";
import { apiFetch } from "@/lib/api";
import { redirectAdminFromPublicRoute } from "@/lib/rbac";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Group, SimpleGrid, Text, Title } from "@mantine/core";

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await redirectAdminFromPublicRoute("concept-detail", { id });

  try {
    const concept = await apiFetch<Concept>(`/concepts/${id}`);
    const relatedLessons = await fetchRelatedLessons(id);

    return (
      <Container size="md" py="xl">
        <div className="flex flex-col gap-8">
          <Group justify="space-between">
            <BackButton />
          </Group>

          <div>
            <Title order={1} mb="sm">
              {concept.title}
            </Title>
          </div>

          <div
            className="rounded-xl border border-[var(--color-border)] overflow-hidden"
            style={{ background: "var(--color-surface)" }}
          >
            <div className="p-6 flex flex-col gap-5">
              <div>
                <Text fw={600} mb={6}>
                  Description
                </Text>
                <Text style={{ whiteSpace: "pre-wrap" }}>
                  {concept.description || "No description available."}
                </Text>
              </div>

              <div>
                <Text fw={600} mb={6}>
                  Created
                </Text>
                <Text c="dimmed">
                  {concept.createdAt
                    ? new Date(concept.createdAt).toLocaleString()
                    : "Unknown"}
                </Text>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <Title order={3} mb="xs">
                Related Lessons
              </Title>
              <Text c="dimmed" size="sm">
                Lessons connected to this concept.
              </Text>
            </div>

            {relatedLessons.length === 0 ? (
              <div
                className="rounded-xl border border-[var(--color-border)] p-6"
                style={{ background: "var(--color-surface)" }}
              >
                <Text c="dimmed">No related lessons found yet.</Text>
              </div>
            ) : (
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {relatedLessons.map((lesson) => (
                  <Link
                    key={lesson.lessonPublicId}
                    href={`/lessons/${lesson.lessonPublicId}`}
                    className="rounded-xl border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-primary)]"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <div className="flex flex-col gap-2 h-full">
                      <Text fw={600} lineClamp={2}>
                        {lesson.title}
                      </Text>
                      <Text c="dimmed" size="sm">
                        {lesson.author?.username || "Anonymous"}
                      </Text>
                      <div className="mt-auto flex justify-end">
                        <Text c="dimmed" size="xs">
                          {lesson.createdAt
                            ? new Date(lesson.createdAt).toLocaleDateString()
                            : ""}
                        </Text>
                      </div>
                    </div>
                  </Link>
                ))}
              </SimpleGrid>
            )}
          </div>
        </div>
      </Container>
    );
  } catch {
    return notFound();
  }
}

async function fetchRelatedLessons(conceptId: string): Promise<LessonSummary[]> {
  const endpoints = [
    `/lessons?conceptPublicIds=${encodeURIComponent(conceptId)}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const lessons = await apiFetch<LessonSummary[]>(endpoint);
      if (Array.isArray(lessons)) {
        return lessons;
      }
    } catch {
      // Try the next common endpoint shape.
    }
  }

  return [];
}
