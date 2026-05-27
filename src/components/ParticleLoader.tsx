"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BG_COLOR = "#edeae2";
const TEXT_COLOR = "#1a1816";

interface Bird {
  id: number;
  delay: number;
}

const generateBirds = (): Bird[] => {
  return Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: [1500, 3200, 5000, 2400, 6500, 8000][i],
  }));
};

export const ParticleLoader = () => {
  const [stage, setStage] = useState<"loading" | "reveal" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null);
  const splitTopRef = useRef<HTMLDivElement>(null);
  const splitBotRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const birds = useMemo(() => generateBirds(), []);
  const cursorTrailRef = useRef<Array<{ x: number; y: number; age: number }>>([]);

  // Progress bar animation
  useEffect(() => {
    if (stage !== "loading") return;

    let pct = 0;
    const tick = setInterval(() => {
      const spd =
        pct < 60
          ? 1.3 + Math.random() * 1.7
          : pct < 85
          ? 0.5 + Math.random() * 0.9
          : 0.18 + Math.random() * 0.32;

      pct = Math.min(pct + spd, 100);
      setProgress(Math.floor(pct));

      if (pct >= 100) {
        clearInterval(tick);
        setTimeout(() => setShowEnter(true), 500);
      }
    }, 75);

    return () => clearInterval(tick);
  }, [stage]);

  // Reveal animation
  useEffect(() => {
    const t1 = setTimeout(() => {
      setStage("reveal");
    }, 8000); // Auto-reveal after 8 seconds

    return () => clearTimeout(t1);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorTrailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (cursorTrailRef.current.length > 18) cursorTrailRef.current.shift();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Canvas rendering
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;

    const handleResize = () => {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cursor canvas rendering
  useEffect(() => {
    const cursorCvs = cursorCanvasRef.current;
    if (!cursorCvs) return;

    const handleResize = () => {
      cursorCvs.width = window.innerWidth;
      cursorCvs.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const ctx = cursorCvs.getContext("2d");
    if (!ctx) return;

    const animationFrameId = requestAnimationFrame(function render() {
      ctx.clearRect(0, 0, cursorCvs.width, cursorCvs.height);

      // Draw trail
      for (let i = 0; i < cursorTrailRef.current.length; i++) {
        const pt = cursorTrailRef.current[i];
        const frac = i / cursorTrailRef.current.length;
        const alpha = Math.pow(frac, 1.8) * 0.45;
        const r = 3 + frac * 9;

        const grd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r * 2.5);
        grd.addColorStop(0, `rgba(26,24,22,${alpha})`);
        grd.addColorStop(0.4, `rgba(26,24,22,${alpha * 0.35})`);
        grd.addColorStop(1, "rgba(26,24,22,0)");

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Outer glow
      const og = ctx.createRadialGradient(
        mousePos.x,
        mousePos.y,
        6,
        mousePos.x,
        mousePos.y,
        22
      );
      og.addColorStop(0, "rgba(26,24,22,0.08)");
      og.addColorStop(1, "rgba(26,24,22,0)");
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 22, 0, Math.PI * 2);
      ctx.fillStyle = og;
      ctx.fill();

      // Main dot
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = TEXT_COLOR;
      ctx.fill();

      requestAnimationFrame(render);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mousePos]);

  const handleReveal = () => {
    if (stage !== "loading" || !showEnter) return;

    setStage("reveal");

    setTimeout(() => {
      if (splitTopRef.current && splitBotRef.current) {
        splitTopRef.current.style.transform = "translateY(-100%)";
        splitBotRef.current.style.transform = "translateY(100%)";
      }

      setTimeout(() => {
        setStage("done");
        if (loaderRef.current) {
          loaderRef.current.remove();
        }
      }, 1100);
    }, 220);
  };

  if (stage === "done") {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 overflow-hidden cursor-none"
      style={{ background: BG_COLOR }}
    >
      {/* Split screen panels */}
      <motion.div
        ref={splitTopRef}
        className="fixed left-0 top-0 w-full h-1/2 z-[99998]"
        style={{ background: BG_COLOR }}
        initial={{ transform: "translateY(0)" }}
        animate={stage === "reveal" ? { transform: "translateY(-100%)" } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.div
        ref={splitBotRef}
        className="fixed left-0 bottom-0 w-full h-1/2 z-[99998]"
        style={{ background: BG_COLOR }}
        initial={{ transform: "translateY(0)" }}
        animate={stage === "reveal" ? { transform: "translateY(100%)" } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Cursor canvas - always on top */}
      <canvas
        ref={cursorCanvasRef}
        className="fixed inset-0 pointer-events-none z-[999999]"
      />

      {/* Main content */}
      <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
        {/* Mountain terrain */}
        <motion.svg
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
          className="absolute w-full h-1/3 bottom-0 left-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.path
            d="M-10,200 L60,195 L100,188 L140,192 L175,168 L195,172 L230,145 L248,152 L268,118 L282,124 L295,105 L308,110 L322,88 L335,95 L348,112 L362,108 L378,130 L400,126 L430,138 L460,132 L488,148 L510,144 L535,158 L558,152 L578,142 L600,148 L618,132 L638,118 L652,124 L665,108 L678,114 L692,96 L704,102 L716,85 L726,90 L736,75 L745,80 L754,88 L764,82 L778,72 L790,78 L804,92 L820,86 L842,100 L865,94 L890,108 L915,104 L940,118 L962,112 L985,128 L1008,122 L1032,112 L1055,118 L1075,105 L1092,110 L1108,95 L1122,100 L1138,112 L1155,108 L1175,122 L1198,118 L1225,132 L1252,126 L1278,140 L1305,136 L1335,148 L1365,144 L1400,155 L1440,152 L1450,152"
            fill="none"
            stroke={TEXT_COLOR}
            strokeWidth="1"
            initial={{ strokeDasharray: 4000, strokeDashoffset: 4000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 5.2, delay: 0.4 }}
          />
        </motion.svg>

        {/* Moon */}
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle at 42% 42%, rgba(215,210,198,0.72), rgba(208,203,191,0.55) 25%, rgba(220,215,205,0.28) 55%, rgba(237,234,226,0))`,
            boxShadow: `
              0 0 0 1px rgba(160,155,143,0.22),
              0 0 28px 8px rgba(190,185,173,0.18),
              inset -8px -6px 18px rgba(180,175,162,0.12)
            `,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />

        {/* Title */}
        <motion.h1
          className="relative text-9xl font-black tracking-wider pointer-events-auto select-none z-10"
          style={{
            color: TEXT_COLOR,
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.04em",
            cursor: "none",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleReveal}
        >
          AHMAD
        </motion.h1>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-10 left-12 right-12 flex items-center justify-between"
          style={{ zIndex: 6 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <span
              className="text-xs font-light tracking-widest"
              style={{ color: "#9c9890", minWidth: "28px" }}
            >
              {progress}
            </span>
            <div className="w-28 h-px relative" style={{ background: "#d6d2c9" }}>
              <div
                className="h-full transition-all duration-75"
                style={{ width: `${progress}%`, background: TEXT_COLOR }}
              />
              <div
                className="absolute w-2 h-2 rounded-full -top-1.5 -translate-x-1/2 transition-all duration-75"
                style={{ left: `${progress}%`, background: TEXT_COLOR }}
              />
            </div>
          </div>

          <motion.button
            className="text-xs font-light tracking-widest border-none bg-none p-0"
            style={{ color: "#9c9890", cursor: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: showEnter ? 1 : 0 }}
            transition={{ duration: 1 }}
            onClick={handleReveal}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = TEXT_COLOR;
              (e.target as HTMLElement).style.letterSpacing = "0.17em";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "#9c9890";
              (e.target as HTMLElement).style.letterSpacing = "0.055em";
            }}
          >
            CLICK TO ENTER
          </motion.button>
        </motion.div>
      </div>

      {/* Canvas for birds */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />
    </div>
  );
};
