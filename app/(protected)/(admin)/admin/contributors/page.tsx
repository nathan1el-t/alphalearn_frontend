import { apiFetch } from "@/lib/api";
import { Card } from "@mantine/core";
import { Suspense } from "react";
import CardSkeleton from "@/components/common/cardSkeleton";
import ContributorsManagementTable from "./contributorsTable";
import type { AdminContributor } from "@/interfaces/interfaces";

async function ContributorsData() {
    const contributors = await apiFetch<AdminContributor[]>("/contributors");
    return <ContributorsManagementTable contributors={contributors} />;
}

export default function ManageContributorsPage() {
    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-10 pb-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-15">
                    <div className="flex items-center justify-center">
                        <div>
                            <h1 className="text-4xl font-bold text-[var(--color-text)] mb-2">
                                Manage Contributors
                            </h1>
                            <p className="text-center text-[var(--color-text-secondary)] mb-10">
                                Promote and demote contributors
                            </p>
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
                        <ContributorsData />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
