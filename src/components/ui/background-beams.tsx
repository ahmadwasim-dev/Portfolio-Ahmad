"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none -z-20",
        className
      )}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.25]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
            <stop offset="30%" stopColor="#818cf8" stopOpacity="1" />
            <stop offset="70%" stopColor="#c084fc" stopOpacity="1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
            <stop offset="30%" stopColor="#ec4899" stopOpacity="1" />
            <stop offset="70%" stopColor="#f472b6" stopOpacity="1" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-grad-3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Diagonal sweeping light lines */}
        <path
          d="M -100 150 L 1800 1100"
          stroke="url(#beam-grad-1)"
          strokeWidth="2.5"
          fill="none"
          className="animate-beam-flow-1"
        />
        <path
          d="M 300 -100 L 900 1300"
          stroke="url(#beam-grad-2)"
          strokeWidth="2"
          fill="none"
          className="animate-beam-flow-2"
        />
        <path
          d="M 1500 -100 L 500 1300"
          stroke="url(#beam-grad-3)"
          strokeWidth="3"
          fill="none"
          className="animate-beam-flow-3"
        />
        <path
          d="M -100 650 L 1900 250"
          stroke="url(#beam-grad-1)"
          strokeWidth="1.5"
          fill="none"
          className="animate-beam-flow-4"
        />
      </svg>
    </div>
  );
};
