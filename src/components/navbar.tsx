'use client'
import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { useSelector } from "react-redux"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Dock, DockIcon } from "@/components/magicui/dock";

export default function Navbar() {
  const { loading } = useSelector((state: any) => state.PortfolioData);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return null;

  return (
    <TooltipProvider>
      <nav className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-auto"
      )}>
        <Dock className="bg-background/80 backdrop-blur-xl border border-border/40 shadow-lg px-4 py-2 flex items-center justify-center gap-1 sm:gap-2">
          {/* Logo */}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/" className="flex items-center justify-center size-10 rounded-full bg-foreground text-background font-bold text-sm hover:scale-110 transition-transform">
                  ah
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-foreground text-background border-none shadow-md px-2.5 py-1.5 rounded-lg">
                <p className="text-xs font-semibold">Home Page</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          {/* Divider */}
          <div className="h-6 w-px bg-border/40 self-center mx-1 flex-shrink-0" />

          {/* Navigation Items */}
          {DATA.navbar.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="flex items-center justify-center size-10 rounded-full hover:bg-muted transition-colors duration-200 w-full h-full text-foreground"
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-foreground text-background border-none shadow-md px-2.5 py-1.5 rounded-lg">
                  <p className="text-xs font-semibold">{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          {/* Divider */}
          <div className="h-6 w-px bg-border/40 self-center mx-1 flex-shrink-0" />

          {/* Social Links */}
          {Array.isArray(DATA.contact.social)
            ? DATA.contact.social
              .filter((social: any) => social.navbar)
              .map((social: any) => (
                <DockIcon key={social.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={social.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center size-10 rounded-full hover:bg-muted transition-colors duration-200 w-full h-full text-foreground"
                      >
                        {typeof social.icon === 'object' && social.icon.url ? (
                          <img src={social.icon.url} alt={social.name} className="size-4" />
                        ) : typeof social.icon === 'function' ? (
                          <social.icon className="size-4" />
                        ) : null}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-foreground text-background border-none shadow-md px-2.5 py-1.5 rounded-lg">
                      <p className="text-xs font-semibold">{social.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              ))
            : Object.entries(DATA.contact.social)
              .filter(([_, social]: any) => social.navbar)
              .map(([name, social]: any) => (
                <DockIcon key={name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={social.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center size-10 rounded-full hover:bg-muted transition-colors duration-200 w-full h-full text-foreground"
                      >
                        {typeof social.icon === 'function' ? (
                          <social.icon className="size-4" />
                        ) : null}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-foreground text-background border-none shadow-md px-2.5 py-1.5 rounded-lg">
                      <p className="text-xs font-semibold">{name}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              ))}

          {/* Divider */}
          <div className="h-6 w-px bg-border/40 self-center mx-1 flex-shrink-0" />

          {/* Theme Toggle */}
          <DockIcon>
            <ModeToggle />
          </DockIcon>
        </Dock>
      </nav>
    </TooltipProvider>
  );
}
