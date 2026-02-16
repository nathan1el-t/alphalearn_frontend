// /**
//  * CONTROLLED FILTER COMPONENT
//  * 
//  * Purpose: Category filter buttons
//  * Responsibility: Display filter options and notify parent of selection
//  * 
//  * React Concept: Same "Controlled Component" pattern as Pagination
//  * - Parent tracks which filter is active
//  * - Child displays buttons and calls onFilterChange when clicked
//  * 
//  * Future Enhancement: Parent could use this to filter the concepts array
//  */

// type Category = "All" | "Slang" | "Memes" | "Behaviors";

// interface CategoryFiltersProps {
//   activeCategory: Category;
//   onCategoryChange: (category: Category) => void;
// }

// const CATEGORIES: Category[] = ["All", "Slang", "Memes", "Behaviors"];

// export default function CategoryFilters({
//   activeCategory,
//   onCategoryChange,
// }: CategoryFiltersProps) {
//   return (
//     <div className="flex items-center gap-2">
//       {CATEGORIES.map((category) => (
//         <button
//           key={category}
//           onClick={() => onCategoryChange(category)}
//           className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all border ${
//             activeCategory === category
//               ? "bg-[#2EFFB4] text-[#0F0F14] border-[#2EFFB4]"
//               : "bg-[#181826] text-white/60 hover:text-white hover:bg-white/5 border-white/5"
//           }`}
//         >
//           {category}
//         </button>
//       ))}
//     </div>
//   );
// }

// /**
//  * 🎓 LEARNING NOTES:
//  * 
//  * 1. TYPE SAFETY:
//  *    Category = "All" | "Slang" | "Memes" | "Behaviors"
//  *    This is a TypeScript Union Type - only these 4 strings allowed
//  *    Prevents typos like onCategoryChange("Meme") - TypeScript catches it!
//  * 
//  * 2. CONSTANTS:
//  *    CATEGORIES array - single source of truth for available filters
//  *    Want to add a filter? Add to this array, button automatically appears
//  *    This is better than hardcoding 4 separate <button> elements
//  * 
//  * 3. ACTIVE STATE STYLING:
//  *    Uses ternary operator to conditionally apply classes
//  *    activeCategory === category ? "active styles" : "inactive styles"
//  * 
//  * 4. FUTURE: FILTERING LOGIC
//  *    Right now these buttons don't actually filter
//  *    Parent component will need to:
//  *    - Track activeCategory in state
//  *    - Filter concepts array before passing to ConceptGrid
//  *    Example: filteredConcepts = concepts.filter(c => 
//  *      activeCategory === "All" || c.category === activeCategory
//  *    )
//  */
