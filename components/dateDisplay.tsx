"use client";

import { useState, useEffect } from "react";
import { Text } from "@mantine/core";

interface DateDisplayProps {
  date: string;
}

export function DateDisplay({ date }: DateDisplayProps) {
  const [formatted, setFormatted] = useState<string>("");

  useEffect(() => {
    setFormatted(new Date(date).toLocaleDateString());
  }, [date]);

  if (!formatted) return null;

  return <Text>{formatted}</Text>;
}
