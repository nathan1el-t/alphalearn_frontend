import { notFound } from "next/navigation";

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ concept: string }>;
}) {
// this will be changed when the fetch by concept id is created
  const allowed = [1, 2, 3, 4, 5];
  const { concept } = await params;
  if (allowed.includes(Number(concept))) return <h1>{concept}</h1>;
  notFound();
}
