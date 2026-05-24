"use client";
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxHeroImagesProps {
  images: string[];
  className?: string;
}

export const ParallaxHeroImages = ({ images, className }: ParallaxHeroImagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useSpring(useMotionValue(0), { stiffness: 80, damping: 25 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 80, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      // Calculate normalized cursor position (-0.5 to 0.5) relative to the component container
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform depth modifiers for mouse shifts
  const translate1X = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const translate1Y = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

  const translate2X = useTransform(mouseX, [-0.5, 0.5], [-35, 35]);
  const translate2Y = useTransform(mouseY, [-0.5, 0.5], [-35, 35]);

  const translate3X = useTransform(mouseX, [-0.5, 0.5], [-55, 55]);
  const translate3Y = useTransform(mouseY, [-0.5, 0.5], [-55, 55]);

  const translate4X = useTransform(mouseX, [-0.5, 0.5], [-75, 75]);
  const translate4Y = useTransform(mouseY, [-0.5, 0.5], [-75, 75]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 opacity-70 dark:opacity-50",
        className
      )}
    >
      {/* Blur overlay to blend the parallax images */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_90%)] z-10" />

      {images.map((src, index) => {
        let translateX = translate1X;
        let translateY = translate1Y;
        let scale = 1.02;
        let posClass = "";
        let filterClass = "blur-[1.5px] opacity-20";

        if (index === 0) {
          translateX = translate1X;
          translateY = translate1Y;
          posClass = "top-[10%] left-[5%] w-32 h-20 sm:w-44 sm:h-28 md:w-56 md:h-36";
          scale = 1.05;
        } else if (index === 1) {
          translateX = translate2X;
          translateY = translate2Y;
          posClass = "bottom-[12%] left-[8%] w-28 h-18 sm:w-40 sm:h-24 md:w-52 md:h-32";
          scale = 1.1;
          filterClass = "blur-[0.5px] opacity-35";
        } else if (index === 2) {
          translateX = translate3X;
          translateY = translate3Y;
          posClass = "top-[8%] right-[8%] w-32 h-20 sm:w-44 sm:h-28 md:w-56 md:h-36";
          scale = 1.15;
          filterClass = "blur-[1px] opacity-25";
        } else {
          translateX = translate4X;
          translateY = translate4Y;
          posClass = "bottom-[10%] right-[5%] w-36 h-22 sm:w-48 sm:h-30 md:w-64 md:h-40";
          scale = 1.2;
          filterClass = "blur-none opacity-45";
        }

        return (
          <motion.div
            key={index}
            style={{
              x: translateX,
              y: translateY,
              scale,
            }}
            className={cn(
              "absolute rounded-xl overflow-hidden border border-border/40 shadow-2xl transition-all duration-300",
              posClass,
              filterClass
            )}
          >
            <img
              src={src}
              alt={`parallax-item-${index}`}
              className="w-full h-full object-contain p-6 bg-background/60 backdrop-blur-md"
              loading="lazy"
            />
          </motion.div>
        );
      })}
    </div>
  );
};
