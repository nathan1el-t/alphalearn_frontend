import Link from "next/link";
import { Card, Tooltip } from "@mantine/core";

/**
 * PRESENTATIONAL COMPONENT (Using Mantine Card + Tooltip)
 * 
 * Purpose: Display a single concept card
 * Responsibility: Only rendering UI, no logic or state
 * 
 * React Concept: "Props Down" - parent passes data, child displays it
 * Library Integration: Uses Mantine Card for structure + accessibility
 *                      Uses Mantine Tooltip for bookmark interaction hint
 * 
 */

interface ConceptCardProps {
  publicId: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function ConceptCard({
  publicId,
  title,
  description,
  createdAt,
}: ConceptCardProps) {
  return (
    <Card
      component={Link}
      href={`/concepts/${publicId}`}
      padding="md"
      radius="xl"
      withBorder={false}
      style={{ backgroundColor: 'var(--color-surface)' }}
      className="concept-card border border-[var(--color-overlay)]
             hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-1.5">
        {/* Placeholder for status badge */}
        <span></span>
        <Tooltip label="Save for later" position="top" withArrow>
          <span className="material-symbols-outlined text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer transition-colors text-[16px]">
            bookmark
          </span>
        </Tooltip>
      </div>

      <Card.Section inheritPadding className="pb-4">
        <h3 className="text-lg font-extrabold mb-1 text-[var(--color-text)]">{title}</h3>
        <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed mb-2 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-text-muted)] font-medium">
          <span className="ml-auto">
            Updated {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </Card.Section>
      <style jsx>{`
  :global(.concept-card:hover){
    border-color: var(--color-accent);
    box-shadow:
      0 0 5px var(--color-accent),
      0 0 20px var(--color-accent);
  }
`}</style>
    </Card>

  );
}
