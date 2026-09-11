"use client";

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useCanHover } from "@/hooks/useCanHover";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "inverse-outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-sans font-medium uppercase tracking-[0.08em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-burgundy focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-burgundy text-ivory hover:bg-burgundy-dark",
  secondary:
    "border border-charcoal/70 text-charcoal hover:border-burgundy hover:text-burgundy",
  ghost: "text-charcoal hover:text-burgundy",
  inverse: "bg-ivory text-burgundy hover:bg-champagne hover:text-burgundy-dark",
  "inverse-outline":
    "border border-ivory/60 text-ivory hover:border-champagne hover:text-champagne",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-xs",
  lg: "h-14 px-8 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

// How far (in px) the button is allowed to drift toward the cursor, and how
// much of the raw offset it actually follows — kept small so it reads as a
// subtle magnetic pull rather than the button chasing the pointer.
const MAGNET_RADIUS = 10;
const MAGNET_STRENGTH = 0.35;

function clamp(value: number, max: number) {
  return Math.max(-max, Math.min(max, value));
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const canHover = useCanHover();
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const classes = cn(base, variants[variant], sizes[size], className);
  const settled = offset.x === 0 && offset.y === 0;

  function handleMouseMove(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    if (!canHover) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: clamp((event.clientX - (rect.left + rect.width / 2)) * MAGNET_STRENGTH, MAGNET_RADIUS),
      y: clamp((event.clientY - (rect.top + rect.height / 2)) * MAGNET_STRENGTH, MAGNET_RADIUS),
    });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const magnetProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    "data-cursor": "cta",
    style: {
      transform: `translate(${offset.x}px, ${offset.y}px)`,
      transition: settled ? "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)" : "transform 0.08s linear",
    },
  } as const;

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props as ButtonAsLink;
    return (
      <Link ref={ref} href={href} className={classes} {...anchorProps} {...magnetProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      {...magnetProps}
    >
      {children}
    </button>
  );
}
