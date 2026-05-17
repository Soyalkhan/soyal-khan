"use client";

import * as React from "react";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    });
    return () => ctx.revert();
  }, [delay, y]);

  // @ts-expect-error dynamic tag ref
  return <Tag ref={ref} className={className}>{children}</Tag>;
}

export function StaggerChildren({
  children,
  className = "",
  selector = ":scope > *",
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  selector?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(selector),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, [selector, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
