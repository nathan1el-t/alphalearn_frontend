import LessonEditor from "./lessoneditor";
import { apiFetch } from "@/lib/api";
import { Lesson } from "@/interfaces/interfaces";
import NotFound from "@/components/notFound";
import BackButton from "@/components/backButton";
import { Container } from "@mantine/core";

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;

    const lesson: Lesson = await apiFetch(`/lessons/${id}`);

    return (
      <Container size="md" py="xl">
        <BackButton />

        <LessonEditor
          id={id}
          initialTitle={lesson.title}
          initialContent={lesson.content}
          initialConceptIds={lesson.conceptIds}
          contributorId={lesson.contributorId} />
      </Container>
    );
  } catch (err: any) {
    console.log(err);
    return <NotFound/>
  }
}
