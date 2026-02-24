"use client";

import { Button } from "@mantine/core";
import { spotlight } from "@mantine/spotlight";

export default function SearchTrigger() {
    return (
        <Button
            variant="default"
            size="lg"
            radius="md"
            onClick={spotlight.open}
            leftSection={
                <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    search
                </span>
            }
            rightSection={
                <kbd
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                    style={{
                        background: "var(--color-card-border)",
                        color: "var(--color-card-text-muted)",
                        border: "1px solid var(--color-border)",
                    }}
                >
                    ⌘K
                </kbd>
            }
            styles={{
                root: {
                    background: "var(--color-card-bg)",
                    border: "1px solid var(--color-card-border)",
                    color: "var(--color-card-text-muted)",
                    minWidth: "220px",
                    justifyContent: "flex-start",
                },
            }}
            className="hover:border-[var(--color-card-accent)] transition-colors"
        >
            Search lessons...
        </Button>
    );
}
