import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "filled" | "ghost" | "dark";
type ButtonSize = "default" | "small";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  filled:
    "bg-black text-white hover:bg-neutral-800 shadow-xs hover:-translate-y-0.5",
  ghost:
    "bg-white text-black border border-neutral-200 hover:bg-neutral-50 shadow-2xs hover:-translate-y-0.5",
  dark:
    "bg-white text-black hover:bg-neutral-100 shadow-xs hover:-translate-y-0.5",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-6 py-2.5 text-sm",
  small: "px-4 py-2 text-xs sm:text-sm",
};

export default function Button({
  children,
  variant = "filled",
  size = "default",
  href,
  type = "button",
  className = "",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 cursor-pointer";

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {children}
    </button>
  );
}
