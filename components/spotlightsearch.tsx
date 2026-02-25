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

    const actions: SpotlightActionData[] = lessons.map((lesson, index) => {
        const id = lesson.lessonId || (lesson as any).lessonPublicId || (lesson as any).id || String(index);
        const contributor = lesson.contributorId || (lesson as any).author?.username || "Auth";

        return {
            id,
            label: lesson.title,
            description: `By ${String(contributor).split("-")[0]}`,
            onClick: () => router.push(`/lessons/${id}`),
            leftSection: (
                <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ color: "var(--color-primary)" }}
                >
                    auto_stories
                </span>
            ),
        };
    });

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
