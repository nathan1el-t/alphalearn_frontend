import BackButton from "@/components/backButton";
import type { Concept } from "@/interfaces/interfaces";
import { apiFetch } from "@/lib/api";
import { redirectAdminFromPublicRoute } from "@/lib/rbac";
import { notFound } from "next/navigation";
import { Container, Group, Text, Title } from "@mantine/core";

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await redirectAdminFromPublicRoute("concept-detail", { id });

  try {
    const concept = await apiFetch<Concept>(`/concepts/${id}`);

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
        </div>
      </Container>
    );
  } catch {
    return notFound();
  }
}
