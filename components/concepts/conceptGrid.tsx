import { SimpleGrid } from "@mantine/core";
import ConceptCard from "./conceptCard";
import type { Concept } from "@/interfaces/interfaces";

interface ConceptGridProps {
  concepts: Concept[];
}

export default function ConceptGrid({ concepts }: ConceptGridProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
      {concepts.map((concept, idx) => (
        <ConceptCard key={concept.conceptId || idx} {...concept} />
      ))}
    </SimpleGrid>
  );
}
