"use client";

import Link from "next/link";
import { useBrand } from "@/lib/theme-config";
import { cn } from "@/lib/utils";

export function BrandLogo({ href, compact = false, className }: { href?: string; compact?: boolean; className?: string }) {
  const { brand } = useBrand();
  const content = <>
    <span className="brand-logo-mark" aria-hidden="true">{brand.monogram}</span>
    {!compact && <span className="brand-logo-copy"><b>{brand.name}</b>{brand.demo && <small>DEMO MODE</small>}</span>}
  </>;
  const classes = cn("brand-logo", className);
  return href ? <Link href={href} className={classes} aria-label={`${brand.name} home`}>{content}</Link> : <div className={classes}>{content}</div>;
}
