import NotFound from "@/components/notFound";
import BackButton from "@/components/backButton";
import type { Concept } from "@/interfaces/interfaces";
import { apiFetch } from "@/lib/api";


export default async function ConceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <NotFound />;
  }

  let concept: Concept;
  try {
    concept = await apiFetch<Concept>(`/concepts/${id}`);
  } catch (error) {
    return <NotFound title="Concept Not Found" subtitle="This concept decided to ghost us 💀" />;
  }

  return (
    
    <div className="max-w-3xl mx-auto p-6">
      <BackButton/>
      <h1 className="text-3xl font-bold my-4">{concept.title}</h1>
      <p className="text-gray-700">{concept.description}</p>
    </div>
  );
}
