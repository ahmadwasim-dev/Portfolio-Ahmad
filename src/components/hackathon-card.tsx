import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Props {
  title: string
  description: string
  dates: string
  location: string
  image?: string
  links?: readonly {
    icon: React.ReactNode
    title: string
    href: string
  }[]
}

export function HackathonCard({ title, description, dates, location, image, links }: Props) {
  return (
    <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border border-border/20 hover:border-border/40 transition-all duration-200">
      <Avatar className="size-12 sm:size-14 md:size-16 border rounded-full flex-shrink-0">
        <AvatarImage src={image || "/placeholder.svg"} alt={title} className="object-cover" />
        <AvatarFallback className="font-bold text-sm sm:text-base md:text-lg">
          {title[0]}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-1 sm:mb-2">
          <h2 className="font-bold text-base sm:text-lg leading-tight break-words">
            {title}
          </h2>
          {dates && (
            <time className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
              {dates}
            </time>
          )}
        </div>

        {location && (
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="break-words">{location}</span>
          </p>
        )}

        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-2 sm:mb-3">
            {description}
          </p>
        )}

        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1.5 sm:gap-2">
            {links?.map((link, idx) => (
              <Link href={link.href} key={idx}>
                <Badge
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-black text-white hover:bg-black/90"
                  title={link.title}
                >
                  {link.icon}
                  <span className="hidden xs:inline">{link.title}</span>
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
