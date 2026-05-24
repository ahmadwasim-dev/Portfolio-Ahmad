import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  href?: string; // Optional href for anchor tag
}

const buttonVariantClasses = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
  outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const buttonSizeClasses = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9 rounded-full",
};

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    { className = "", variant = "default", size = "default", asChild = false, href, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : href ? "a" : "button"; // Use 'a' when href is present, otherwise 'button'
    const variantClass = buttonVariantClasses[variant];
    const sizeClass = buttonSizeClasses[size];

    return (
      <Comp
        href={href} // Use href for anchor tag
        download={href ? "resume.pdf" : undefined} // Set download if href is present
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${variantClass} ${sizeClass} ${className}`}
        // ref={ref as React.Ref<HTMLAnchorElement> | React.Ref<HTMLButtonElement>} // Type assertion for ref
        {...props}
      >
        Download Resume
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };
