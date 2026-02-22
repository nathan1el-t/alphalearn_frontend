export interface Concept {
  conceptId: number;
  title: string;
  description: string;
  moderationStatus: string;
  createdAt: string;
}

export type Lesson = {
  lessonId: string
  title: string
  learningObjectives: string
  content: any
  moderationStatus: string
  contributorId: string
  createdAt: string
  conceptId: number
}

export type LessonSummary = Pick<Lesson, "lessonId" | "title" | "learningObjectives" | "contributorId" | "createdAt" | "moderationStatus">



//interface for creating lessons, require title, content, conceptid, contributorid

export interface CreateLessonRequest {
  title: string
  learningObjectives?: string
  content: any
  conceptId: number
  contributorId: string
  submit?: boolean
}

// return response for create lessons
// {
//     "lessonId": 20,
//     "title": "string",
//     "learningObjectives": "to be deleted",
//     "content": {},
//     "moderationStatus": "UNPUBLISHED",
//     "contributorId": "99460798-1886-4782-b37c-40a7e1b4d1a6",
//     "createdAt": "2026-02-21T01:11:39.9977952+08:00"
// }


// {
//         "lessonId": 7,
//         "title": "test1",
//         "learningObjectives": "to be deleted",
//         "contributorId": "3fab4f56-6ef7-40c1-b3cf-b63c12c57923",
//         "createdAt": "2026-02-15T14:12:10.255478Z"
//     },  