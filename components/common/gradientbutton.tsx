"use client"

import { Button } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";

interface GradientButtonProps {
  href: string;
  children: ReactNode;
  icon?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function GradientButton({
  href,
  children,
  icon,
  size = "lg",
  className = "",
}: GradientButtonProps) {
  return (
    <Link href={href} className="no-underline">
      <div className="relative group w-fit">
        {/* 1. THE UNDER-GLOW 
            Matches your purple/pink gradient but blurred out.
        */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7c3aed] to-[#e755f7] rounded-full blur-md opacity-0 group-hover:opacity-60 transition duration-500" />

        <Button
          variant="gradient"
          size={size}
          radius="xl"
          leftSection={
            icon ? (
              <span className="material-symbols-outlined text-[20px] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                {icon}
              </span>
            ) : undefined
          }
          gradient={{
            from: "#7c3aed",
            to: "#e755f7",
            deg: 90,
          }}
          className={`
            relative overflow-hidden transition-all duration-300 
            hover:scale-[1.03] active:scale-95
            before:absolute before:top-0 before:-left-full before:w-full before:h-full 
            before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent 
            before:transition-all before:duration-500 hover:before:left-full
            ${className}
          `}
        >
          <span className="relative z-10">{children}</span>
        </Button>
      </div>
    </Link>
  );
}