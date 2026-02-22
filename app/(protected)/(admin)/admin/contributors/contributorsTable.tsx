"use client";

import { Badge, Card, Text, ActionIcon, Button } from "@mantine/core";
import { useState } from "react";
import type { AdminContributor } from "@/interfaces/interfaces";

interface ContributorsManagementTableProps {
  contributors: AdminContributor[];
}

type FilterType = "all" | "active" | "demoted";

export default function ContributorsManagementTable({ contributors }: ContributorsManagementTableProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState<string | null>(null);

  const handlePromote = async (contributorId: string) => {
    setLoading(contributorId);
    // TODO: Implement promote functionality
    console.log('Promote contributor:', contributorId);
    // After API call succeeds, reload or update state
    setLoading(null);
  };

  const handleDemote = async (contributorId: string) => {
    setLoading(contributorId);
    // TODO: Implement demote functionality
    console.log('Demote contributor:', contributorId);
    // After API call succeeds, reload or update state
    setLoading(null);
  };

  // Filter contributors based on current filter
  const filteredContributors = contributors.filter(contributor => {
    if (filter === "active") return contributor.demotedAt === null;
    if (filter === "demoted") return contributor.demotedAt !== null;
    return true; // "all" - show all contributors
  });

  // Calculate stats
  const activeCount = contributors.filter(c => c.demotedAt === null).length;
  const demotedCount = contributors.filter(c => c.demotedAt !== null).length;

  return (
    <>
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card 
          className={`admin-card cursor-pointer transition-all duration-200 ${
            filter === "all" ? "ring-2 ring-[var(--color-primary)]" : "hover:scale-105"
          }`}
          onClick={() => setFilter("all")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-medium">
                Total Contributors
              </p>
              <p className="text-3xl font-bold text-[var(--color-text)] mt-2">
                {contributors.length}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] opacity-50">
              groups
            </span>
          </div>
        </Card>

        <Card 
          className={`admin-card cursor-pointer transition-all duration-200 ${
            filter === "active" ? "ring-2 ring-green-500" : "hover:scale-105"
          }`}
          onClick={() => setFilter("active")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-medium">
                Active Contributors
              </p>
              <p className="text-3xl font-bold text-[var(--color-text)] mt-2">
                {activeCount}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-green-500 opacity-50">
              person_check
            </span>
          </div>
        </Card>

        <Card 
          className={`admin-card cursor-pointer transition-all duration-200 ${
            filter === "demoted" ? "ring-2 ring-red-500" : "hover:scale-105"
          }`}
          onClick={() => setFilter("demoted")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-medium">
                Demoted
              </p>
              <p className="text-3xl font-bold text-[var(--color-text)] mt-2">
                {demotedCount}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-red-500 opacity-50">
              person_remove
            </span>
          </div>
        </Card>
      </div>

      {/* Contributors Table */}
      <Card className="admin-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[var(--color-text)]">
            {filter === "all" ? "All Contributors" : 
             filter === "active" ? "Active Contributors" : 
             "Demoted Contributors"} ({filteredContributors.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="admin-table w-full">
            <thead>
              <tr>
                <th className="text-[var(--color-text)] font-semibold text-left p-3">Contributor ID</th>
                <th className="text-[var(--color-text)] font-semibold text-left p-3">Status</th>
                <th className="text-[var(--color-text)] font-semibold text-left p-3">Promoted At</th>
                <th className="text-[var(--color-text)] font-semibold text-left p-3">Demoted At</th>
                <th className="text-[var(--color-text)] font-semibold text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContributors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    <Text c="dimmed">
                      {filter === "all" ? "No contributors found" :
                       filter === "active" ? "No active contributors" :
                       "No demoted contributors"}
                    </Text>
                  </td>
                </tr>
              ) : (
                filteredContributors.map((contributor) => (
                  <tr key={contributor.contributorId} className="hover:bg-[var(--color-background-hover)] border-b border-[var(--color-border)]">
                    <td className="p-3">
                      <Text fw={500} className="text-[var(--color-text)] font-mono text-sm">
                        {contributor.contributorId}
                      </Text>
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant="light" 
                        className={
                          contributor.demotedAt === null ? "admin-badge-success" : "admin-badge-error"
                        }
                      >
                        {contributor.demotedAt === null ? "ACTIVE" : "DEMOTED"}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Text size="sm" className="text-[var(--color-text-secondary)]">
                        {contributor.promotedAt 
                          ? new Date(contributor.promotedAt).toLocaleDateString() 
                          : "N/A"}
                      </Text>
                    </td>
                    <td className="p-3">
                      <Text size="sm" className="text-[var(--color-text-secondary)]">
                        {contributor.demotedAt 
                          ? new Date(contributor.demotedAt).toLocaleDateString() 
                          : "—"}
                      </Text>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        {contributor.demotedAt === null ? (
                          <Button
                            variant="light"
                            color="red"
                            size="xs"
                            className="admin-action-delete"
                            onClick={() => handleDemote(contributor.contributorId)}
                            loading={loading === contributor.contributorId}
                          >
                            <span className="material-symbols-outlined text-sm mr-1">
                              person_remove
                            </span>
                            Demote
                          </Button>
                        ) : (
                          <Button
                            variant="light"
                            color="green"
                            size="xs"
                            className="admin-action-view"
                            onClick={() => handlePromote(contributor.contributorId)}
                            loading={loading === contributor.contributorId}
                          >
                            <span className="material-symbols-outlined text-sm mr-1">
                              person_add
                            </span>
                            Promote
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
