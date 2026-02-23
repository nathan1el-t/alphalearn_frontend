import { useState } from "react";
import { showSuccess, showError } from "@/lib/notifications";
import { promoteUser, demoteUser } from "./actions";
import type { AdminUser } from "@/interfaces/interfaces";

export type FilterType = "all" | "contributors" | "learners";

type ConfirmAction = {
  type: "promote" | "demote";
  userId: string;
  username: string;
} | null;

export function useUserManagement(users: AdminUser[]) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const handlePromote = async (userId: string, username: string) => {
    // Show confirmation modal
    setConfirmAction({ type: "promote", userId, username });
  };

  const handleDemote = async (userId: string, username: string) => {
    // Show confirmation modal
    setConfirmAction({ type: "demote", userId, username });
  };

  const executePromote = async () => {
    if (!confirmAction) return;
    
    setLoading(confirmAction.userId);
    setConfirmAction(null);
    
    try {
      const result = await promoteUser(confirmAction.userId);
      
      if (result.success) {
        showSuccess(result.message);
      } else {
        showError(result.message);
      }
    } catch (error) {
      console.error("Error promoting user:", error);
      showError("An error occurred while promoting the user");
    } finally {
      setLoading(null);
    }
  };

  const executeDemote = async () => {
    if (!confirmAction) return;
    
    setLoading(confirmAction.userId);
    setConfirmAction(null);
    
    try {
      const result = await demoteUser(confirmAction.userId);
      
      if (result.success) {
        showSuccess(result.message);
      } else {
        showError(result.message);
      }
    } catch (error) {
      console.error("Error demoting contributor:", error);
      showError("An error occurred while demoting the contributor");
    } finally {
      setLoading(null);
    }
  };

  const handleConfirm = () => {
    if (!confirmAction) return;
    
    if (confirmAction.type === "promote") {
      executePromote();
    } else {
      executeDemote();
    }
  };

  const handleCancelConfirm = () => {
    setConfirmAction(null);
  };

  // Filter users based on current filter
  const filteredUsers = users.filter(user => {
    if (filter === "contributors") return user.role === "CONTRIBUTOR";
    if (filter === "learners") return user.role === "LEARNER";
    return true;
  });

  // Calculate stats
  const stats = {
    total: users.length,
    contributors: users.filter(u => u.role === "CONTRIBUTOR").length,
    learners: users.filter(u => u.role === "LEARNER").length,
    activeContributors: users.filter(
      u => u.role === "CONTRIBUTOR" && u.demotedAt === null
    ).length,
  };

  return {
    filter,
    setFilter,
    loading,
    filteredUsers,
    stats,
    handlePromote,
    handleDemote,
    confirmAction,
    handleConfirm,
    handleCancelConfirm,
  };
}
