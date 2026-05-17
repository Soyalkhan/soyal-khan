"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function SmoothScroll() {
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    ref.current = lenis;
    lenisInstance = lenis;

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const handleAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
    };
    document.addEventListener("click", handleAnchor);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", handleAnchor);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
