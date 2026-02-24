import { apiFetch } from "@/lib/api";
import { Badge, Card } from "@mantine/core";
import { Suspense } from "react";
import CardSkeleton from "@/components/common/cardSkeleton";
import ConceptsManagementTable from "./conceptsTable";
import GlowIconButton from "@/components/common/glowIconButton";
import type { AdminConcept } from "@/interfaces/interfaces";

async function ConceptsData() {
    const concepts = await apiFetch<AdminConcept[]>("/concepts");
    return <ConceptsManagementTable concepts={concepts} />;
}

export default function ManageConceptsPage() {
    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-10 pb-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-15">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="flex-1 flex justify-end md:justify-center">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold text-[var(--color-text)] mb-2">
                                    Manage Concepts
                                </h1>
                                <p className="text-[var(--color-text-secondary)] mb-10">
                                    Review and manage
                                </p>
                            </div>
                        </div>
                        
                        {/* Add Concept Button - Glowing Icon */}
                        <div className="absolute right-8 top-12 md:relative md:right-0 md:top-0">
                            <GlowIconButton 
                                href="/admin/concepts/add"
                                icon="add_circle" 
                                ariaLabel="Add new concept"
                                size="md"
                            />
                        </div>
                    </div>

                    <Suspense
                        fallback={
                            <div>
                                {/* Stats Skeleton */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    {[...Array(3)].map((_, i) => (
                                        <Card key={i} className="admin-card">
                                            <CardSkeleton count={1} cols={1} showBookmark={false} lines={1} />
                                        </Card>
                                    ))}
                                </div>
                                {/* Table Skeleton */}
                                <Card className="admin-card">
                                    <CardSkeleton count={6} cols={1} showBookmark={false} lines={2} />
                                </Card>
                            </div>
                        }
                    >
                        <ConceptsData />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
