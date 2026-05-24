"use client"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function Meteors({ number = 15 }: { number?: number }) {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([])

  useEffect(() => {
    const styles = Array.from({ length: number }).map(() => ({
      top: "-10px",
      left: Math.floor(Math.random() * 100) + "vw",
      animationDelay: (Math.random() * 8).toFixed(1) + "s",
      animationDuration: (Math.random() * 6 + 4).toFixed(1) + "s",
    }))
    setMeteorStyles(styles)
  }, [number])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={cn(
            "animate-meteor absolute size-0.5 rounded-full bg-indigo-400 dark:bg-indigo-300 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[60px] before:h-[1px] before:bg-gradient-to-r before:from-indigo-400 before:to-transparent"
          )}
          style={style}
        />
      ))}
    </div>
  )
}
