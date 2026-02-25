import { apiFetch } from "@/lib/api";
import type { LessonSummary } from "@/interfaces/interfaces";
import NotFound from "@/components/notFound";
import LessonCard from "@/components/lessons/lessonCard";
import { Container, Skeleton, SimpleGrid, Text, Group,Button } from "@mantine/core";
import BackButton from "@/components/backButton";
import Link from "next/link";
import { getUserRole } from "@/lib/rbac";
import { redirect } from "next/navigation";

export default async function MyLessonsPage() {
  const role = await getUserRole();

  if (role === "ADMIN") {
    redirect("/admin/lessons");
  }

  if (role === "LEARNER") {
    redirect("/lessons");
  }

  let lessons: LessonSummary[] = [];
  let loading = false;

  try {
    loading = true;
    lessons = await apiFetch("/lessons/mine");
    loading = false;
    // console.log(lessons);
  } catch (err: any) {
    console.log(err);
    return <NotFound/>
  }

  return (
    <Container size="lg" py="xl">
      <Text size="2xl" mb="xl">
        All Lessons
      </Text>
      <Group justify="space-between">
      <BackButton/>
      <Link href={'/lessons/create'}>
        <Button>Create new lesson</Button>
      </Link>
      </Group>
      

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
            <LessonCard key={lesson.lessonPublicId} {...lesson} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
