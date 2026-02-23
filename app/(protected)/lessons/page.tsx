import { apiFetch } from "@/lib/api";
import type { LessonSummary } from "@/interfaces/interfaces";
import NotFound from "@/components/notFound";
import LessonCard from "@/components/lessons/lessonCard";
import { Skeleton, SimpleGrid, Container, Text, Button } from "@mantine/core";
import Link from "next/link";

export default async function LessonsPage() {
  let lessons: LessonSummary[] = [];
  let loading = false;

  try {
    loading = true;
    lessons = await apiFetch("/lessons");
    loading = false;
  } catch (err: any) {
    console.error(err);
    return <NotFound/>
  }

  return (
    <Container size="lg" py="xl">
      <Text size="2xl" mb="xl">
        All Lessons
      </Text>
      <Link href={`/lessons/mine`}>
        <Button>View my own lessons</Button>
      </Link>

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
