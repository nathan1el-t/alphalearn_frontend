"use client";

import { useConcepts } from "@/hooks/useConcepts";
import { Button } from "@mantine/core";
import { Spotlight, spotlight, SpotlightActionData } from "@mantine/spotlight";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function ConceptsPage() {
  const { concepts, isLoading, error, getAllConcepts } = useConcepts();
  const router = useRouter();

  useEffect(() => {
    getAllConcepts();
  }, []);

  const goToConcept = (id: string | number) => {
    router.push(`/concepts/${id}`);
  };

  const actions: SpotlightActionData[] = concepts.map((concept) => ({
    id: String(concept.conceptId),
    label: concept.title,
    description: concept.description,
    onClick: () => goToConcept(concept.conceptId),
  }));

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button onClick={spotlight.open}>Search</Button>

      <Spotlight
        actions={actions}
        limit={7}
        searchProps={{
          placeholder: "Search...",
        }}
      />

      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Concepts
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {concepts.map((concept) => (
          <Link
            key={concept.conceptId}
            href={`/concepts/${concept.conceptId}`}
            className="border rounded-lg p-4 shadow hover:shadow-lg hover:cursor-pointer transition-shadow duration-300 bg-white block"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              {concept.title}
            </h2>
            <p className="text-gray-600">{concept.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
