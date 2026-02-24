import Link from "next/link";
import { Card, Badge, Group, Stack, Title } from "@mantine/core";
import type { LessonSummary } from "@/interfaces/interfaces";

interface LessonCardProps extends LessonSummary { }

export default function LessonCard({
  lessonId,
  title,
  contributorId,
  createdAt,
}: LessonCardProps) {



  return (
    <Link href={`/lessons/${lessonId}`} className="block no-underline h-full group">
      <Card
        padding="xl"
        radius="lg"
        className="relative overflow-hidden h-full transition-all duration-500 hover:-translate-y-2"
        style={{
          background: "var(--color-card-bg)",
          border: "1px solid var(--color-card-border)",
          boxShadow: "var(--color-card-shadow)",
        }}
      >
        {/* Animated Gradient Border on Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(to bottom right, color-mix(in srgb, var(--color-card-accent) 20%, transparent), transparent)",
          }}
        />

        <Stack gap="md" h="100%" justify="space-between" className="relative z-10">
          <Stack gap="sm">
            <Group justify="space-between" align="center">

              {/* Glowing Arrow Icon */}
              <span
                className="material-symbols-outlined text-[20px] transition-all duration-300 transform group-hover:translate-x-1"
                style={{ color: "var(--color-card-accent)" }}
              >
                arrow_forward
              </span>
            </Group>

            <Title
              order={3}
              style={{ color: "var(--color-card-text)" }}
              className="text-[1.15rem] font-bold leading-tight line-clamp-2 min-h-[3rem]"
            >
              {title}
            </Title>
          </Stack>

          <Stack gap="xs">
            {/* Cleaner Divider */}
            <div
              className="h-px w-full opacity-20"
              style={{ background: "linear-gradient(to right, var(--color-card-border), var(--color-card-accent), transparent)" }}
            />

            <Group justify="space-between" className="text-[11px] font-medium" style={{ color: "var(--color-card-text-muted)" }}>
              <Group gap={6}>
                <span className="material-symbols-outlined text-[14px]">face</span>
                <span className="group-hover:text-[var(--color-card-text)] transition-colors">{contributorId.split("-")[0]}</span>
              </Group>

              <Group gap={6}>
                <span className="material-symbols-outlined text-[14px]">event</span>
                <span>{new Date(createdAt).toLocaleDateString()}</span>
              </Group>
            </Group>
          </Stack>
        </Stack>
      </Card>
    </Link>
  );
}