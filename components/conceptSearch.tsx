"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { Spotlight, spotlight, SpotlightActionData } from "@mantine/spotlight";

interface Concept {
  conceptId: number;
  title: string;
  description: string;
}

export default function ConceptSearch({ concepts }: { concepts: Concept[] }) {
  const router = useRouter();
  const [actions] = useState<SpotlightActionData[]>(
    concepts.map((concept) => ({
      id: String(concept.conceptId),
      label: concept.title,
      description: concept.description,
      onClick:()=>{router.push(`/concepts/${concept.conceptId}`)}
    }))
  );

  return (
    <>
      <Button onClick={spotlight.open}>Search</Button>
      <Spotlight actions={actions} limit={7} searchProps={{ placeholder: "Search..." }} />
    </>
  );
}
