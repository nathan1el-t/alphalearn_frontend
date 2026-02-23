"use server";

import { apiFetch } from "./api";
import { CreateLessonRequest } from "@/interfaces/interfaces";
import { revalidatePath } from "next/cache";

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

export async function saveLesson({ id, title, content }: { id: string; title: string; content: any; }): Promise<ActionResponse> {
  const response = await handleRequest(`/lessons/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ title, content }),
  });

  if (response.success) {
    revalidatePath("/lessons/mine");
    revalidatePath(`/lessons/${id}`);
    revalidatePath(`/lessons/${id}/edit`);
  }

  return response;
}

export async function createLesson(inputs: CreateLessonRequest): Promise<ActionResponse> {
  const response = await handleRequest(`/lessons`, {
    method: "POST",
    headers,
    body: JSON.stringify(inputs),
  });

  if (response.success) {
    revalidatePath("/lessons");
    revalidatePath("/lessons/mine");
  }

  return response;
}
