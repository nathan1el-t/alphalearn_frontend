"use server";

import { apiFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";

function getDeleteConceptErrorMessage(error: unknown): string {
  const rawMessage =
    error instanceof Error ? error.message : "Failed to delete concept";
  const normalized = rawMessage.toLowerCase();

  const blockedByLessons =
    normalized.includes("lesson") ||
    normalized.includes("lessons") ||
    normalized.includes("foreign key") ||
    normalized.includes("constraint") ||
    normalized.includes("reference") ||
    normalized.includes("409") ||
    normalized.includes("conflict");

  if (blockedByLessons) {
    return "Cannot delete this concept because it has lessons attached. Remove the linked lessons first.";
  }

  return rawMessage;
}

/**
 * Server Action: Delete a concept
 */
export async function deleteConcept(conceptPublicId: string) {
  try {
    await apiFetch(`/admin/concepts/${conceptPublicId}`, {
      method: "DELETE",
    });

    revalidatePath("/admin/concepts");
    return { success: true, message: "Concept deleted successfully!" };
  } catch (error) {
    console.error("Error deleting concept:", error);
    return { 
      success: false, 
      message: getDeleteConceptErrorMessage(error),
    };
  }
}
