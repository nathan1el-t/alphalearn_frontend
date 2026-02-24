"use client";

import { useRouter } from "next/navigation";
import {
    Spotlight,
    SpotlightActionData,
    spotlight,
} from "@mantine/spotlight";
import type { Concept } from "@/interfaces/interfaces";

interface ConceptSpotlightSearchProps {
    concepts: Concept[];
}

export default function ConceptSpotlightSearch({ concepts }: ConceptSpotlightSearchProps) {
    const router = useRouter();

    const actions: SpotlightActionData[] = concepts.map((concept) => ({
        id: String(concept.conceptId),
        label: concept.title,
        description: concept.description,
        onClick: () => {
            spotlight.close();
            router.push(`/concepts/${concept.conceptId}`);
        },
        leftSection: (
            <span
                className="material-symbols-outlined text-[22px]"
                style={{ color: "var(--color-card-accent)" }}
            >
                lightbulb
            </span>
        ),
    }));

    return (
        <Spotlight
            actions={actions}
            nothingFound="No concepts found..."
            highlightQuery
            limit={7}
            shortcut={["mod + K", "mod + P"]}
            searchProps={{
                leftSection: (
                    <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        search
                    </span>
                ),
                placeholder: "Search concepts...",
            }}
            styles={{
                content: {
                    background: "var(--color-card-bg)",
                    border: "1px solid var(--color-card-border)",
                },
                search: {
                    background: "var(--color-card-bg)",
                    color: "var(--color-card-text)",
                    borderBottom: "1px solid var(--color-card-border)",
                },
                action: {
                    borderRadius: "8px",
                },
            }}
        />
    );
}

export { spotlight };
