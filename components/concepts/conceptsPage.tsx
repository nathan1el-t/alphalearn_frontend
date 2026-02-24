"use client";

import { useState } from "react";
import {
  Container,
  Text,
  Group,
  Stack,
  Title,
} from "@mantine/core";
import ConceptGrid from "./conceptGrid";
import Pagination from "./pagination";
import ConceptSpotlightSearch from "./conceptSpotlightSearch";
import SearchTrigger from "@/components/lessons/searchTrigger";
import type { Concept } from "@/interfaces/interfaces";

interface ConceptsPageProps {
  concepts: Concept[];
}

const ITEMS_PER_PAGE = 6;

export default function ConceptsPage({ concepts }: ConceptsPageProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const totalPages = Math.ceil(concepts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedConcepts = concepts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="min-h-screen bg-[var(--color-background)]">
        {/* Hero */}
        <div className="relative z-10 pt-20 pb-14 border-b border-[var(--color-border)]">
          <Container size="lg">
            <Stack gap="xl">
              <Stack gap="xs">
                {/* Eyebrow */}
                <Group gap="xs" align="center" className="mb-1">
                  <div className="w-5 h-px bg-[var(--color-primary)]" />
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-primary)]">
                    Knowledge Base
                  </span>
                </Group>

                <Title
                  order={1}
                  className="text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-tight leading-[1.1] text-[var(--color-text)]"
                >
                  Browse{" "}
                  <span className="text-[var(--color-primary)]">Concepts</span>
                </Title>

                <Text
                  size="lg"
                  className="text-[var(--color-text-secondary)] max-w-xl font-light leading-relaxed"
                >
                  Stay cracked at internet culture and never miss a beat.
                </Text>
              </Stack>

              <Group justify="flex-end" wrap="wrap" gap="sm">
                <SearchTrigger />
              </Group>
            </Stack>
          </Container>
        </div>

        {/* Grid */}
        <div className="relative z-10 py-14 pb-32">
          <Container size="lg">
            {concepts.length === 0 ? (
              <Stack align="center" py={100} gap="md">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-[var(--color-text-muted)]">
                    lightbulb
                  </span>
                </div>
                <Title
                  order={3}
                  className="text-[var(--color-text-muted)] font-semibold"
                >
                  No concepts yet
                </Title>
                <Text className="text-[var(--color-text-muted)] text-sm">
                  No concepts available yet. Check back soon!
                </Text>
              </Stack>
            ) : (
              <Stack gap="lg">
                <Group gap="md" align="center" justify="center">
                  <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--color-text-muted)]">
                    {concepts.length} {concepts.length === 1 ? "concept" : "concepts"}{" "}
                    available
                  </span>
                </Group>

                <ConceptGrid concepts={paginatedConcepts} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={concepts.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={handlePageChange}
                  />
                )}
              </Stack>
            )}
          </Container>
        </div>
      </div>

      {/* Spotlight Search */}
      <ConceptSpotlightSearch concepts={concepts} />
    </>
  );
}
