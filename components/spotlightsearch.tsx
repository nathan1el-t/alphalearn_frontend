"use client";

import { useRouter } from "next/navigation";
import {
    Spotlight,
    SpotlightActionData,
    spotlight,
} from "@mantine/spotlight";
import type { LessonSummary } from "@/interfaces/interfaces";

interface SpotlightSearchProps {
    lessons: LessonSummary[];
}

export default function SpotlightSearch({ lessons }: SpotlightSearchProps) {
    const router = useRouter();

    const actions: SpotlightActionData[] = lessons.map((lesson) => ({
        id: lesson.lessonId,
        label: lesson.title,
        description: `By ${lesson.contributorId.split("-")[0]}`,
        onClick: () => router.push(`/lessons/${lesson.lessonId}`),
        leftSection: (
            <span
                className="material-symbols-outlined text-[22px]"
                style={{ color: "var(--color-card-accent)" }}
            >
                auto_stories
            </span>
        ),
    }));

    return (
        <Spotlight
            actions={actions}
            nothingFound="No lessons found..."
            highlightQuery
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
                placeholder: "Search lessons...",
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
