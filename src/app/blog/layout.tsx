"use client"
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import Meteors from "@/components/ui/meteors";
import { ArrowLeft } from "lucide-react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col min-h-[100dvh] overflow-hidden bg-background text-foreground transition-colors duration-500">
      {/* Premium Aceternity-style Mesh Gradient & Grid Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
        {/* Animated Aurora Glows */}
        <div className="absolute -top-40 left-[-10%] w-[60%] h-[60%] bg-indigo-500/15 dark:bg-indigo-600/25 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute -bottom-40 right-[-10%] w-[60%] h-[60%] bg-fuchsia-500/15 dark:bg-purple-600/25 rounded-full blur-[160px] animate-pulse delay-1000"></div>
        <div className="absolute top-[30%] left-[25%] w-[40%] h-[40%] bg-cyan-400/5 dark:bg-cyan-500/10 rounded-full blur-[130px] animate-bounce-slow"></div>
        
        {/* Animated Grid & Dot Overlays */}
        <div className="absolute inset-0 bg-grid-lines"></div>
        <div className="absolute inset-0 bg-dot-grid"></div>
        
        {/* Spotlight Beam effect overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_80%)] opacity-85"></div>

        {/* Aceternity Meteors background animation */}
        <Meteors number={12} />
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto w-full py-16 sm:py-24">
        {/* Back Button */}
        <BlurFade delay={0.02}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 sm:mb-12 group cursor-pointer"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
          </Link>
        </BlurFade>

        {/* Content Container */}
        <div className="w-full relative z-10">
          {children}
        </div>
      </div>
    </main>
  );
}
