"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";

export default function BackButton({ href }: { href?: string }) {
  const router = useRouter();

  return (
    <Button
      my="lg"
      mx="md"
      onClick={() => {
        if (href) {
          router.push(href);
          return;
        }

        router.back();
      }}
    >
      Back
    </Button>
  );
}
