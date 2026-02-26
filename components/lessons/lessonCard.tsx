"use client";

import Link from "next/link";
import { Card, Group, Stack, Title, Text, Badge } from "@mantine/core";
import type { LessonSummary } from "@/interfaces/interfaces";

interface LessonCardProps extends LessonSummary { }

export default function LessonCard({
  lessonPublicId,
  title,
  moderationStatus,
  author,
  createdAt,
}: LessonCardProps) {
  return (
    <Card
      component={Link}
      href={`/lessons/${lessonPublicId}`}
      padding="xl"
      radius="28px"
      className="relative overflow-hidden h-full transition-all duration-500 border-none group-hover:-translate-y-2 group"
      style={{
        background: "#2a2a3d",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 10px 30px -10px rgba(0,0,0,0.5)",
      }}
    >
      {/* CONSTANT INNER BLOOM */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none opacity-40 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle at center, rgba(168, 85, 247, 0.25) 0%, transparent 85%)",
        }}
      />

      {/* SHARP NEON EDGE */}
      <div className="absolute inset-0 rounded-[28px] border border-purple-400/20 group-hover:border-purple-400/60 transition-all duration-500 pointer-events-none" />

      <Stack gap="xl" h="100%" justify="space-between" className="relative z-10">
        <Group justify="space-between" align="flex-start">
          <Stack gap={2}>
            <Text size="xs" fw={800} className="uppercase tracking-[0.25em] text-purple-200/50 group-hover:text-purple-200 transition-colors">
              Lesson
            </Text>
            <Group gap={8} className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
              <span>{createdAt ? new Date(createdAt).toLocaleDateString() : 'Recent'}</span>
              <span className="text-purple-500">•</span>
              <span>{author?.username || "Anonymous"}</span>
            </Group>
          </Stack>

          <Badge
            color={moderationStatus === "APPROVED" ? "green" : (moderationStatus === "REJECTED" ? "red" : "yellow")}
            size="sm"
            variant="filled"
          >
            {moderationStatus}
          </Badge>
        </Group>

        <Title
          order={3}
          className="text-2xl font-extrabold tracking-tight leading-[1.05] text-white group-hover:text-purple-50 transition-colors"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
        >
          {title}
        </Title>
      </Stack>
    </Card>
  );
}