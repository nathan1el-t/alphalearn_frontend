export interface Concept {
  conceptId: number;
  title: string;
  description: string;
  createdAt: string;
}

export type Lesson = {
  lessonId: string
  title: string
  content: any
  moderationStatus: string
  contributorId: string
  createdAt: string
  conceptIds: number[]
}

export type LessonSummary = Pick<Lesson, "lessonId" | "title" | "contributorId" | "createdAt">

export type MyLessons = Pick<Lesson, "lessonId" | "title" | "moderationStatus" | "conceptIds" | "contributorId" | "createdAt">


//interface for creating lessons, require title, content, conceptid, contributorid

export interface CreateLessonRequest {
  title: string
  content: any
  conceptIds: number[]
  contributorId: string
  submit?: boolean
}

// return response for create lessons
// {
//     "lessonId": 20,
//     "title": "string",
//     "content": {},
//     "moderationStatus": "UNPUBLISHED",
//     "contributorId": "99460798-1886-4782-b37c-40a7e1b4d1a6",
//     "createdAt": "2026-02-21T01:11:39.9977952+08:00"
// }


// {
//         "lessonId": 7,
//         "title": "test1",
//         "contributorId": "3fab4f56-6ef7-40c1-b3cf-b63c12c57923",
//         "createdAt": "2026-02-15T14:12:10.255478Z"
//     },  
export interface AdminContributor {
  contributorId: string;
  username: string;
  promotedAt: string | null;
  demotedAt: string | null;
}

export interface AdminLearner {
  id: string;
  username: string;
  createdAt: string;
  totalPoints: number;
}

// Unified user interface for admin pages
export interface AdminUser {
  userId: string;
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
  lessonId: number;
  lessonTitle: string;
  contributorId: string;
  contributorUsername?: string; 
  lessonModerationStatus: LessonModerationStatus;
  createdAt?: string;
  submittedAt?: string;
}

// API response type matching backend /admin/lessons endpoint
export interface LessonModerationResponse {
  lessonId: number;
  title: string;
  conceptIds: number[];
  contributorId: string;
  lessonModerationStatus: LessonModerationStatus;
  createdAt: string;
  deletedAt: string | null;
}
