"use server";

import { apiFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Approve a lesson
 */
export async function approveLesson(lessonId: number) {
  try {
    await apiFetch(`/admin/lessons/${lessonId}/approve`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/admin/lessons");
    return { success: true, message: "Lesson approved successfully!" };
  } catch (error) {
    console.error("Error approving lesson:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to approve lesson" 
    };
  }
}

/**
 * Server Action: Reject a lesson
 */
export async function rejectLesson(lessonId: number) {
  try {
    await apiFetch(`/admin/lessons/${lessonId}/reject`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/admin/lessons");
    return { success: true, message: "Lesson rejected successfully!" };
  } catch (error) {
    console.error("Error rejecting lesson:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to reject lesson" 
    };
  }
}
