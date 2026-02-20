"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button my="lg" mx="md" onClick={() => router.back()}>
      Back
    </Button>
  );
}
