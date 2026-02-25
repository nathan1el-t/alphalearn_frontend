import Link from "next/link";
import { Card, Stack, Title, Text, Group } from "@mantine/core";
import type { Concept } from "@/interfaces/interfaces";

interface ConceptCardProps extends Concept { }

export default function ConceptCard({
  conceptId,
  title,
  description,
  createdAt,
}: ConceptCardProps) {
  return (
    <Link href={`/concepts/${conceptId}`} className="relative block no-underline h-full group">
      {/* 1. PERMANENT HALO: A subtle purple glow behind the card at all times */}
      <div className="absolute -inset-2 bg-purple-600/10 rounded-[2.5rem] blur-2xl group-hover:bg-purple-600/30 group-hover:blur-3xl transition-all duration-500 pointer-events-none" />

      <Card
        padding="xl"
        radius="28px"
        className="relative overflow-hidden h-full transition-all duration-500 border-none group-hover:-translate-y-2"
        style={{
          background: "#2a2a3d",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 10px 30px -10px rgba(0,0,0,0.5)",
        }}
      >
        {/* 2. CONSTANT INNER BLOOM */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none opacity-40 group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle at center, rgba(168, 85, 247, 0.25) 0%, transparent 85%)",
          }}
        />

        {/* 3. SHARP NEON EDGE */}
        <div className="absolute inset-0 rounded-[28px] border border-purple-400/20 group-hover:border-purple-400/60 transition-all duration-500 pointer-events-none" />

        <Stack gap="xl" h="100%" justify="space-between" className="relative z-10">
          <Group justify="space-between" align="flex-start">
            <Stack gap={2}>
              <Text size="xs" fw={800} className="uppercase tracking-[0.25em] text-purple-200/50 group-hover:text-purple-200 transition-colors">
                Concept
              </Text>
              <Group gap={8} className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                <span>{new Date(createdAt).toLocaleDateString()}</span>
              </Group>
            </Stack>

            {/* NE Arrow */}
          </Group>

          {/* Large, High-Contrast Title */}
          <Title
            order={3}
            className="text-[2rem] font-extrabold tracking-tight leading-[1.05] text-white group-hover:text-purple-50 transition-colors"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          >
            {title}
          </Title>

          {/* Description snippet */}
          <Text
            size="sm"
            className="line-clamp-2 leading-relaxed text-white/50 group-hover:text-white/70 transition-colors"
          >
            {description}
          </Text>
        </Stack>
      </Card>
    </Link>
  );
}
