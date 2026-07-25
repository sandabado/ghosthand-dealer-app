"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BRAND_OPTIONS, DEMO_BRAND_TOOLTIP, useBrand } from "@/lib/theme-config";

export function BrandSwitcher({ compact = false }: { compact?: boolean }) {
  const { brand, setBrand } = useBrand();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  return <div className={`brand-switcher ${compact ? "compact" : ""}`} ref={wrapper}>
    <button className="brand-trigger" type="button" onClick={() => setOpen(value => !value)} aria-haspopup="listbox" aria-expanded={open}>
      <span className="brand-trigger-mark">{brand.monogram}</span>
      {!compact && <span><b>{brand.shortName}</b><small>{brand.demo ? "DEMO MODE" : "ACTIVE BRAND"}</small></span>}
      <ChevronDown size={14} strokeWidth={1.8} />
    </button>
    {open && <div className="brand-menu" role="listbox" aria-label="Interface brand">
      <div className="brand-menu-head"><span>INTERFACE BRAND</span><small>Preview white-label presets</small></div>
      {BRAND_OPTIONS.map(option => <button
        key={option.key}
        type="button"
        role="option"
        aria-selected={option.key === brand.key}
        title={option.demo ? DEMO_BRAND_TOOLTIP : "Your organization’s default brand."}
        onClick={() => { setBrand(option.key); setOpen(false); }}
      >
        <i style={{ background: option.accent }}>{option.monogram}</i>
        <span><b>{option.name}</b><small>{option.demo ? "Demonstration preset" : "Organization default"}</small></span>
        {option.demo && <em>DEMO</em>}
        {option.key === brand.key && <Check size={15} strokeWidth={2.2} />}
      </button>)}
      <p>{brand.demo ? DEMO_BRAND_TOOLTIP : "Ghost Hand Intelligence is the active organization brand."}</p>
    </div>}
  </div>;
}
