"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spotlight, spotlight, SpotlightActionData } from "@mantine/spotlight";
import ConceptsHeader from "./ConceptsHeader";
// import CategoryFilters from "./CategoryFilters";
import ConceptGrid from "./ConceptGrid";
import Pagination from "./Pagination";

/**
 * 🧠 SMART/CONTAINER COMPONENT (The Brain)
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
 */

interface Concept {
  conceptId: number;
  title: string;
  description: string;
  moderationStatus: string;
  createdAt: string;
}

interface ConceptsPageProps {
  concepts: Concept[];
}

type Category = "All" | "Slang" | "Memes" | "Behaviors";

const ITEMS_PER_PAGE = 6;

export default function ConceptsPage({ concepts }: ConceptsPageProps) {
  const router = useRouter();

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  // All state lives here at the top level
  // Child components are "controlled" by this state
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  // ========================================
  // SPOTLIGHT SEARCH SETUP
  // ========================================
  // Transform concepts into Spotlight actions
  const handleSpotlightAction = (conceptId: number) => {
    spotlight.close();
    router.push(`/concepts/${conceptId}`);
  };

  const spotlightActions: SpotlightActionData[] = concepts.map((concept) => ({
    id: String(concept.conceptId),
    label: concept.title,
    description: concept.description,
    onClick: () => handleSpotlightAction(concept.conceptId),
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

  // ========================================
  // FILTER LOGIC
  // ========================================
  // Handler that CategoryFilters will call
  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to page 1 when filter changes
    
    // In production, you would filter concepts here:
    // const filtered = category === "All" 
    //   ? concepts 
    //   : concepts.filter(c => c.category === category);
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

      {/* Header with Search */}
      <ConceptsHeader onSearchClick={spotlight.open} />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {/* Page Title */}
        <div className="mb-6 flex flex-col gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-1 text-white">
              Browse Concepts
            </h2>
            <p className="text-white/50 text-sm">
              Stay cracked at internet culture and never miss a beat.
            </p>
          </div>

          {/* Category Filters */}
          {/* <CategoryFilters
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          /> */}
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

/**
 * 🎓 ADVANCED LEARNING NOTES:
 * 
 * 1. STATE COLOCATION:
 *    State lives as CLOSE as possible to where it's used
 *    But HIGH ENOUGH that all components needing it can access it
 *    
 *    currentPage is here because:
 *    - Pagination needs to display it
 *    - ConceptGrid needs it to slice array
 *    
 *    If only Pagination needed it, we'd put state there instead!
 * 
 * 2. SINGLE SOURCE OF TRUTH:
 *    currentPage is stored in ONE place (here)
 *    All components read from or update this one source
 *    Never duplicate state in multiple places!
 * 
 * 3. DATA FLOW:
 *    Props Down     concepts → ConceptGrid → ConceptCard
 *    Events Up      User clicks → Pagination → handlePageChange → setCurrentPage
 *    
 *    This unidirectional flow makes bugs easier to trace
 * 
 * 4. COMPONENT HIERARCHY:
 * 
 *    ConceptsPage (SMART - State & Logic)
 *    ├─ Spotlight (Mantine lib)
 *    ├─ ConceptsHeader (Layout)
 *    │  └─ SearchBar (Presentational)
 *    ├─ CategoryFilters (Presentational)
 *    ├─ ConceptGrid (Presentational)
 *    │  └─ ConceptCard (Presentational)
 *    └─ Pagination (Presentational)
 * 
 * 5. WHY THIS ARCHITECTURE?
 *    ✅ Easy to test (pass different props to dumb components)
 *    ✅ Easy to reuse (Pagination works on any page)
 *    ✅ Easy to debug (check ConceptsPage state first)
 *    ✅ Easy to modify (change UI without touching logic)
 * 
 * 6. NEXT STEPS:
 *    - Add loading states
 *    - Add error boundaries
 *    - Implement actual category filtering
 *    - Add URL query params for deep linking
 *    - Optimize with React.memo for large lists
 */
