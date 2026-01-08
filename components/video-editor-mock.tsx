import React, { ReactNode, JSX } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

type VideoEditorHeroMockProps = {
  title?: string;
  subtitle?: string;
  primaryCta?: string;
};

export default function VideoEditorHeroMock({
  title = "cinescore",
  subtitle = "find music that fits the heart of your story",
  primaryCta = "get started",
}: VideoEditorHeroMockProps): JSX.Element {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl">
        <div className="overflow-hidden rounded-2xl border bg-background shadow-xl">
          {/* Window chrome */}
          <div className="flex h-12 items-center justify-between border-b bg-muted/40 px-4">
            <div className="hidden items-center gap-2 sm:flex">
              <Badge variant="secondary" className="font-normal">
                Project
              </Badge>
              <span className="text-xs text-muted-foreground">
                cinescore edit
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="grid gap-4">
              {/* Viewer */}
              <div className="relative overflow-hidden rounded-2xl border bg-muted/30">
                {/* “video” texture */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/18 via-transparent to-emerald-400/8" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/25" />
                  {/* slightly lighter vignette so content wins */}
                  <div className="absolute inset-0 shadow-[inset_0_0_110px_rgba(0,0,0,0.45)]" />
                  {/* subtle grid to hint “monitor” */}
                  <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]" />
                  {/* focus wash behind content area */}
                  <div className="absolute inset-0 bg-gradient-to-r from-background/75 via-background/35 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 px-5 pb-7 pt-5 sm:px-8 sm:pb-10 sm:pt-6">
                  {/* frosted panel for hierarchy */}
                  <div className="max-w-xl rounded-2xl border bg-background/55 p-5 shadow-sm backdrop-blur sm:p-6">
                    <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-5xl">
                      {title}
                    </h2>

                    <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {subtitle}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <Link href="/questionnaire">
                        <Button
                          size="lg"
                          className="relative rounded-xl px-6 shadow-md shadow-violet-500/30 ring-2 ring-violet-500/35 transition hover:shadow-violet-500/40 hover:ring-violet-500/45"
                        >
                          {primaryCta}
                          <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            className="ml-2 h-5 w-5"
                          />
                          {/* subtle “glow” for prevalence */}
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-1 -z-10 rounded-xl bg-violet-500/15 blur-md"
                          />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-5 bottom-6 top-16 hidden rounded-xl border border-dashed border-white/10 sm:block" />
                </div>
              </div>

              {/* Timeline */}
              <div className="overflow-hidden rounded-2xl border bg-muted/30">
                <div className="flex h-11 items-center justify-between border-b bg-background/30 px-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Timeline</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      24fps
                    </Badge>
                    <Badge
                      variant="outline"
                      className="hidden text-xs sm:inline-flex"
                    >
                      Snap
                    </Badge>
                  </div>
                </div>

                <div className="relative px-4 py-4">
                  {/* ruler */}
                  <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                    <span>00:00</span>
                    <span>00:05</span>
                    <span>00:10</span>
                    <span>00:15</span>
                  </div>

                  {/* grid background */}
                  <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px)] [background-size:64px_1px]" />

                  {/* Tracks */}
                  <div className="relative grid gap-3">
                    <TrackRow label="V1">
                      {/* slightly desaturated so viewer wins */}
                      <Clip className="w-[52%] bg-gradient-to-r from-violet-500/40 to-violet-500/16" />
                      <Clip className="w-[30%] bg-gradient-to-r from-white/16 to-white/5" />
                    </TrackRow>

                    <TrackRow label="A1">
                      <Clip className="w-[70%] bg-gradient-to-r from-emerald-400/26 to-emerald-400/10" />
                    </TrackRow>

                    {/* playhead */}
                    <div
                      className="pointer-events-none absolute top-0 h-full"
                      style={{ left: "48%" }}
                    >
                      <div className="-translate-x-1/2">
                        <div className="h-3 w-3 rounded bg-violet-400/90 shadow-[0_10px_24px_rgba(124,92,255,0.18)]" />
                        <div className="mt-1 h-[92px] w-[2px] bg-gradient-to-b from-violet-400/85 to-violet-400/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transport row */}
              <div className="flex items-center justify-between rounded-2xl border bg-muted/20 px-4 py-3">
                <div className="flex items-center gap-2">
                  <IconButton label="Back">⏮</IconButton>
                  <IconButton label="Play">▶︎</IconButton>
                  <IconButton label="Stop">■</IconButton>
                  <IconButton label="Forward">⏭</IconButton>
                </div>

                <div className="hidden items-center gap-3 sm:flex">
                  <span className="text-xs text-muted-foreground">Zoom</span>
                  <div className="h-2 w-40 overflow-hidden rounded-full bg-border">
                    <div className="h-full w-2/3 bg-violet-400/45" />
                  </div>
                </div>

                <Badge variant="outline" className="font-mono text-xs">
                  00:00:07:12
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="grid grid-cols-[40px_1fr] items-center gap-3">
      <div className="text-xs font-mono text-muted-foreground">{label}</div>
      <div className="flex h-9 items-center gap-2 rounded-xl border bg-background/25 p-2">
        {children}
      </div>
    </div>
  );
}

function Clip({ className }: { className?: string }): JSX.Element {
  return (
    <div
      className={[
        "h-full rounded-lg border border-white/10 shadow-sm",
        "bg-violet-500/15",
        className ?? "",
      ].join(" ")}
      aria-hidden="true"
    />
  );
}

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-xl border bg-background/40 text-sm text-foreground/80 shadow-sm transition hover:bg-background/60"
    >
      {children}
    </button>
  );
}
