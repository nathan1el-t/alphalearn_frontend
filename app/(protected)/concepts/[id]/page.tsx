import { notFound } from "next/navigation";
import BackButton from "@/components/backButton";
import type { Concept } from "@/interfaces/interfaces";


export default async function ConceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) notFound();

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/concepts/${id}`, { cache: "no-store" });

  if (!res.ok) notFound();

  const concept: Concept = await res.json();

  return (
    
    <div className="max-w-3xl mx-auto p-6">
      <BackButton/>
      <h1 className="text-3xl font-bold my-4">{concept.title}</h1>
      <p className="text-gray-700">{concept.description}</p>
    </div>
  );
}
