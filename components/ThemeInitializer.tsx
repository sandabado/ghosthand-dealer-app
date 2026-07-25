"use client";

import { useEffect } from "react";
import { applyBrand, getStoredBrand } from "@/lib/theme-config";

export function ThemeInitializer() {
  useEffect(() => {
    applyBrand(getStoredBrand(), false);
  }, []);
  return null;
}
