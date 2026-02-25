"use client";

import { useState, useEffect } from "react";
import { Tooltip } from "@mantine/core";

interface RelativeTimeProps {
  date: string;
  className?: string;
  showTooltip?: boolean;
}

/**
 * Calculate relative time from a date string
 * Returns: "just now", "5 mins ago", "2 hours ago", "3 days ago", etc.
 */
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSecs < 60) {
    return "just now";
  } else if (diffMins < 60) {
    return `${diffMins} min${diffMins === 1 ? "" : "s"} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks === 1 ? "" : "s"} ago`;
  } else {
    return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
  }
}

/**
 * Get urgency level based on how long something has been pending
 * Returns: "normal", "warning", "urgent", "critical"
 */
export function getUrgencyLevel(date: Date): "normal" | "warning" | "urgent" | "critical" {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours >= 168) { // 7 days
    return "critical";
  } else if (diffHours >= 72) { // 3 days
    return "urgent";
  } else if (diffHours >= 24) { // 1 day
    return "warning";
  }
  return "normal";
}

export function RelativeTime({ date, className, showTooltip = true }: RelativeTimeProps) {
  const [relativeTime, setRelativeTime] = useState<string>("");
  const [fullDate, setFullDate] = useState<string>("");

  useEffect(() => {
    const dateObj = new Date(date);
    setRelativeTime(getRelativeTime(dateObj));
    setFullDate(dateObj.toLocaleString());

    // Update relative time every minute
    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime(dateObj));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  if (!relativeTime) return null;

  const content = (
    <span className={className}>
      {relativeTime}
    </span>
  );

  if (showTooltip) {
    return (
      <Tooltip label={fullDate} position="top" withArrow>
        {content}
      </Tooltip>
    );
  }

  return content;
}
