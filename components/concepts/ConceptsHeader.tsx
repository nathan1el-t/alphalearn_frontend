import SearchBar from "./SearchBar";

/**
 * LAYOUT/COMPOSITION COMPONENT
 * 
 * Purpose: Header section with search + user info
 * Responsibility: Layout and composition of header elements
 * 
 * React Concept: Composition over Inheritance
 * - Instead of one giant header component
 * - We compose smaller pieces: SearchBar + Badges + Profile
 * - Each piece could be extracted further if needed
 * 
 * Design Pattern: "Container Component"
 * - Handles layout structure
 * - Delegates specific functionality to child components
 */

interface ConceptsHeaderProps {
  onSearchClick: () => void;
}

export default function ConceptsHeader({ onSearchClick }: ConceptsHeaderProps) {
  return (
    <header className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-[#0F0F14]/50 backdrop-blur-md sticky top-0 z-10">
      {/* Left: Search Bar */}
      <SearchBar onSearchClick={onSearchClick} />

      {/* Right: Badges and Profile */}
      <div className="flex items-center gap-4">
        {/* Stat Badges */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-orange-500/10 text-orange-500 px-3 py-1.5 rounded-full border border-orange-500/20 font-bold text-xs">
            <span className="material-symbols-outlined text-sm">
              local_fire_department
            </span>
            15 DAY STREAK
          </div>
          <div className="flex items-center gap-1 bg-[#7C5CFF]/10 text-[#7C5CFF] px-3 py-1.5 rounded-full border border-[#7C5CFF]/20 font-bold text-xs">
            <span className="material-symbols-outlined text-sm">stars</span>
            4,200 XP
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-4 border-l border-white/10">
          <div className="text-right">
            <p className="text-xs font-bold text-white">rubik</p>
            <p className="text-[8px] text-white/40 uppercase tracking-widest font-semibold">
              Contributor
            </p>
          </div>
          <div className="size-8 rounded-full bg-[#7C5CFF] flex items-center justify-center border-2 border-[#2EFFB4] text-white font-bold text-xs">
            A
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * 🎓 LEARNING NOTES:
 * 
 * 1. COMPOSITION:
 *    This component USES SearchBar instead of reimplementing it
 *    <SearchBar onSearchClick={onSearchClick} />
 *    This is "composition" - building bigger things from smaller things
 * 
 * 2. PROP DRILLING:
 *    Notice onSearchClick is passed from parent → ConceptsHeader → SearchBar
 *    This is "prop drilling" - passing props through intermediate components
 *    For deep nesting, use Context API (more advanced topic)
 * 
 * 3. FURTHER REFACTORING (Optional):
 *    Could extract:
 *    - <StatBadges streak={15} xp={4200} />
 *    - <UserProfile name="rubik" role="Contributor" />
 *    
 *    When to extract?
 *    - If you need to reuse it elsewhere
 *    - If component file gets too large (>200 lines)
 *    - If logic becomes complex (badges fetched from API)
 * 
 * 4. STICKY HEADER:
 *    "sticky top-0 z-10" makes header stick to top when scrolling
 *    Not a React concept, but good UX pattern!
 */
