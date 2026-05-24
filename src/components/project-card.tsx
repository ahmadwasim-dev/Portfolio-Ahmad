"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { BookOpen, ChevronRight } from "lucide-react"
import Markdown from "react-markdown"

interface Props {
  title: string
  href?: string
  description: string
  dates: string
  tags: readonly string[]
  link?: string
  video?: string
  links?: readonly {
    type: string
    link: string
  }[]
  className?: string
  projectId?: string
  hasCaseStudyVideo?: boolean // New prop to indicate if a case study video exists
}

const MAX_DESCRIPTION_LENGTH = 250
export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  video,
  links,
  className,
  projectId,
  hasCaseStudyVideo, // Destructure new prop
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false)
  const showReadMore = description.length > MAX_DESCRIPTION_LENGTH
  const displayedDescription =
    showReadMore && !isExpanded ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...` : description

  // Create a mutable array of links to display
  const displayLinks = [...(links || [])]

  // Check if a "Case Study" link already exists in the provided links
  const hasExistingCaseStudyLink = displayLinks.some((l) => l.type === "Case Study")

  // If a case study video exists and no "Case Study" link is already present, add it
  if (hasCaseStudyVideo && projectId && !hasExistingCaseStudyLink) {
    displayLinks.push({ type: "Case Study", link: `/projects/${projectId}` })
  }

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full rounded-lg bg-card/50 backdrop-blur-sm hover:border-primary/20",
        className,
      )}
    >
      <Link href={href || "#"} className="block cursor-pointer">
        {video && (
          <div className="overflow-hidden rounded-t-lg">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 w-full object-cover object-top transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {displayedDescription}
          </Markdown>
          {showReadMore && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-foreground hover:underline text-xs mt-1 flex items-center gap-1"
            >
              {isExpanded ? "Show Less" : "Read More"}
              <ChevronRight className={cn("size-3 transition-transform", isExpanded && "rotate-90")} />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge className="px-1 py-0 text-[10px]" variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {displayLinks.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-2 w-full">
            {displayLinks.map((linkItem, idx) => (
              <Link
                href={linkItem.type === "Case Study" ? `/projects/${projectId}` : linkItem.link}
                key={idx}
                target={linkItem.type === "Case Study" ? "_self" : "_blank"}
              >
                <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                  {linkItem.type === "Website" && <Icons.globe className="size-3" />}
                  {linkItem.type === "Source" && <Icons.github className="size-3" />}
                  {linkItem.type === "Case Study" && <BookOpen className="w-3 h-3" />}
                  {linkItem.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
