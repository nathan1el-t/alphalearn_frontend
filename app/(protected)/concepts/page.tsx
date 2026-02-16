import ConceptSearch from "@/components/conceptSearch";
import Link from "next/link";
import type { Concept } from "@/interfaces/interfaces";

export default async function ConceptsPage() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/concepts`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch concepts");
  }

  const concepts: Concept[] = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ConceptSearch concepts={concepts} />

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
