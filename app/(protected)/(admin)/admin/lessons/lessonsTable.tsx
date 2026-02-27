"use client";

import { Card, Text, Badge, ActionIcon, SegmentedControl } from "@mantine/core";
import { Spotlight, spotlight } from "@mantine/spotlight";
import Link from "next/link";
import { useState, useMemo } from "react";
import SearchBar from "@/components/concepts/searchBar";
import ConfirmModal from "@/components/common/confirmModal";
import AdminEmptyState from "@/components/admin/emptyState";
import { RelativeTime, getUrgencyLevel } from "@/components/relativeTime";
import { showSuccess, showError } from "@/lib/actions/notifications";
import { approveLesson, rejectLesson } from "./actions";
import type { AdminLesson, LessonModerationStatus } from "@/interfaces/interfaces";

interface LessonsManagementTableProps {
  lessons: AdminLesson[];
}

type FilterStatus = "all" | "PENDING" | "APPROVED" | "REJECTED";

// Status badge configuration
const statusConfig: Record<LessonModerationStatus, { color: string; label: string }> = {
  PENDING: { color: "yellow", label: "Pending Review" },
  APPROVED: { color: "green", label: "Approved" },
  REJECTED: { color: "red", label: "Rejected" },
  UNPUBLISHED: { color: "gray", label: "Unpublished" },
};

// Urgency badge configuration
const urgencyConfig = {
  normal: { color: "gray", label: "" },
  warning: { color: "yellow", label: "24h+" },
  urgent: { color: "orange", label: "3d+" },
  critical: { color: "red", label: "7d+" },
};

