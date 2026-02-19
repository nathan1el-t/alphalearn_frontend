import { apiFetch } from "@/lib/api";
import type { Lesson } from "@/interfaces/interfaces";
import { notFound } from "next/navigation";
import LessonCard from "@/components/lessons/lessonCard";
import { Container, Skeleton, SimpleGrid, Text } from "@mantine/core";
import BackButton from "@/components/backButton";

export default async function MyLessonsPage() {
  let lessons: Lesson[] = [];
  let loading = false;

  try {
    loading = true;
    lessons = await apiFetch("/lessons/mine");
    loading = false;
    console.log(lessons);
  } catch (err: any) {
    console.log(err);
    return notFound();
  }

  return (
    <Container size="lg" py="xl">
      <Text size="2xl" mb="xl">
        All Lessons
      </Text>
      <BackButton/>

      {loading ? (
        <SimpleGrid cols={3} spacing="lg">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={200} radius="xl" />
          ))}
        </SimpleGrid>
      ) : lessons.length === 0 ? (
        <Text>No lessons available.</Text>
      ) : (
        <SimpleGrid cols={3} spacing="lg">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.lessonId} {...lesson} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
