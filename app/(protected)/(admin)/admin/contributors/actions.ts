"use server";

import { apiFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Promote a learner to contributor
 */
export async function promoteUser(learnerId: string) {
  try {
    await apiFetch(`/admin/contributors/promote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ learnerIds: [learnerId] }),
    });

    revalidatePath("/admin/contributors");
    return { success: true, message: "User promoted to contributor successfully!" };
  } catch (error) {
    console.error("Error promoting user:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to promote user" 
    };
  }
}

/**
 * Server Action: Demote a contributor to learner
 */
// to fix: this function does not work since the endpoint returns 204 no content when successfully demoted
// fix: dont parse the response when its 204
export async function demoteUser(contributorId: string) {
  try {
    await apiFetch(`/admin/contributors/demote`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contributorIds: [contributorId] }),
    });

    revalidatePath("/admin/contributors");
    return { success: true, message: "Contributor demoted to learner successfully!" };
  } catch (error) {
    console.error("Error demoting user:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to demote contributor" 
    };
  }
}