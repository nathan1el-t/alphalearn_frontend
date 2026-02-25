"use client";

import type { Concept } from "@/interfaces/interfaces";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spotlight, spotlight, SpotlightActionData } from "@mantine/spotlight";
import SearchBar from "./searchBar";
import ConceptGrid from "./conceptGrid";
import Pagination from "./pagination";

/**
 *  SMART/CONTAINER COMPONENT
 * 
 * Purpose: Manage state and coordinate all child components
 * Responsibility: Business logic, state management, data flow
 * 
 * React Architecture Pattern:
 * 
 *     ConceptsPage (Smart - has state & logic)
 *          ↓ props
 *     [Dumb Components] ─→ Just display & trigger events
 * 
 * This is the "Presentational vs Container" pattern
 * Container = this component (smart, stateful)
 * Presentational = all the components we built (dumb, stateless)
 * 
 */

interface ConceptsPageProps {
  concepts: Concept[];
}


const ITEMS_PER_PAGE = 6;

export default function ConceptsPage({ concepts }: ConceptsPageProps) {
  const router = useRouter();

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  // All state lives here at the top level
  // Child components are "controlled" by this state
  const [currentPage, setCurrentPage] = useState(1);

  // ========================================
  // SPOTLIGHT SEARCH SETUP
  // ========================================
  // Transform concepts into Spotlight actions
  const handleSpotlightAction = (conceptPublicId: string) => {
    spotlight.close();
    router.push(`/concepts/${conceptPublicId}`);
  };

  const spotlightActions: SpotlightActionData[] = concepts.map((concept) => ({
    id: concept.publicId,
    label: concept.title,
    description: concept.description,
    onClick: () => handleSpotlightAction(concept.publicId),
  }));

  // ========================================
  // PAGINATION LOGIC
  // ========================================
  // Calculate which concepts to show based on currentPage
  const totalPages = Math.ceil(concepts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedConcepts = concepts.slice(startIndex, endIndex);

  // Handler that child Pagination component will call
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In production, you might also:
    // - Scroll to top of page
    // - Track analytics
    // - Prefetch next page data
  };

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
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

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[var(--color-background)]">
        {/* Page Title with Inline Search */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-center gap-4">
          <div>
            <h2 className="text-3xl text-center font-extrabold tracking-tight mb-1 mt-5 text-[var(--color-text)]">
              Browse Concepts
            </h2>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Stay cracked at internet culture and never miss a beat.
            </p>
          </div>

          {/* Search Bar - Now inline with title */}
          <div className="md:max-w-md">
            <SearchBar onSearchClick={spotlight.open} />
          </div>
        </div>

        {/* Concept Cards Grid */}
        <ConceptGrid concepts={paginatedConcepts} />

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={concepts.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
