export interface Concept {
  publicId: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface PublicAuthor {
  publicId: string;
  username: string;
}

export type Lesson = {
  lessonPublicId: string
  title: string
  content: any
  moderationStatus: string
  author: PublicAuthor
  createdAt: string
  conceptPublicIds: string[]
}

export type LessonSummary = Pick<Lesson, "lessonPublicId" | "title" | "author" | "createdAt" | "moderationStatus">

export interface CreateLessonRequest {
  title: string
  content: any
  conceptPublicIds: string[]
  submit?: boolean
}
export interface AdminContributor {
  publicId: string;
  username: string;
  promotedAt: string | null;
  demotedAt: string | null;
}

export interface AdminLearner {
  publicId: string;
  username: string;
  createdAt: string;
  totalPoints: number;
}

// Unified user interface for admin pages
export interface AdminUser {
  publicId: string;
  username: string;
  role: "CONTRIBUTOR" | "LEARNER";
  promotedAt?: string | null;
  demotedAt?: string | null;
}

export type AdminConcept = Concept;

// Lesson moderation status types
export type LessonModerationStatus = "PENDING" | "APPROVED" | "REJECTED" | "UNPUBLISHED";

// Admin lesson interface for moderation
export interface AdminLesson {
  lessonPublicId: string;
  lessonTitle: string;
  author: PublicAuthor;
  lessonModerationStatus: LessonModerationStatus;
  createdAt?: string;
  submittedAt?: string;
}

// API response type matching backend /admin/lessons endpoint
export interface LessonModerationResponse {
  lessonPublicId: string;
  title: string;
  conceptPublicIds: string[];
  author: PublicAuthor;
  lessonModerationStatus: LessonModerationStatus;
  createdAt: string;
  deletedAt: string | null;
}
