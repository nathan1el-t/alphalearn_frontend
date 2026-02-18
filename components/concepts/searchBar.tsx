/**
 * PRESENTATIONAL COMPONENT with Event Handler
 * 
 * Purpose: Search icon button that opens Spotlight modal
 * Responsibility: Display search UI and trigger opening Spotlight
 * 
 * React Concept: Event Handler Props
 * - Parent passes onSearchClick function
 * - This component calls it when button is clicked
 * 
 * Design: Simple icon button
 * - Uses CSS variables from globals.css
 * - Clean hover effect with scale and color change
 * - Material Symbols search icon
 */

interface SearchBarProps {
  onSearchClick: () => void;
}

export default function SearchBar({ onSearchClick }: SearchBarProps) {
  return (
    <button
      onClick={onSearchClick}
      className="flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group"
      style={{
        backgroundColor: 'transparent',
      }}
      aria-label="Search concepts"
    >
      <span
        className="material-symbols-outlined !text-[40px] transition-all duration-200"
        style={{
          color: 'var(--color-text)',
        }}
      >
        search
      </span>

      <style jsx>{`
    button:hover .material-symbols-outlined {
      color: var(--color-accent);
      filter: drop-shadow(0 0 5px var(--color-accent))
              drop-shadow(0 0 20px var(--color-accent));
    }
  `}</style>
    </button>

  );
}
