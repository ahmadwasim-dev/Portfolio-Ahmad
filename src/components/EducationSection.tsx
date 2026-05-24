"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BlurFade from "@/components/magicui/blur-fade"
import type { IData } from "@/models/DataModel"

interface EducationSectionProps {
  data: IData
  delay: number
}

export default function EducationSection({ data, delay }: EducationSectionProps) {
  return (
    <section id="education" className="scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={delay * 12}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
            Education
          </h2>
        </BlurFade>
        
        <div className="space-y-6 sm:space-y-8">
          {data.education.map((education, id) => (
            <BlurFade key={education.school} delay={delay * 13 + id * 0.1}>
              <div className="flex items-start gap-3 sm:gap-4">
                <Avatar className="size-10 sm:size-12 border flex-shrink-0">
                  <AvatarImage
                    alt={education.school}
                    src={education.logoUrl.url}
                  />
                  <AvatarFallback>{education.school[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <a 
                      href={education.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-semibold hover:underline inline-flex items-center gap-1 group"
                    >
                      <span className="break-words">{education.school}</span>
                      <svg 
                        className="size-3.5 sm:size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{education.start} - {education.end}</span>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1">{education.degree}</p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
