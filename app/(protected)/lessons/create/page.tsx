import { createClient } from "@/lib/supabase/server";
import LessonEditor from "@/app/(protected)/lessons/[id]/edit/lessoneditor";
import { redirect } from "next/navigation";
import { Container, Title } from "@mantine/core";
import BackButton from "@/components/backButton";

export default async function CreateLessonPage({
  searchParams,
}: {
  searchParams: Promise<{ conceptId?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { conceptId } = await searchParams;

  return (
    <Container size="md" py="xl">
      <BackButton href="/lessons/mine" />
      <Title order={1} mb="xl">New Lesson</Title>
      <LessonEditor
        initialTitle=""
        initialContent={{ type: "doc", content: [] }}
        conceptId={conceptId ? parseInt(conceptId) : 1}
        contributorId={user.id}
      />
    </Container>
  );
}
