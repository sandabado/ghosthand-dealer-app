"use client";

import { useCallback, useEffect, useState } from "react";

export type BrandKey = "ghost-hand" | "porsche" | "bmw" | "audi" | "mercedes";

export type BrandTheme = {
  key: BrandKey;
  name: string;
  shortName: string;
  monogram: string;
  accent: string;
  accentHover: string;
  accentForeground: string;
  secondary: string;
  demo: boolean;
};

export const DEFAULT_BRAND: BrandKey = "ghost-hand";
export const BRAND_STORAGE_KEY = "gh-brand";
export const BRAND_EVENT = "gh-brand-change";
export const DEMO_BRAND_TOOLTIP = "This is a demonstration preset. Your organization uses Ghost Hand Intelligence.";

export const BRAND_THEMES: Record<BrandKey, BrandTheme> = {
  "ghost-hand": {
    key: "ghost-hand",
    name: "Ghost Hand Intelligence",
    shortName: "Ghost Hand",
    monogram: "GH",
    accent: "#cfff04",
    accentHover: "#b8e804",
    accentForeground: "#111210",
    secondary: "#6d4aff",
    demo: false,
  },
  porsche: {
    key: "porsche",
    name: "Porsche Digital",
    shortName: "Porsche Digital",
    monogram: "PD",
    accent: "#d5001c",
    accentHover: "#b80018",
    accentForeground: "#ffffff",
    secondary: "#000000",
    demo: true,
  },
  bmw: {
    key: "bmw",
    name: "BMW ConnectedDrive",
    shortName: "BMW ConnectedDrive",
    monogram: "BC",
    accent: "#0066b1",
    accentHover: "#004f8a",
    accentForeground: "#ffffff",
    secondary: "#00a1e4",
    demo: true,
  },
  audi: {
    key: "audi",
    name: "Audi MMI",
    shortName: "Audi MMI",
    monogram: "AM",
    accent: "#bb0a30",
    accentHover: "#950824",
    accentForeground: "#ffffff",
    secondary: "#000000",
    demo: true,
  },
  mercedes: {
    key: "mercedes",
    name: "Mercedes MBUX",
    shortName: "Mercedes MBUX",
    monogram: "MB",
    accent: "#00a4e4",
    accentHover: "#0086bb",
    accentForeground: "#071217",
    secondary: "#ffffff",
    demo: true,
  },
};

export const BRAND_OPTIONS = Object.values(BRAND_THEMES);

function isBrandKey(value: string | null): value is BrandKey {
  return Boolean(value && value in BRAND_THEMES);
}

export function getStoredBrand(): BrandKey {
  if (typeof window === "undefined") return DEFAULT_BRAND;
  try {
    const stored = window.localStorage.getItem(BRAND_STORAGE_KEY);
    return isBrandKey(stored) ? stored : DEFAULT_BRAND;
  } catch {
    return DEFAULT_BRAND;
  }
}

function updateFavicon(theme: BrandTheme) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  if (!context) return;
  context.fillStyle = "#0a0a0a";
  context.fillRect(0, 0, 64, 64);
  context.fillStyle = theme.accent;
  context.fillRect(5, 5, 54, 54);
  context.fillStyle = theme.accentForeground;
  context.font = "700 23px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(theme.monogram, 32, 33);
  let favicon = document.querySelector<HTMLLinkElement>("link[data-dynamic-brand-icon]");
  if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.dataset.dynamicBrandIcon = "true";
    document.head.appendChild(favicon);
  }
  favicon.href = canvas.toDataURL("image/png");
}

export function applyBrand(key: BrandKey, persist = true) {
  if (typeof document === "undefined") return;
  const theme = BRAND_THEMES[key];
  document.documentElement.dataset.brand = key;
  document.documentElement.style.colorScheme = "dark light";
  updateFavicon(theme);
  if (persist) {
    try {
      window.localStorage.setItem(BRAND_STORAGE_KEY, key);
    } catch {
      // The selected brand still applies for this session if storage is unavailable.
    }
  }
  window.dispatchEvent(new CustomEvent(BRAND_EVENT, { detail: key }));
}

export function useBrand() {
  const [brandKey, setBrandKey] = useState<BrandKey>(DEFAULT_BRAND);

  useEffect(() => {
    const sync = () => setBrandKey(getStoredBrand());
    const onBrandChange = (event: Event) => {
      const key = (event as CustomEvent<BrandKey>).detail;
      setBrandKey(key || getStoredBrand());
    };
    sync();
    window.addEventListener(BRAND_EVENT, onBrandChange);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(BRAND_EVENT, onBrandChange);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setBrand = useCallback((key: BrandKey) => {
    setBrandKey(key);
    applyBrand(key);
  }, []);

  return { brandKey, brand: BRAND_THEMES[brandKey], setBrand };
}
