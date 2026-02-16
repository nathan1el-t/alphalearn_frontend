import ConceptsPage from "@/components/concepts/ConceptsPage";
import type { Concept } from "@/interfaces/interfaces";

/**
 * SERVER COMPONENT (No "use client")
 * 
 * Purpose: Fetch data server-side
 * Responsibility: Data fetching only
 * 
 * React Server Components Pattern:
 * 
 *   page.tsx (Server)         ConceptsPage (Client)
 *   ├─ Fetches data      →    ├─ Manages state
 *   ├─ No "use client"        ├─ Handles events
 *   ├─ Runs on server         └─ Runs in browser
 *   └─ SEO friendly
 * 
 * Why this separation?
 * Server Component = Fast initial load, SEO, backend access
 * Client Component = Interactive UI, state management
 * Best of both worlds!
 * 
 * This is Next.js 13+ App Router best practice
 */

export default async function ConceptsPageRoute() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/concepts`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch concepts");
  }

  const concepts: Concept[] = await res.json();

  // Clean and simple! Just fetch and pass to client component
  return <ConceptsPage concepts={concepts} />;
}

/**
 * LEARNING NOTES:
 * 
 * 1. FILE ORGANIZATION:
 *    components/
 *    └─ concepts/              ← Feature-based folder
 *       ├─ ConceptsPage.tsx    ← Main component
 *       ├─ ConceptCard.tsx     ← Small pieces
 *       ├─ ConceptGrid.tsx
 *       ├─ Pagination.tsx
 *       └─ ... etc
 * 
 * 2. NAMING:
 *    Renamed this function to ConceptsPageRoute to avoid confusion
 *    with ConceptsPage component
 * 
 * 3. SEPARATION OF CONCERNS:
 *    page.tsx      → Routing & Data Fetching
 *    ConceptsPage  → UI State & Logic
 *    Child components → Specific UI pieces
 * 
 * 4. THE COMPLETE FLOW:
 * 
 *    1. User visits /concepts
 *    2. Next.js calls this Server Component
 *    3. Fetches data from backend
 *    4. Passes data to ConceptsPage (Client Component)
 *    5. ConceptsPage manages pagination, filtering, search
 *    6. Child components render the UI
 *    7. User interactions trigger events
 *    8. Events bubble up to ConceptsPage
 *    9. State updates in ConceptsPage
 *    10. Props flow down to children
 *    11. UI re-renders with new data
 */