"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-background w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-100 items-center justify-center isolate z-0 min-h-[220px]">
        {/* Left conic gradient */}
        <motion.div
          initial={{ opacity: 0.3, width: "10rem" }}
          whileInView={{ opacity: 1, width: "20rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-36 overflow-visible w-[20rem] bg-gradient-conic from-sky-400 dark:from-indigo-500 via-transparent to-transparent text-white"
        >
          <div className="absolute w-[100%] left-0 bg-background h-24 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-20 h-[100%] left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right conic gradient */}
        <motion.div
          initial={{ opacity: 0.3, width: "10rem" }}
          whileInView={{ opacity: 1, width: "20rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-36 overflow-visible w-[20rem] bg-gradient-conic from-transparent via-transparent to-sky-400 dark:to-indigo-500 text-white"
        >
          <div className="absolute w-20 h-[100%] right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-background h-24 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Blur layers */}
        <div className="absolute top-1/2 h-24 w-full translate-y-4 bg-background blur-xl"></div>
        <div className="absolute top-1/2 z-50 h-24 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-20 w-[16rem] -translate-y-1/2 rounded-full bg-sky-400 dark:bg-indigo-500 opacity-40 blur-3xl"></div>

        {/* Inner light source */}
        <motion.div
          initial={{ width: "4rem" }}
          whileInView={{ width: "8rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-20 w-32 -translate-y-[3rem] rounded-full bg-sky-300 dark:bg-indigo-400 blur-2xl"
        ></motion.div>

        {/* Horizontal beam line */}
        <motion.div
          initial={{ width: "10rem" }}
          whileInView={{ width: "20rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[20rem] -translate-y-[3.5rem] bg-sky-400 dark:bg-indigo-400"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-24 w-full -translate-y-[7rem] bg-background"></div>
      </div>

      <div className="relative z-50 flex -translate-y-10 flex-col items-center px-5 w-full">
        {children}
      </div>
    </div>
  );
};
