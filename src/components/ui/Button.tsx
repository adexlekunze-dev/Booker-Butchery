import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  block = false,
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium text-center rounded-md transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white border border-primary hover:opacity-90 active:opacity-80",
    secondary: "bg-white text-primary border border-primary hover:bg-gray-50 active:bg-gray-100",
    tertiary: "bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300 active:bg-gray-400",
    success: "bg-primary text-white border border-primary hover:opacity-90",
    danger: "bg-black text-white border border-black hover:opacity-90",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs min-h-[32px]",
    md: "px-6 py-3 text-base min-h-[44px]",
    lg: "px-8 py-4 text-lg min-h-[52px]",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        block && "w-full",
        className
      )}
      {...props}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  );
}

