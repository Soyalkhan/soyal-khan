"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [pct, setPct] = useState(0);
  const [hide, setHide] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 2200;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setPct(Math.floor(ease(p) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExit(true), 250);
        setTimeout(() => setHide(true), 1300);
      }
    };
    raf = requestAnimationFrame(tick);
    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (exit) document.documentElement.style.overflow = "";
  }, [exit]);

  if (hide) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-background transition-transform duration-[1100ms] ease-[cubic-bezier(0.7,0,0.2,1)]"
        style={{ transform: exit ? "translateY(-101%)" : "translateY(0)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background transition-transform duration-[1100ms] ease-[cubic-bezier(0.7,0,0.2,1)]"
        style={{ transform: exit ? "translateY(101%)" : "translateY(0)" }}
      />

      <div
        className={`absolute inset-0 flex flex-col transition-opacity duration-500 ${
          exit ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Soyal Khan — Portfolio
            </div>
            <div className="display-massive mt-6 overflow-hidden text-[clamp(2.5rem,12vw,9rem)] leading-[0.9]">
              <div
                className="inline-block"
                style={{
                  transform: `translateY(${(1 - pct / 100) * 60}%)`,
                  transition: "transform 80ms linear",
                }}
              >
                SOYAL <span className="font-serif italic font-normal text-brand">Khan</span>
              </div>
            </div>
            <div className="mt-6 font-mono text-xs text-muted-foreground">
              EST. 2019 / NEW DELHI, IN
            </div>
          </div>
        </div>
        <div className="border-t border-border px-6 py-4">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
            <span className="text-muted-foreground">Booting interface</span>
            <div className="mx-6 h-px flex-1 bg-border">
              <div
                className="h-full bg-brand transition-[width] duration-100 ease-linear"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-foreground tabular-nums">{String(pct).padStart(3, "0")}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
