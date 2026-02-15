"use client";

import { useConcepts } from "@/hooks/useConcepts";
import { Button } from "@mantine/core";
import { Spotlight, spotlight, SpotlightActionData } from "@mantine/spotlight";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

export default function ConceptsPage() {
  const { concepts, isLoading, error, getAllConcepts } = useConcepts();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllConcepts();
  }, []);

  const goToConcept = (id: string | number) => {
    router.push(`/concepts/${id}`);
  };

  const handleSpotlightAction = (conceptId: string | number) => {
    spotlight.close();
    goToConcept(conceptId);
  };

  const actions: SpotlightActionData[] = concepts.map((concept) => ({
    id: String(concept.conceptId),
    label: concept.title,
    description: concept.description,
    onClick: () => handleSpotlightAction(concept.conceptId),
  }));

  const totalPages = Math.ceil(concepts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedConcepts = concepts.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading)
    return (
      <main className="flex-1 flex items-center justify-center bg-[#0F0F14]">
        <div className="text-white/50 text-sm">Loading concepts...</div>
      </main>
    );

  if (error)
    return (
      <main className="flex-1 flex items-center justify-center bg-[#0F0F14]">
        <div className="text-red-500 text-sm">Error: {error}</div>
      </main>
    );

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      <Spotlight
        actions={actions}
        limit={7}
        nothingFound="No concepts found"
        highlightQuery
        searchProps={{
          placeholder: "Search concepts...",
        }}
        shortcut={["mod + K", "ctrl + k"]}
      />

      {/* Top Bar - Scaled down */}
      <header className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-[#0F0F14]/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex-1 max-w-lg">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2EFFB4] transition-colors text-[18px]">
              search
            </span>
            <input
              className="w-full bg-[#181826] border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-[#2EFFB4]/50 placeholder:text-white/30 transition-all text-white cursor-pointer"
              placeholder="Search concepts (e.g. Rizz, Sigma...)"
              type="text"
              onClick={spotlight.open}
              readOnly
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-orange-500/10 text-orange-500 px-3 py-1.5 rounded-full border border-orange-500/20 font-bold text-xs">
              <span className="material-symbols-outlined text-sm">
                local_fire_department
              </span>
              15 DAY STREAK
            </div>
            <div className="flex items-center gap-1 bg-[#7C5CFF]/10 text-[#7C5CFF] px-3 py-1.5 rounded-full border border-[#7C5CFF]/20 font-bold text-xs">
              <span className="material-symbols-outlined text-sm">stars</span>
              4,200 XP
            </div>
          </div>

          <div className="flex items-center gap-2 pl-4 border-l border-white/10">
            <div className="text-right">
              <p className="text-xs font-bold text-white">rubik</p>
              <p className="text-[8px] text-white/40 uppercase tracking-widest font-semibold">
                Contributor
              </p>
            </div>
            <div className="size-8 rounded-full bg-[#7C5CFF] flex items-center justify-center border-2 border-[#2EFFB4] text-white font-bold text-xs">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {/* Page Header & Filters */}
        <div className="mb-6 flex flex-col gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-1 text-white">
              Browse Concepts
            </h2>
            <p className="text-white/50 text-sm">
              Stay cracked at internet culture and never miss a beat.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 rounded-full bg-[#181826] text-white/60 hover:text-white hover:bg-white/5 font-bold text-xs transition-all border border-white/5">
              All
            </button>
            <button className="px-4 py-1.5 rounded-full bg-[#181826] text-white/60 hover:text-white hover:bg-white/5 font-bold text-xs transition-all border border-white/5">
              Slang
            </button>
            <button className="px-4 py-1.5 rounded-full bg-[#181826] text-white/60 hover:text-white hover:bg-white/5 font-bold text-xs transition-all border border-white/5">
              Memes
            </button>
            <button className="px-4 py-1.5 rounded-full bg-[#181826] text-white/60 hover:text-white hover:bg-white/5 font-bold text-xs transition-all border border-white/5">
              Behaviors
            </button>
          </div>
        </div>

        {/* Concept Grid - Scaled down */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
          {paginatedConcepts.map((concept) => (
            <Link
              key={concept.conceptId}
              href={`/concepts/${concept.conceptId}`}
              className="concept-card bg-[#181826] rounded-xl p-4 border border-white/5 flex gap-3 hover:shadow-[0_0_20px_rgba(46,255,180,0.15)] hover:-translate-y-0.5 transition-all duration-300"
            >

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-[#7C5CFF] bg-[#7C5CFF]/10 px-1.5 py-0.5 rounded-sm">
                    {concept.moderationStatus}
                  </span>
                  <span className="material-symbols-outlined text-white/20 hover:text-white cursor-pointer transition-colors text-[16px]">
                    bookmark
                  </span>
                </div>

                <h3 className="text-lg font-extrabold mb-1 text-white">
                  {concept.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed mb-2 line-clamp-2">
                  {concept.description}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-medium">
                  {/* <span className="flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">
                      visibility
                    </span>{" "}
                    {Math.floor(Math.random() * 200)}k views
                  </span>
                  <span>•</span> */}
                  <span className="ml-auto">
                    Updated {new Date(concept.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer / Pagination Area */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div className="text-xs text-white/40 font-medium">
            Showing {startIndex + 1} to {Math.min(endIndex, concepts.length)} of {concepts.length} concepts
          </div>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="size-8 rounded-lg bg-[#181826] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`size-8 rounded-lg font-bold text-sm flex items-center justify-center transition-all ${
                  currentPage === page
                    ? "bg-[#2EFFB4] text-[#0F0F14]"
                    : "bg-[#181826] border border-white/5 text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="size-8 rounded-lg bg-[#181826] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}