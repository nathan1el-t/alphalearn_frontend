"use client";

import { Card, Text, ActionIcon } from "@mantine/core";
import { Spotlight, spotlight } from "@mantine/spotlight";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "@/components/concepts/searchBar";
import ConfirmModal from "@/components/common/confirmModal";
import { showSuccess, showError } from "@/lib/notifications";
import { deleteConcept } from "./actions";
import type { AdminConcept } from "@/interfaces/interfaces";

interface ConceptsManagementTableProps {
  concepts: AdminConcept[];
}

export default function ConceptsManagementTable({ concepts }: ConceptsManagementTableProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<AdminConcept | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConcept = (concept: AdminConcept) => {
    setSelectedConcept(concept);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedConcept) return;

    setIsDeleting(true);
    try {
      const result = await deleteConcept(selectedConcept.conceptId);
      
      setShowDeleteConfirm(false);
      setSelectedConcept(null);
      
      if (result.success) {
        showSuccess(result.message);
      } else {
        showError(result.message);
      }
    } catch (error) {
      console.error("Failed to delete concept:", error);
      showError("An error occurred while deleting the concept");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setShowDeleteConfirm(false);
      setSelectedConcept(null);
    }
  };

  const filteredConcepts = concepts;

  // Create spotlight actions for search (use filtered concepts)
  const spotlightActions = filteredConcepts.map((concept) => ({
    id: String(concept.conceptId),
    label: concept.title,
    description: concept.description,
    onClick: () => {
      window.location.href = `/concepts/${concept.conceptId}`;
    },
  }));

  return (
    <>
      {/* Spotlight Search Modal */}
      <Spotlight
        actions={spotlightActions}
        limit={7}
        nothingFound="No concepts found"
        highlightQuery
        searchProps={{
          placeholder: "Search concepts...",
        }}
        shortcut={["mod + K", "ctrl + k"]}
      />
      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="admin-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-medium">
                Total Concepts
              </p>
              <p className="text-3xl font-bold text-[var(--color-text)] mt-2">
                {concepts.length}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] opacity-50">
              library_books
            </span>
          </div>
        </Card>
      </div>

      {/* Concepts Table */}
      <Card className="admin-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[var(--color-text)]">
              All Concepts ({filteredConcepts.length})
            </h2>
            <SearchBar onSearchClick={() => spotlight.open()} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="admin-table w-full">
            <thead>
              <tr>
                <th className="text-[var(--color-text)] font-semibold text-left p-3">Title</th>
                <th className="text-[var(--color-text)] font-semibold text-left p-3">Created</th>
                <th className="text-[var(--color-text)] font-semibold text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredConcepts.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8">
                    <Text c="dimmed">
                      No concepts found
                    </Text>
                  </td>
                </tr>
              ) : (
                filteredConcepts.map((concept) => (
                  <tr key={concept.conceptId} className="hover:bg-[var(--color-background-hover)] border-b border-[var(--color-border)]">
                    <td className="p-3">
                      <div>
                        <Text fw={500} className="text-[var(--color-text)]">{concept.title}</Text>
                        {concept.description && (
                          <Text size="sm" c="dimmed" className="text-[var(--color-text-secondary)] mt-1 truncate max-w-xs">
                            {concept.description}
                          </Text>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <Text size="sm" className="text-[var(--color-text-secondary)]">
                        {new Date(concept.createdAt).toLocaleDateString()}
                      </Text>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/concepts/${concept.conceptId}`}>
                          <ActionIcon 
                            variant="light" 
                            className="admin-action-view hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                            size="sm"
                          >
                            <span className="material-symbols-outlined text-base">
                              visibility
                            </span>
                          </ActionIcon>
                        </Link>
                        <ActionIcon 
                          variant="light" 
                          color="red"
                          className="admin-action-delete hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                          size="sm"
                          onClick={() => handleDeleteConcept(concept)}
                        >
                          <span className="material-symbols-outlined text-base">
                            delete
                          </span>
                        </ActionIcon>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        opened={showDeleteConfirm}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Concept"
        message={`Are you sure you want to delete "${selectedConcept?.title}"?\n\nThis action cannot be undone.`}
        confirmText="Delete"
        confirmColor="red"
        icon="delete_forever"
        loading={isDeleting}
      />
    </>
  );
}
