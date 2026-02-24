import ConceptCard from "./conceptCard";

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
  createdAt: string;
}

interface ConceptGridProps {
  concepts: Concept[];
}

export default function ConceptGrid({ concepts }: ConceptGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10 pb-10 p-10">
      {concepts.map((concept) => (
        <ConceptCard
          key={concept.conceptId} // React needs unique 'key' for list items!
          conceptId={concept.conceptId}
          title={concept.title}
          description={concept.description}
          createdAt={concept.createdAt}
        />
      ))}
    </div>
  );
}
