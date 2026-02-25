import { createClient } from "@/lib/supabase/server";
import { apiFetch } from "@/lib/api";
import LessonEditor from "@/app/(protected)/lessons/[id]/edit/lessoneditor";
import { redirect } from "next/navigation";
import { Container, Title } from "@mantine/core";
import BackButton from "@/components/backButton";
import { Concept } from "@/interfaces/interfaces";
import { getUserRole } from "@/lib/rbac";

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
    <Container size="md" py="xl">
      <BackButton href="/lessons/mine" />
      <Title order={1} mb="xl">New Lesson</Title>
      <LessonEditor
        initialTitle=""
        initialContent={{ type: "doc", content: [] }}
        availableConcepts={concepts}
        initialConceptIds={initialConceptIds}
        contributorId={user.id}
      />
    </Container>
  );
}
