import ConceptsPage from "@/components/concepts/conceptsPage";
import type { Concept } from "@/interfaces/interfaces";
import { Suspense } from "react";
import ConceptsSkeleton from "@/components/concepts/conceptsSkeleton";
import { apiFetch } from "@/lib/api";
import { redirectAdminFromPublicRoute } from "@/lib/rbac";

async function ConceptsData() {
  
  const concepts:Concept[] = await apiFetch<Concept[]>("/concepts");

  return <ConceptsPage concepts={concepts} />;
}

export default async function ConceptsPageRoute() {
  await redirectAdminFromPublicRoute("concepts-list");

  return (
    <Suspense fallback={<ConceptsSkeleton />}>
      <ConceptsData />
    </Suspense>
  );
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
