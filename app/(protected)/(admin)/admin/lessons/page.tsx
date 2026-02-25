import { apiFetch } from "@/lib/api";
import { Card } from "@mantine/core";
import { Suspense } from "react";
import CardSkeleton from "@/components/common/cardSkeleton";
import LessonsManagementTable from "./lessonsTable";
import AdminBreadcrumb from "@/components/admin/breadcrumb";
import AdminPageHeader from "@/components/admin/pageHeader";
import type { AdminLesson, AdminLearner, LessonModerationResponse } from "@/interfaces/interfaces";

async function LessonsData() {
  // Fetch lessons and all learners (temporary workaround - contributors endpoint doesn't return username)
  const [lessonsResponse, learners] = await Promise.all([
    apiFetch<LessonModerationResponse[]>("/admin/lessons"),
    apiFetch<AdminLearner[]>("/admin/learners"), // Using learners endpoint as workaround
  ]);

  // Create a map of user IDs to usernames (temporary - should come from users endpoint)
  const usernameMap = new Map(
    learners.map(learner => [learner.id, learner.username])
  );

  const lessons: AdminLesson[] = lessonsResponse.map(lesson => ({
    lessonId: lesson.lessonId,
    lessonTitle: lesson.title, 
    contributorId: lesson.contributorId,
    contributorUsername: usernameMap.get(lesson.contributorId) || "Unknown",
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
