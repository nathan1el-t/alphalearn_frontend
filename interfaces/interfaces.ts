export interface Concept {
  conceptId: number;
  title: string;
  description: string;
  moderationStatus: string;
  createdAt: string;
}

export interface Lesson{
  lessonId:string,
  title:string,
  learningObjectives:string,
  moderationStatus:string,
  contributorId:string,
  createdAt:string
}

export interface LessonContent extends Lesson{
  content:any
}
