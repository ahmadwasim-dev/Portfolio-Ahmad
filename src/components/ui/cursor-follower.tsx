"use client"
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CursorFollower() {
  const [mounted, setMounted] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [hovered, setHovered] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    setMounted(true)
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setHidden(false)
      
      // Check if target is a link, button, or clickable
      const target = e.target as HTMLElement
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.classList.contains("cursor-pointer") ||
          window.getComputedStyle(target).cursor === "pointer")
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [cursorX, cursorY])

  if (!mounted || hidden) return null

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center border transition-colors duration-200"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: hovered ? 48 : 12,
        height: hovered ? 48 : 12,
        backgroundColor: hovered ? "rgba(99, 102, 241, 0.05)" : "rgb(99, 102, 241)",
        borderColor: hovered ? "rgb(99, 102, 241)" : "transparent",
        translateX: hovered ? -24 : -6,
        translateY: hovered ? -24 : -6,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
    >
      {hovered && (
        <div className="size-1.5 rounded-full bg-indigo-500" />
      )}
    </motion.div>
  )
}
