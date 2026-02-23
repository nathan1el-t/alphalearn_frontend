"use client";

import Link from "next/link";
import { Card, Badge, Text } from "@mantine/core";
import type { LessonSummary } from "@/interfaces/interfaces";
import { DateDisplay } from "../dateDisplay";

interface LessonCardProps extends LessonSummary { }

export default function LessonCard({
  lessonId,
  title,
  moderationStatus,
  contributorId,
  createdAt,
}: LessonCardProps) {
  return (
    <Card
      component={Link}
      href={`/lessons/${lessonId}`}
      padding="md"
      radius="xl"
      withBorder={false}
      style={{ backgroundColor: "var(--color-surface)" }}
      className="lesson-card border border-[var(--color-overlay)]
             hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <Badge
          color={moderationStatus === "Approved" ? "green" : "yellow"}
          size="sm"
        >
          {moderationStatus}
        </Badge>

        {/*temporarily removed, may add on next time*/}

        {/* <Tooltip label="Save for later" position="top" withArrow>
          <span className="material-symbols-outlined text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer transition-colors text-[16px]">
            bookmark
          </span>
        </Tooltip> */}
      </div>

      <Card.Section inheritPadding className="pb-4">
        <Text size="lg" className="mb-1 text-[var(--color-text)] line-clamp-2">
          {title}
        </Text>

        <div className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)] font-medium">
          <span className="ml-auto">Contributor: {contributorId}</span>
          <span>•</span>
          <DateDisplay date={createdAt} />
        </div>
      </Card.Section>

      <style jsx>{`
        :global(.lesson-card:hover) {
          border-color: var(--color-accent);
          box-shadow:
            0 0 5px var(--color-accent),
            0 0 20px var(--color-accent);
        }
      `}</style>
    </Card>
  );
}
