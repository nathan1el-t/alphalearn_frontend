import Link from "next/link";

/**
 * PRESENTATIONAL COMPONENT
 * 
 * Purpose: Display a single concept card
 * Responsibility: Only rendering UI, no logic or state
 * 
 * React Concept: "Props Down" - parent passes data, child displays it
 * Why? Makes this component reusable anywhere you need to show a concept
 */

interface ConceptCardProps {
  conceptId: number;
  title: string;
  description: string;
  moderationStatus: string;
  createdAt: string;
}

export default function ConceptCard({
  conceptId,
  title,
  description,
  moderationStatus,
  createdAt,
}: ConceptCardProps) {
  return (
    <Link
      href={`/concepts/${conceptId}`}
      className="concept-card bg-[#181826] rounded-xl p-4 border border-white/5 flex gap-3 hover:shadow-[0_0_20px_rgba(46,255,180,0.15)] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1.5">
          {/* <span className="text-[8px] font-bold uppercase tracking-widest text-[#7C5CFF] bg-[#7C5CFF]/10 px-1.5 py-0.5 rounded-sm">
            {moderationStatus}
          </span> */}
          <span></span>
          <span className="material-symbols-outlined text-white/20 hover:text-white cursor-pointer transition-colors text-[16px]">
            bookmark
          </span>
        </div>

        <h3 className="text-lg font-extrabold mb-1 text-white">{title}</h3>
        <p className="text-white/50 text-xs leading-relaxed mb-2 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-medium">
          <span className="ml-auto">
            Updated {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
