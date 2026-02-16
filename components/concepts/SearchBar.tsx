/**
 * PRESENTATIONAL COMPONENT with Event Handler
 * 
 * Purpose: Search input that opens Spotlight modal
 * Responsibility: Display search UI and trigger opening Spotlight
 * 
 * React Concept: Event Handler Props
 * - Parent passes onSearchClick function
 * - This component calls it when input is clicked
 * 
 * Why readOnly input? 
 * - Acts as a trigger/button to open Spotlight modal
 * - Actual search happens in Spotlight component
 * - This pattern is common with modal search interfaces
 */

interface SearchBarProps {
  onSearchClick: () => void;
}

export default function SearchBar({ onSearchClick }: SearchBarProps) {
  return (
    <div className="flex-1 max-w-lg">
      <div className="relative group">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2EFFB4] transition-colors text-[18px]">
          search
        </span>
        <input
          className="w-full bg-[#181826] border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-[#2EFFB4]/50 placeholder:text-white/30 transition-all text-white cursor-pointer"
          placeholder="Search concepts (e.g. Rizz, Sigma...)"
          type="text"
          onClick={onSearchClick}
          readOnly
        />
      </div>
    </div>
  );
}

/**
 * 🎓 LEARNING NOTES:
 * 
 * 1. REUSABILITY:
 *    This SearchBar could be used on ANY page
 *    Not tied to concepts - just receives a click handler
 *    Example: <SearchBar onSearchClick={openUserSearch} />
 * 
 * 2. READONLY INPUT:
 *    readOnly prevents typing but allows clicking
 *    Alternative: Could use <button> styled to look like input
 *    Input is better for keyboard navigation (Tab to focus)
 * 
 * 3. CSS SELECTORS:
 *    "group" class + "group-focus-within:" = Tailwind group styling
 *    When input is focused, icon changes color
 *    This is advanced CSS made easy by Tailwind
 * 
 * 4. SEPARATION OF CONCERNS:
 *    SearchBar = visual trigger
 *    Spotlight = actual search functionality
 *    Clean separation makes both components reusable
 */
