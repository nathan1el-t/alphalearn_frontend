/**
 * CONTROLLED COMPONENT (Event-Handler Pattern)
 * 
 * Purpose: Pagination controls
 * Responsibility: Display pagination UI and notify parent of changes
 * 
 * React Concept: "Lifting State Up"
 * - This component DOES NOT store currentPage in its own state
 * - Parent manages state, passes it down as prop
 * - Child calls onPageChange() to request changes
 * 
 * Why? Parent (ConceptsPage) needs to know page number to slice the array
 * So parent owns the state, child just displays and triggers events
 * 
 * Pattern: "Props Down, Events Up"
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void; // Function to call when page changes
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between border-t border-white/5 pt-4">
      <div className="text-xs text-white/40 font-medium">
        Showing {startIndex + 1} to {endIndex} of {totalItems} concepts
      </div>

      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="size-8 rounded-lg bg-[#181826] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[16px]">
            chevron_left
          </span>
        </button>

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`size-8 rounded-lg font-bold text-sm flex items-center justify-center transition-all ${
              currentPage === page
                ? "bg-[#2EFFB4] text-[#0F0F14]"
                : "bg-[#181826] border border-white/5 text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="size-8 rounded-lg bg-[#181826] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}

/**
 * 🎓 LEARNING NOTES:
 * 
 * 1. CONTROLLED vs UNCONTROLLED:
 *    Controlled (this): Parent controls the value via props
 *    Uncontrolled: Component has its own internal state
 * 
 * 2. WHY CONTROLLED?
 *    - Single source of truth (parent has the state)
 *    - Easier to debug (look at parent to see current page)
 *    - Parent can respond to page changes (fetch data, scroll to top, etc.)
 * 
 * 3. CALLBACK PATTERN:
 *    onPageChange is a function passed from parent
 *    When we call onPageChange(5), parent's function runs
 *    Parent usually does: setCurrentPage(5)
 * 
 * 4. REAL-WORLD IMPROVEMENT:
 *    - For 100+ pages, show "..." ellipsis
 *    - Only show first 3, last 3, and pages around current
 *    - Could extract page number logic to separate component
 */
