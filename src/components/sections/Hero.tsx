"use client";

import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import { ArrowDown, Download, Mail } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiShopify,
  SiRemix,
  SiGraphql,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { profile } from "@/lib/github-data";

type IconCmp = ComponentType<SVGProps<SVGSVGElement>>;

const TECH: { label: string; Icon: IconCmp; x: number; y: number; d: number }[] = [
  { label: "React", Icon: SiReact, x: 8, y: 30, d: 0 },
  { label: "Node.js", Icon: SiNodedotjs, x: 88, y: 24, d: 0.1 },
  { label: "Shopify", Icon: SiShopify, x: 5, y: 62, d: 0.2 },
  { label: "MongoDB", Icon: SiMongodb, x: 92, y: 60, d: 0.15 },
  { label: "Remix", Icon: SiRemix, x: 18, y: 14, d: 0.25 },
  { label: "GraphQL", Icon: SiGraphql, x: 78, y: 14, d: 0.3 },
  { label: "TypeScript", Icon: SiTypescript, x: 14, y: 82, d: 0.05 },
  { label: "Next.js", Icon: SiNextdotjs, x: 84, y: 82, d: 0.18 },
  { label: "Tailwind", Icon: SiTailwindcss, x: 50, y: 8, d: 0.12 },
];

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [dl, setDl] = useState<{ pct: number; active: boolean }>({ pct: 0, active: false });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setMouse({ x: (e.clientX - w / 2) / w, y: (e.clientY - h / 2) / h });
    };
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const downloadCV = async () => {
    if (dl.active) return;
    setDl({ pct: 0, active: true });
    try {
      const res = await fetch("/Soyal_CV.pdf");
      const total = Number(res.headers.get("content-length")) || 0;
      const reader = res.body?.getReader();
      if (!reader) throw new Error("no reader");
      const chunks: Uint8Array[] = [];
      let received = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          received += value.length;
          const pct = total
            ? Math.min(99, Math.round((received / total) * 100))
            : Math.min(95, dl.pct + 5);
          setDl({ pct, active: true });
        }
      }
      const blob = new Blob(chunks as BlobPart[], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Soyal_Khan_CV.pdf";
      document.body.appendChild(a);
      setDl({ pct: 100, active: true });
      await new Promise((r) => setTimeout(r, 350));
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open("/Soyal_CV.pdf", "_blank");
    } finally {
      setTimeout(() => setDl({ pct: 0, active: false }), 1100);
    }
  };

  const scrollParallax = scrollY * 0.25;

  return (
    <section
      id="top"
      ref={wrapRef}
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-background pt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[68%] h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.5 0.28 264 / 0.35), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto mt-2 flex w-full max-w-[1600px] items-center justify-between gap-3 px-4 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[10px] sm:px-5 md:px-8">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-brand" />
          001
        </span>
        <span className="text-right">New Delhi — IN</span>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col items-center justify-end px-5 pb-[42vh] pt-12 md:px-8 md:pb-[44vh]">
        <div className="text-center">
          <p
            className="reveal-up font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-brand">→</span>&nbsp; Soyal Khan
          </p>
          <h1
            className="reveal-up display-massive mt-5 text-[clamp(2.25rem,7.2vw,6rem)] leading-[0.95]"
            style={{ animationDelay: "0.25s" }}
          >
            Full-Stack <span className="font-serif italic font-normal text-brand">Engineer</span>
          </h1>

          <div
            className="reveal-up mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.5s" }}
          >
            <button
              onClick={downloadCV}
              className="group relative inline-flex h-12 items-center gap-3 overflow-hidden border border-foreground bg-foreground px-6 font-mono text-[11px] uppercase tracking-[0.22em] text-background transition-colors hover:bg-brand hover:border-brand hover:text-foreground"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 bg-brand transition-[width] duration-200 ease-linear"
                style={{ width: dl.active ? `${dl.pct}%` : "0%" }}
              />
              <Download className="relative z-10 h-4 w-4" />
              <span className="relative z-10">
                {dl.active
                  ? dl.pct >= 100
                    ? "Saved"
                    : `Downloading ${String(dl.pct).padStart(2, "0")}%`
                  : "Download CV"}
              </span>
            </button>
            <a
              href="#case-studies"
              className="inline-flex h-12 items-center gap-3 border border-border px-6 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:border-foreground"
            >
              View Selected Work
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex justify-center">
        <div
          className="relative"
          style={{
            transform: `translate3d(${mouse.x * -18}px, ${-scrollParallax * 0.25}px, 0)`,
            transition: "transform 200ms cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-x-0 -bottom-10 mx-auto h-40 w-[90%] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, oklch(0.5 0.28 264 / 0.55), transparent 70%)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portrait.png"
            alt="Soyal Khan"
            width={520}
            height={520}
            className="reveal-portrait relative h-[44vh] max-h-[560px] min-h-[320px] w-auto select-none object-contain object-bottom"
            draggable={false}
            style={{ filter: "drop-shadow(0 25px 60px oklch(0 0 0 / 0.5))" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = profile.avatar;
            }}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[6] hidden md:block">
        {TECH.map((t, i) => {
          const tx = mouse.x * (40 + i * 4) * (i % 2 ? -1 : 1);
          const ty = mouse.y * (30 + i * 3) * (i % 3 ? 1 : -1) - scrollParallax * (0.3 + t.d);
          const Icon = t.Icon;
          return (
            <span
              key={t.label}
              title={t.label}
              aria-label={t.label}
              className="float-chip absolute flex h-11 w-11 items-center justify-center border border-border bg-background/60 text-foreground backdrop-blur-md transition-colors hover:border-brand hover:text-brand"
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                transform: `translate3d(${tx}px, ${ty}px, 0)`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              <Icon className="h-5 w-5" />
            </span>
          );
        })}
      </div>

      <div className="pointer-events-auto absolute bottom-6 left-5 z-20 hidden flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:flex md:left-8">
        <a
          href={profile.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-foreground"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          GitHub
        </a>
        <a
          href={profile.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-foreground"
        >
          <LinkedinIcon className="h-3.5 w-3.5" />
          LinkedIn
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-2 hover:text-foreground"
        >
          <Mail className="h-3.5 w-3.5" />
          Email
        </a>
      </div>

      <style>{`
        @keyframes reveal-up {
          0% { opacity: 0; transform: translateY(38px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .reveal-up {
          opacity: 0;
          animation: reveal-up 1.1s cubic-bezier(.2,.8,.2,1) forwards;
        }
        @keyframes portrait-in {
          0% { opacity: 0; transform: translateY(80px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .reveal-portrait {
          animation: portrait-in 1.4s cubic-bezier(.2,.8,.2,1) 0.5s both;
        }
        .float-chip {
          opacity: 0;
          animation: chip-in 0.9s cubic-bezier(.2,.8,.2,1) forwards;
        }
        @keyframes chip-in {
          0% { opacity: 0; transform: scale(0.7); }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
