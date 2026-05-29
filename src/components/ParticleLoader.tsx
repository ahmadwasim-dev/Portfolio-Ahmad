"use client";

import React, { useEffect, useState, useRef } from "react";

const BG_COLOR = "#edeae2";
const TEXT_COLOR = "#1a1816";

export const ParticleLoader = () => {
  const [progress, setProgress] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [done, setDone] = useState(false);

  const moonRef = useRef<HTMLDivElement>(null);
  const bcRef = useRef<HTMLCanvasElement>(null);
  const ccRef = useRef<HTMLCanvasElement>(null);
  const ctRef = useRef<HTMLDivElement>(null);
  const cbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setup canvas
    const bc = bcRef.current;
    const cc = ccRef.current;
    if (!bc || !cc) return;

    bc.width = cc.width = window.innerWidth;
    bc.height = cc.height = window.innerHeight;

    const bx = bc.getContext("2d");
    const cx = cc.getContext("2d");
    if (!bx || !cx) return;

    // Progress animation
    let pct = 0;
    const tick = setInterval(() => {
      const spd =
        pct < 60 ? 1.4 + Math.random() * 1.6 : pct < 85 ? 0.5 + Math.random() * 0.9 : 0.2 + Math.random() * 0.3;
      pct = Math.min(pct + spd, 100);
      setProgress(Math.floor(pct));

      if (pct >= 100) {
        clearInterval(tick);
        setDone(true);
        setTimeout(() => setShowBtn(true), 500);
      }
    }, 75);

    // Mouse tracking
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    const trail: { x: number; y: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      trail.push({ x: mx, y: my });
      if (trail.length > 22) trail.shift();
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let raf: number;
    const loop = () => {
      cx.clearRect(0, 0, cc.width, cc.height);

      // Draw cursor trail
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const f = i / trail.length;
        const a = Math.pow(f, 2) * 0.38;
        const r = (2 + f * 9) * 2.2;
        const g = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, `rgba(26,24,22,${a})`);
        g.addColorStop(1, "rgba(26,24,22,0)");
        cx.beginPath();
        cx.arc(p.x, p.y, r, 0, Math.PI * 2);
        cx.fillStyle = g;
        cx.fill();
      }

      // Draw cursor dot
      cx.beginPath();
      cx.arc(mx, my, 5, 0, Math.PI * 2);
      cx.fillStyle = TEXT_COLOR;
      cx.fill();

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      clearInterval(tick);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleEnter = () => {
    if (!done) return;
    if (ctRef.current && cbRef.current) {
      ctRef.current.style.transform = "translateY(-100%)";
      cbRef.current.style.transform = "translateY(100%)";
    }
    setTimeout(() => {
      const loader = document.querySelector("[data-loader]");
      if (loader?.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 1500);
  };

  return (
    <div
      data-loader
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: BG_COLOR,
        cursor: "none",
        overflow: "hidden",
      }}
    >
      {/* Curtains */}
      <div
        ref={ctRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "50%",
          background: BG_COLOR,
          zIndex: 50,
          transform: "translateY(0)",
          transition: "transform 1.15s cubic-bezier(.77,0,.175,1)",
        }}
      />
      <div
        ref={cbRef}
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "50%",
          background: BG_COLOR,
          zIndex: 50,
          transform: "translateY(0)",
          transition: "transform 1.15s cubic-bezier(.77,0,.175,1)",
        }}
      />

      {/* Canvases */}
      <canvas
        ref={bcRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 109,
        }}
      />
      <canvas
        ref={ccRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 500,
        }}
      />

      {/* Moon */}
      <div
        ref={moonRef}
        style={{
          position: "fixed",
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          background: `radial-gradient(circle at 40% 40%,
            rgba(220,215,202,.75) 0%,
            rgba(210,205,192,.5) 30%,
            rgba(225,220,210,.22) 60%,
            transparent 80%)`,
          boxShadow: `0 0 0 1px rgba(155,150,138,.2),
            0 0 32px 10px rgba(190,185,172,.16),
            inset -6px -5px 14px rgba(175,170,158,.1)`,
          left: "50%",
          top: "30%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 110,
          opacity: 1,
          animation: "fadeIn 2s ease 0.12s forwards",
        }}
      />

      {/* Top label */}
      <div
        style={{
          position: "fixed",
          top: "42px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "10px",
          fontWeight: 300,
          letterSpacing: ".6em",
          color: "#9c9890",
          textTransform: "uppercase",
          pointerEvents: "none",
          zIndex: 110,
          opacity: 1,
          animation: "fadeIn 1.4s ease 0.32s forwards",
        }}
      >
        Portfolio — Ahmad
      </div>

      {/* Mountain terrain */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{
          position: "fixed",
          width: "100%",
          top: "58%",
          pointerEvents: "none",
          zIndex: 108,
          opacity: 1,
          animation: "fadeIn 1.6s ease 0.38s forwards",
        }}
      >
        <defs>
          <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8c4bb" stopOpacity="1" />
            <stop offset="100%" stopColor="#edeae2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,320 L0,240 L40,238 L80,230 L120,235 L155,210 L178,215 L210,185 L228,192 L248,158 L264,165 L280,138 L295,144 L310,115 L322,120 L334,100 L346,106 L358,118 L370,113 L388,135 L415,130 L445,145 L472,139 L500,155 L525,149 L548,142 L568,148 L586,135 L605,120 L620,127 L634,110 L648,116 L662,98 L674,104 L686,86 L696,91 L706,75 L714,80 L722,68 L730,73 L738,82 L746,77 L756,65 L764,70 L776,85 L790,79 L808,94 L828,88 L852,104 L876,98 L900,112 L924,106 L950,122 L974,116 L998,130 L1020,124 L1044,114 L1066,120 L1086,106 L1102,112 L1118,96 L1132,102 L1148,115 L1164,109 L1182,124 L1204,118 L1230,133 L1256,127 L1282,142 L1308,136 L1338,150 L1368,144 L1404,158 L1440,152 L1440,320 Z"
          fill="url(#mg)"
          opacity="0.5"
        />
        <path
          d="M0,240 L40,238 L80,230 L120,235 L155,210 L178,215 L210,185 L228,192 L248,158 L264,165 L280,138 L295,144 L310,115 L322,120 L334,100 L346,106 L358,118 L370,113 L388,135 L415,130 L445,145 L472,139 L500,155 L525,149 L548,142 L568,148 L586,135 L605,120 L620,127 L634,110 L648,116 L662,98 L674,104 L686,86 L696,91 L706,75 L714,80 L722,68 L730,73 L738,82 L746,77 L756,65 L764,70 L776,85 L790,79 L808,94 L828,88 L852,104 L876,98 L900,112 L924,106 L950,122 L974,116 L998,130 L1020,124 L1044,114 L1066,120 L1086,106 L1102,112 L1118,96 L1132,102 L1148,115 L1164,109 L1182,124 L1204,118 L1230,133 L1256,127 L1282,142 L1308,136 L1338,150 L1368,144 L1404,158 L1440,152"
          fill="none"
          stroke="#b0aca3"
          strokeWidth="1.2"
          style={{
            strokeDasharray: "3800",
            strokeDashoffset: "3800",
            animation: "ridgeDraw 5s cubic-bezier(.4,0,.2,1) 0.38s forwards",
          }}
        />
      </svg>

      {/* Title */}
      <h1
        onClick={handleEnter}
        style={{
          position: "fixed",
          left: "50%",
          top: "58%",
          transform: "translateX(-50%) translateY(-100%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(80px, 13vw, 172px)",
          letterSpacing: ".04em",
          color: TEXT_COLOR,
          cursor: "pointer",
          whiteSpace: "nowrap",
          margin: 0,
          padding: 0,
          zIndex: 110,
          userSelect: "none",
          opacity: 1,
          animation: "fadeIn 1.3s ease 0.5s forwards",
        }}
      >
        AHMAD
      </h1>

      {/* Progress bar */}
      <div
        style={{
          position: "fixed",
          bottom: "36px",
          left: "48px",
          right: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 120,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            opacity: 1,
            animation: "fadeIn 1s ease 0.9s forwards",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "11px",
              fontWeight: 300,
              letterSpacing: ".22em",
              color: "#9c9890",
              minWidth: "26px",
            }}
          >
            {progress}
          </span>
          <div style={{ width: "200px", height: "1px", background: "#d4d0c7", position: "relative" }}>
            <div
              style={{
                height: "100%",
                background: TEXT_COLOR,
                width: `${progress}%`,
                transition: "width .07s linear",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-3.5px",
                left: `${progress}%`,
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: TEXT_COLOR,
                transform: "translateX(-50%)",
                transition: "left .07s linear",
              }}
            />
          </div>
        </div>

        <button
          onClick={handleEnter}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "10px",
            fontWeight: 300,
            letterSpacing: ".55em",
            color: "#9c9890",
            textTransform: "uppercase",
            opacity: showBtn ? 1 : 0,
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: "10px 0",
            transition: "opacity 1s ease, color .35s, letter-spacing .35s",
            pointerEvents: showBtn ? "auto" : "none",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.color = TEXT_COLOR;
            (e.target as HTMLElement).style.letterSpacing = ".7em";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.color = "#9c9890";
            (e.target as HTMLElement).style.letterSpacing = ".55em";
          }}
        >
          Click to Enter
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ridgeDraw {
          from { stroke-dashoffset: 3800; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};
