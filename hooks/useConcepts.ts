"use client";

import { useState } from "react";

export interface Concept {
  conceptId: number;
  title: string;
  description: string;
  moderationStatus: string;
  createdAt: string;
}

export function useConcepts() {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [concept, setConcept] = useState<Concept | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getAllConcepts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`${url}/concepts`);
      if (!res.ok) throw new Error("Failed to fetch concepts");

      const data = await res.json();
      setConcepts(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getConceptById = async (id: string | number) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`${url}/concepts/${id}`);
      if (!res.ok) throw new Error("Failed to fetch concept");

      const data = await res.json();
      setConcept(data);
      return data;
    } catch (err: any) {
      setConcept(null);
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { concepts, concept, isLoading, error, getAllConcepts, getConceptById };
}
