"use server";

import { apiFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Delete a concept
 */
export async function deleteConcept(conceptId: number) {
  try {
    await apiFetch(`/admin/concepts/${conceptId}`, {
      method: "DELETE",
    });

    revalidatePath("/admin/concepts");
    return { success: true, message: "Concept deleted successfully!" };
  } catch (error) {
    console.error("Error deleting concept:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to delete concept" 
    };
  }
}
