"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import React from "react"

interface ResumeCardProps {
  logoUrl: string
  altText: string
  title: string
  subtitle?: string
  href?: string
  badges?: readonly string[]
  period: string
  description?: string
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault()
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <Link href={href || "#"} className="block cursor-pointer" onClick={handleClick}>
      <Card className="flex bg-white border-none shadow-sm rounded-2xl p-6 transition-all duration-300 hover:shadow-md">
        <div className="flex-none">
          <Avatar className="size-16 bg-gray-100 rounded-xl border-none">
            <AvatarImage src={logoUrl || "/placeholder.svg"} alt={altText} className="object-contain p-2" />
            <AvatarFallback className="text-xl font-semibold rounded-xl text-gray-700 bg-gray-100">
              {altText[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-grow ml-5 flex-col group">
          <CardHeader className="p-0">
            <div className="flex items-start justify-between gap-x-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg leading-tight text-gray-900 group-hover:text-gray-700 transition-colors duration-300 mb-2">
                  {title}
                  {badges && (
                    <span className="inline-flex gap-x-2 ml-3">
                      {badges.map((badge, index) => (
                        <span
                          className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700"
                          key={index}
                        >
                          {badge}
                        </span>
                      ))}
                    </span>
                  )}
                </h3>
                {subtitle && (
                  <div className="text-base text-gray-600 leading-relaxed">
                    {subtitle}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                  {period}
                </span>
                <ChevronRightIcon
                  className={cn(
                    "size-5 text-gray-400 transform transition-all duration-300",
                    isExpanded ? "rotate-90" : "rotate-0 group-hover:translate-x-0.5",
                  )}
                />
              </div>
            </div>
          </CardHeader>

          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden mt-3"
            >
              <div className="text-base text-gray-600 leading-relaxed">
                {description}
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </Link>
  )
}
