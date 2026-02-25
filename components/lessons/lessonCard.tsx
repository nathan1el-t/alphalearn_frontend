import Link from "next/link";
import { Card, Group, Stack, Title, Text } from "@mantine/core";
import type { LessonSummary } from "@/interfaces/interfaces";

interface LessonCardProps extends LessonSummary { }

export default function LessonCard({
  lessonId,
  title,
  contributorId,
  createdAt,
}: LessonCardProps) {

  return (
    <Link href={`/lessons/${lessonId}`} className="relative block no-underline h-full group">
      {/* 1. PERMANENT HALO: A subtle purple glow behind the card at all times */}
      <div className="absolute -inset-2 bg-purple-600/10 rounded-[2.5rem] blur-2xl group-hover:bg-purple-600/30 group-hover:blur-3xl transition-all duration-500 pointer-events-none" />

      <Card
        padding="xl"
        radius="28px" // Deep rounded corners like reference
        className="relative overflow-hidden h-full transition-all duration-500 border-none group-hover:-translate-y-2"
        style={{
          // BRIGHTER BASE: Switched from near-black to a visible Indigo-Slate
          background: "#2a2a3d", 
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 10px 30px -10px rgba(0,0,0,0.5)",
        }}
      >
        {/* 2. CONSTANT INNER BLOOM: The card center is always slightly illuminated */}
        <div 
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none opacity-40 group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle at center, rgba(168, 85, 247, 0.25) 0%, transparent 85%)",
          }}
        />

        {/* 3. SHARP NEON EDGE: Always visible but gets brighter on hover */}
        <div className="absolute inset-0 rounded-[28px] border border-purple-400/20 group-hover:border-purple-400/60 transition-all duration-500 pointer-events-none" />

        <Stack gap="xl" h="100%" justify="space-between" className="relative z-10">
          <Group justify="space-between" align="flex-start">
            <Stack gap={2}>
              <Text size="xs" fw={800} className="uppercase tracking-[0.25em] text-purple-200/50 group-hover:text-purple-200 transition-colors">
                Lesson
              </Text>
              <Group gap={8} className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                <span>{new Date(createdAt).toLocaleDateString()}</span>
                <span className="text-purple-500">•</span>
                <span>{contributorId.split("-")[0]}</span>
              </Group>
            </Stack>

            {/* NE Arrow from Reference */}
            <span className="material-symbols-outlined text-[32px] text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              north_east
            </span>
          </Group>

          {/* Large, High-Contrast Title */}
          <Title
            order={3}
            className="text-[2.4rem] font-extrabold tracking-tight leading-[1.05] text-white group-hover:text-purple-50 transition-colors"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          >
            {title}
          </Title>
        </Stack>
      </Card>
    </Link>
  );
}