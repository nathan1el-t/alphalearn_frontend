import LessonEditor from "./lessoneditor";
import { apiFetch } from "@/lib/api";
import { LessonContent } from "@/interfaces/interfaces";
import { notFound } from "next/navigation";
import BackButton from "@/components/backButton";

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const lesson: LessonContent = await apiFetch(`/lessons/${id}`);

    async function saveLesson({
      title,
      content,
    }: {
      title: string;
      content: any;
    }) {
      "use server";
      try {
        await apiFetch(`/lessons/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        });
        return {
          success: true,
          message: "successfully saved lesson"
        };

      } catch (err: any) {
        return {
          success: false,
          message: err?.message || "something went wrong",
        };
      }
    }

    return (
      <>
        <BackButton />
        <LessonEditor
          id={id}
          initialTitle={lesson.title}
          initialContent={lesson.content}
          onEmit={saveLesson}
        />
      </>
    );
  } catch (err: any) {
    console.log(err);
    return notFound();
  }
}
