import { notFound } from "next/navigation";
import BackButton from "@/components/backButton";
import type { Concept } from "@/interfaces/interfaces";
import { apiFetch } from "@/lib/api";


export default async function ConceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) notFound();

  const concept:Concept = await apiFetch<Concept>(`/concepts/${id}`);

  return (
    
    <div className="max-w-3xl mx-auto p-6">
      <BackButton/>
      <h1 className="text-3xl font-bold my-4">{concept.title}</h1>
      <p className="text-gray-700">{concept.description}</p>
    </div>
  );
}
