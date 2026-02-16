import ConceptCard from "./ConceptCard";

/**
 * CONTAINER/LIST COMPONENT
 * 
 * Purpose: Display a grid of concept cards
 * Responsibility: Layout and rendering list of items
 * 
 * React Concept: "Composition" - using smaller components to build bigger ones
 * Pattern: The .map() pattern for rendering lists
 * 
 * Why separate from ConceptCard?
 * - ConceptCard knows how to render ONE concept
 * - ConceptGrid knows how to layout MANY concepts
 * - Separation of concerns!
 */

interface Concept {
  conceptId: number;
  title: string;
  description: string;
  moderationStatus: string;
  createdAt: string;
}

interface ConceptGridProps {
  concepts: Concept[];
}

export default function ConceptGrid({ concepts }: ConceptGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
      {concepts.map((concept) => (
        <ConceptCard
          key={concept.conceptId} // React needs unique 'key' for list items!
          conceptId={concept.conceptId}
          title={concept.title}
          description={concept.description}
          moderationStatus={concept.moderationStatus}
          createdAt={concept.createdAt}
        />
      ))}
    </div>
  );
}

/**
 * 🎓 LEARNING NOTES:
 * 
 * 1. KEY PROP: React uses 'key' to track which items changed/added/removed
 *    - ALWAYS use unique, stable IDs (like conceptId)
 *    - NEVER use array index as key if list can reorder
 * 
 * 2. SPREADING: We COULD do <ConceptCard {...concept} /> to pass all props
 *    - But explicit props are clearer for learning
 *    - Shows exactly what data flows where
 * 
 * 3. EMPTY STATE: In production, add handling for empty concepts array
 *    - if (concepts.length === 0) return <EmptyState />
 */