export default function LessonsManagementTable({ lessons }: LessonsManagementTableProps) {
  const [filter, setFilter] = useState<FilterStatus>("PENDING");
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<AdminLesson | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate stats
  const stats = useMemo(() => {
    const pending = lessons.filter(l => l.lessonModerationStatus === "PENDING").length;
    const approved = lessons.filter(l => l.lessonModerationStatus === "APPROVED").length;
    const rejected = lessons.filter(l => l.lessonModerationStatus === "REJECTED").length;
    
    // Count urgent items (pending > 24 hours)
    const urgent = lessons.filter(l => {
      if (l.lessonModerationStatus !== "PENDING" || !l.submittedAt) return false;
      const urgency = getUrgencyLevel(new Date(l.submittedAt));
      return urgency !== "normal";
    }).length;

    return { pending, approved, rejected, total: lessons.length, urgent };
  }, [lessons]);

  // Filter and sort lessons
  const filteredLessons = useMemo(() => {
    let filtered = lessons;
    
    if (filter !== "all") {
      filtered = lessons.filter(l => l.lessonModerationStatus === filter);
    }

    // Sort: Pending items by oldest first (urgency prioritization), others by newest first
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.submittedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.submittedAt || b.createdAt || 0).getTime();
      
      // For pending items, show oldest first (most urgent)
      if (a.lessonModerationStatus === "PENDING" && b.lessonModerationStatus === "PENDING") {
        return dateA - dateB;
      }
      // For others, show newest first
      return dateB - dateA;
    });
  }, [lessons, filter]);

  // Handlers
  const handleApprove = (lesson: AdminLesson) => {
    setSelectedLesson(lesson);
    setShowApproveConfirm(true);
  };

  const handleReject = (lesson: AdminLesson) => {
    setSelectedLesson(lesson);
    setShowRejectConfirm(true);
  };

  const handleConfirmApprove = async () => {
    if (!selectedLesson) return;
    setIsProcessing(true);
    try {
      const result = await approveLesson(selectedLesson.lessonPublicId);
      setShowApproveConfirm(false);
      setSelectedLesson(null);
      if (result.success) {
        showSuccess(result.message);
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError("An error occurred while approving the lesson");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!selectedLesson) return;
    setIsProcessing(true);
    try {
      const result = await rejectLesson(selectedLesson.lessonPublicId);
      setShowRejectConfirm(false);
      setSelectedLesson(null);
      if (result.success) {
        showSuccess(result.message);
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError("An error occurred while rejecting the lesson");
    } finally {
      setIsProcessing(false);
    }
  };

  // Spotlight search actions
  const spotlightActions = filteredLessons.map((lesson) => ({
    id: lesson.lessonPublicId,
    label: lesson.lessonTitle,
    description: `By ${lesson.author.username || lesson.author.publicId} • ${statusConfig[lesson.lessonModerationStatus]?.label || lesson.lessonModerationStatus}`,
    onClick: () => {
      window.location.href = `/lessons/${lesson.lessonPublicId}`;
    },
  }));

  return (
    <>
      {/* Spotlight Search Modal */}
      <Spotlight
        actions={spotlightActions}
        limit={7}
        nothingFound="No lessons found"
        highlightQuery
        searchProps={{
          placeholder: "Search lessons...",
        }}
        shortcut={["mod + K", "ctrl + k"]}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card 
          className={`admin-card admin-stat-card cursor-pointer transition-all ${filter === "PENDING" ? "ring-2 ring-[var(--color-primary)]" : ""}`}
          style={{ "--stat-color": "#eab308" } as React.CSSProperties}
          onClick={() => setFilter("PENDING")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-[var(--color-text)] mt-1">{stats.pending}</p>
              {stats.urgent > 0 && (
                <p className="text-xs text-orange-500 mt-1 font-medium">
                  {stats.urgent} need attention
                </p>
              )}
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-500/10">
              <span className="material-symbols-outlined text-xl text-yellow-500">pending_actions</span>
            </div>
          </div>
        </Card>

        <Card 
          className={`admin-card admin-stat-card cursor-pointer transition-all ${filter === "APPROVED" ? "ring-2 ring-[var(--color-primary)]" : ""}`}
          style={{ "--stat-color": "#22c55e" } as React.CSSProperties}
          onClick={() => setFilter("APPROVED")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-medium">Approved</p>
              <p className="text-2xl font-bold text-[var(--color-text)] mt-1">{stats.approved}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-500/10">
              <span className="material-symbols-outlined text-xl text-green-500">check_circle</span>
            </div>
          </div>
        </Card>

        <Card 
          className={`admin-card admin-stat-card cursor-pointer transition-all ${filter === "REJECTED" ? "ring-2 ring-[var(--color-primary)]" : ""}`}
          style={{ "--stat-color": "#ef4444" } as React.CSSProperties}
          onClick={() => setFilter("REJECTED")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-medium">Rejected</p>
              <p className="text-2xl font-bold text-[var(--color-text)] mt-1">{stats.rejected}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10">
              <span className="material-symbols-outlined text-xl text-red-500">cancel</span>
            </div>
          </div>
        </Card>

        <Card 
          className={`admin-card admin-stat-card cursor-pointer transition-all ${filter === "all" ? "ring-2 ring-[var(--color-primary)]" : ""}`}
          style={{ "--stat-color": "var(--color-primary)" } as React.CSSProperties}
          onClick={() => setFilter("all")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-medium">Total</p>
              <p className="text-2xl font-bold text-[var(--color-text)] mt-1">{stats.total}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-primary)]/10">
              <span className="material-symbols-outlined text-xl text-[var(--color-primary)]">article</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Lessons Table */}
      <Card className="admin-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[var(--color-text)]">
              {filter === "all" ? "All Lessons" : `${statusConfig[filter as LessonModerationStatus]?.label || filter} Lessons`} ({filteredLessons.length})
            </h2>
            <SearchBar onSearchClick={() => spotlight.open()} />
          </div>
          
          <SegmentedControl
            value={filter}
            onChange={(value) => setFilter(value as FilterStatus)}
            data={[
              { label: "Pending", value: "PENDING" },
              { label: "Approved", value: "APPROVED" },
              { label: "Rejected", value: "REJECTED" },
              { label: "All", value: "all" },
            ]}
            size="xs"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="admin-table w-full">
            <thead>
              <tr>
                <th className="text-[var(--color-text)] font-semibold text-left p-3">Lesson</th>
                <th className="text-[var(--color-text)] font-semibold text-left p-3">Contributor</th>
                <th className="text-[var(--color-text)] font-semibold text-left p-3">Submitted</th>
                <th className="text-[var(--color-text)] font-semibold text-left p-3">Status</th>
                <th className="text-[var(--color-text)] font-semibold text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLessons.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <AdminEmptyState
                      icon="search"
                      title={`No ${filter === "all" ? "" : filter.toLowerCase()} lessons found`}
                      description={
                        filter === "PENDING" 
                          ? "All lessons have been reviewed. Great job!" 
                          : "No lessons match the current filter"
                      }
                    />
                  </td>
                </tr>
              ) : (
                filteredLessons.map((lesson) => {
                  const urgency = lesson.submittedAt 
                    ? getUrgencyLevel(new Date(lesson.submittedAt)) 
                    : "normal";
                  const isPending = lesson.lessonModerationStatus === "PENDING";
                  const isUrgent = isPending && urgency !== "normal";

                  return (
                    <tr 
                      key={lesson.lessonPublicId} 
                      className={`hover:bg-[var(--color-background-hover)] border-b border-[var(--color-border)] ${
                        isUrgent ? "bg-orange-500/5" : ""
                      }`}
                    >
                      <td className="p-3">
                        <Link 
                          href={`/lessons/${lesson.lessonPublicId}`}
                          className="hover:text-[var(--color-primary)] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Text fw={500} className="text-[var(--color-text)]">
                              {lesson.lessonTitle}
                            </Text>
                            {isUrgent && (
                              <Badge 
                                size="xs" 
                                color={urgencyConfig[urgency].color}
                                variant="light"
                              >
                                {urgencyConfig[urgency].label}
                              </Badge>
                            )}
                          </div>
                        </Link>
                      </td>
                      <td className="p-3">
                        <Text size="sm" className="text-[var(--color-text-secondary)]">
                          {lesson.author.username || "Unknown"}
                        </Text>
                        {!lesson.author.username && (
                          <Text size="xs" c="dimmed" className="text-[var(--color-text-muted)] truncate max-w-[120px]">
                            {lesson.author.publicId.slice(0, 8)}...
                          </Text>
                        )}
                      </td>
                      <td className="p-3">
                        {lesson.submittedAt ? (
                          <RelativeTime 
                            date={lesson.submittedAt} 
                            className={`text-sm ${
                              isUrgent 
                                ? urgency === "critical" 
                                  ? "text-red-500 font-medium" 
                                  : urgency === "urgent"
                                    ? "text-orange-500 font-medium"
                                    : "text-yellow-600"
                                : "text-[var(--color-text-secondary)]"
                            }`}
                          />
                        ) : lesson.createdAt ? (
                          <RelativeTime 
                            date={lesson.createdAt} 
                            className="text-sm text-[var(--color-text-secondary)]"
                          />
                        ) : (
                          <Text size="sm" c="dimmed">—</Text>
                        )}
                      </td>
                      <td className="p-3">
                        <Badge 
                          color={statusConfig[lesson.lessonModerationStatus]?.color || "gray"}
                          variant="light"
                          size="sm"
                        >
                          {statusConfig[lesson.lessonModerationStatus]?.label || lesson.lessonModerationStatus}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-3">
                          <div className="flex items-center gap-2">
                            {isPending && (
                              <>
                                <ActionIcon
                                  variant="light"
                                  color="green"
                                  size="lg"
                                  radius="md"
                                  onClick={() => handleApprove(lesson)}
                                  title="Approve lesson"
                                >
                                  <span className="material-symbols-outlined text-lg">check</span>
                                </ActionIcon>
                                <ActionIcon
                                  variant="light"
                                  color="red"
                                  size="lg"
                                  radius="md"
                                  onClick={() => handleReject(lesson)}
                                  title="Reject lesson"
                                >
                                  <span className="material-symbols-outlined text-lg">close</span>
                                </ActionIcon>
                              </>
                            )}
                          </div>

                          <Link
                            href={`/lessons/${lesson.lessonPublicId}`}
                            className="inline-flex h-10 items-center rounded-md border border-blue-500/20 bg-blue-500/10 px-3 text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-500/20"
                            title="View lesson"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Approve Confirmation Modal */}
      <ConfirmModal
        opened={showApproveConfirm}
        onClose={() => !isProcessing && setShowApproveConfirm(false)}
        onConfirm={handleConfirmApprove}
        title="Approve Lesson"
        message={`Are you sure you want to approve "${selectedLesson?.lessonTitle}"?\n\nThis will make the lesson publicly available.`}
        confirmText="Approve"
        confirmColor="green"
        icon="check_circle"
        loading={isProcessing}
      />

      {/* Reject Confirmation Modal */}
      <ConfirmModal
        opened={showRejectConfirm}
        onClose={() => !isProcessing && setShowRejectConfirm(false)}
        onConfirm={handleConfirmReject}
        title="Reject Lesson"
        message={`Are you sure you want to reject "${selectedLesson?.lessonTitle}"?\n\nThe contributor will be notified of this decision.`}
        confirmText="Reject"
        confirmColor="red"
        icon="cancel"
        loading={isProcessing}
      />
    </>
  );
}
