import { apiFetch } from "@/lib/api";
import { Card } from "@mantine/core";
import { Suspense } from "react";
import CardSkeleton from "@/components/common/cardSkeleton";
import LessonsManagementTable from "./lessonsTable";
import AdminBreadcrumb from "@/components/admin/breadcrumb";
import AdminPageHeader from "@/components/admin/pageHeader";
import type { AdminLesson, LessonModerationResponse } from "@/interfaces/interfaces";

async function LessonsData() {
  const lessonsResponse = await apiFetch<LessonModerationResponse[]>("/admin/lessons");

  const lessons: AdminLesson[] = lessonsResponse.map(lesson => ({
    lessonPublicId: lesson.lessonPublicId,
    lessonTitle: lesson.title,
    author: lesson.author,
    lessonModerationStatus: lesson.lessonModerationStatus,
    submittedAt: lesson.createdAt,
    createdAt: lesson.createdAt,
  }));

  return <LessonsManagementTable lessons={lessons} />;
}

export default function ManageLessonsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AdminBreadcrumb />

        <AdminPageHeader
          title="Lesson Moderation"
          description="Review and approve lessons submitted by contributors"
          icon="rate_review"
        />

        <Suspense
          fallback={
            <div>
              {/* Stats Skeleton */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="admin-card">
                    <CardSkeleton count={1} cols={1} showBookmark={false} lines={1} />
                  </Card>
                ))}
              </div>
              {/* Table Skeleton */}
              <Card className="admin-card">
                <CardSkeleton count={6} cols={1} showBookmark={false} lines={2} />
              </Card>
            </div>
          }
        >
          <LessonsData />
        </Suspense>
      </div>
    </div>
  );
}
