"use client"

import { ProjectCard } from "@/components/project-card"
import BlurFade from "@/components/magicui/blur-fade"
import type { IData } from "@/models/DataModel"
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images"

interface ProjectsSectionProps {
  data: IData
  delay: number
}

const images = [
  "/turing.png",
  "https://cdn.worldvectorlogo.com/logos/fiverr-1.svg",
  "/upwork-icon.svg",
  "/freelance.png"
];

export default function ProjectsSection({ data, delay }: ProjectsSectionProps) {
  return (
    <section id="projects" className="scroll-mt-16 sm:scroll-mt-20 relative overflow-hidden rounded-3xl border border-border/30 bg-background/20 dark:bg-neutral-950/20 backdrop-blur-sm p-8 sm:p-12 md:p-16 my-8">
      {/* Parallax Hero Images Background */}
      <ParallaxHeroImages images={images} />

      <div className="max-w-6xl mx-auto relative z-10">
        <BlurFade delay={delay * 14}>
          <div className="text-center space-y-2 sm:space-y-4 mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground drop-shadow-sm">
              Latest Work
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4 drop-shadow-sm">
              A curated collection of my most impactful projects, showcasing innovation, technical excellence, and creative problem-solving. Move your mouse to see the parallax depth.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data.projects
            .slice()
            .reverse()
            .map((project, id) => (
              <BlurFade key={project.title} delay={delay * 15 + id * 0.05}>
                <ProjectCard
                  link={project.link}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  video={project.video.url}
                  links={project.links}
                  projectId={(project as any)._id}
                  hasCaseStudyVideo={!!project.caseStudy?.youtubeVideoUrl}
                />
              </BlurFade>
            ))}
        </div>
      </div>
    </section>
  )
}
