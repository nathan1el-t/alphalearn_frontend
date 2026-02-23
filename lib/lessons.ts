"use server";

import { apiFetch } from "./api";
import { CreateLessonRequest } from "@/interfaces/interfaces";

const headers = { "Content-Type": "application/json" };

type ActionResponse = {
  success: boolean;
  message: string;
};

async function handleRequest(url: string, options: RequestInit): Promise<ActionResponse> {
  try {
    await apiFetch(url, options);
    return { success: true, message: "Successfully saved" };
  } catch (err: any) {
    return { success: false, message: err?.message || "Something went wrong" };
  }
}

export async function saveLesson({ id, title, learningObjectives, content }: { id: string; title: string; learningObjectives: string; content: any; }): Promise<ActionResponse> {
  return handleRequest(`/lessons/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ title, learningObjectives, content }),
  });
}

export async function createLesson(inputs: CreateLessonRequest): Promise<ActionResponse> {
  return handleRequest(`/lessons`, {
    method: "POST",
    headers,
    body: JSON.stringify(inputs),
  });
}
