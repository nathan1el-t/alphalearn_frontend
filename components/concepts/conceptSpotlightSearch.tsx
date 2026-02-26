"use client";

import { useRouter } from "next/navigation";
import {
    Spotlight,
    SpotlightActionData,
    SpotlightActions,
    spotlight,
} from "@mantine/spotlight";
import type { Concept } from "@/interfaces/interfaces";

interface ConceptSpotlightSearchProps {
    concepts: Concept[];
}

export default function ConceptSpotlightSearch({ concepts }: ConceptSpotlightSearchProps) {
    const router = useRouter();

    const actions: SpotlightActionData[] = concepts.map((concept) => {
        const finalId = concept.publicId;

        return {
            id: String(finalId),
            label: concept.title,
            description: concept.description,
            onClick: () => {
                spotlight.close();
                router.push(`/concepts/${finalId}`);
            },
            leftSection: (
                <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ color: "var(--color-primary)" }}
                >
                    lightbulb
                </span>
            ),
        };
    });

    const filterActions = (rawQuery: string, rawActions: SpotlightActions[]): SpotlightActions[] => {
        const trimmedQuery = rawQuery.trim().toLowerCase();
        const flatActions = rawActions.filter(
            (action): action is SpotlightActionData => "id" in action
        );

        if (trimmedQuery.length === 0) {
            return [];
        }

        if (trimmedQuery.length < 2) return [];

        return flatActions.filter((action) => {
            const label = String(action.label || "").toLowerCase();
            const description = String(action.description || "").toLowerCase();
            return label.includes(trimmedQuery) || description.includes(trimmedQuery);
        });
    };

    return (
        <Spotlight
            actions={actions}
            filter={filterActions}
            nothingFound="No concepts found..."
            limit={7}
            shortcut={["mod + K", "mod + P"]}
            searchProps={{
                rightSection: (
                    <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        search
                    </span>
                ),
                rightSectionPointerEvents: "none",
                placeholder: "Search concepts...",
            }}
            styles={{
                content: {
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "24px",
                },
                search: {
                    background: "transparent",
                    color: "var(--color-text)",
                    borderBottom: "1px solid var(--color-border)",
                    fontSize: "1.1rem",
                    padding: "20px",
                    paddingRight: "56px",
                },
                action: {
                    borderRadius: "12px",
                    margin: "4px 8px",
                },
            }}
        />
    );
}

export { spotlight };
