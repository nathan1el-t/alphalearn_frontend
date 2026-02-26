"use client";

import { Text, Tooltip, Stack, Title } from "@mantine/core";
import type { Concept } from "@/interfaces/interfaces";
import ContentCardShell from "@/components/common/contentCardShell";

interface ConceptCardProps extends Concept { }

export default function ConceptCard({
  publicId,
  title,
  description,
  createdAt,
}: ConceptCardProps) {
  return (
    <ContentCardShell
      href={`/concepts/${publicId}`}
      background="#1e1e2e"
      borderColor="rgba(255,255,255,0.05)"
      glow="radial-gradient(circle at top right, rgba(124, 58, 237, 0.15) 0%, transparent 70%)"
    >
      <Stack gap="md" h="100%" justify="space-between" className="relative z-10">
        <Stack gap="xs">
          <div className="flex justify-between items-start">
            <Text size="xs" fw={800} className="uppercase tracking-[0.25em] text-[var(--color-primary)] opacity-70">
              Concept
            </Text>
            <Tooltip label="Explore concept" position="top" withArrow>
              <span className="material-symbols-outlined text-white/20 group-hover:text-white/60 transition-colors text-lg">
                arrow_outward
              </span>
            </Tooltip>
          </div>

          <Title
            order={3}
            className="text-2xl font-extrabold tracking-tight leading-tight text-white group-hover:text-[var(--color-primary)] transition-colors"
          >
            {title}
          </Title>

          <Text size="sm" className="text-white/60 line-clamp-3 font-light leading-relaxed">
            {description}
          </Text>
        </Stack>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
            {new Date(createdAt).toLocaleDateString()}
          </span>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-[var(--color-primary)] opacity-30" />
            <div className="w-1 h-1 rounded-full bg-[var(--color-primary)] opacity-50" />
            <div className="w-1 h-1 rounded-full bg-[var(--color-primary)]" />
          </div>
        </div>
      </Stack>
    </ContentCardShell>
  );
}
