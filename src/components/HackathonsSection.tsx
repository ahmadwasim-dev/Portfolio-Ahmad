"use client"

import { HackathonCard } from "@/components/hackathon-card"
import BlurFade from "@/components/magicui/blur-fade"
import type { IData } from "@/models/DataModel"

interface HackathonsSectionProps {
  data: IData
  delay: number
}

export default function HackathonsSection({ data, delay }: HackathonsSectionProps) {
  return (
    <section id="hackathons" className="scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={delay * 16}>
          <div className="text-center space-y-2 sm:space-y-4 mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Competitions
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
              My journey through competitive programming challenges and hackathons
            </p>
          </div>
        </BlurFade>
        
        {data.hackathons && data.hackathons.length > 0 ? (
          <div className="grid gap-4 sm:gap-6">
            {data.hackathons
              .slice()
              .reverse()
              .map((project, id) => (
                <BlurFade key={`${project.title}-${project.dates}`} delay={delay * 17 + id * 0.05}>
                  <HackathonCard
                    title={project.title}
                    description={project.description || ""}
                    location={project.location}
                    dates={project.dates}
                    image={project.image.url}
                  />
                </BlurFade>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-base text-muted-foreground">No competitions available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
