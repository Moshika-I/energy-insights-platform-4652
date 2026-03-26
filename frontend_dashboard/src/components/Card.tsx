"use client";

import React from "react";

// PUBLIC_INTERFACE
export function Card({
  title,
  subtitle,
  children,
  footer,
  tone = "default",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /**
   * Visual tone for the card (used sparingly for emphasis).
   * - default: standard surface
   * - tint: subtle colorful wash
   */
  tone?: "default" | "tint";
}) {
  /** Standard card container for dashboard widgets with a softer "super-app" look. */
  const toneClasses =
    tone === "tint"
      ? "bg-gradient-to-br from-blue-600/[0.08] via-white to-cyan-500/[0.07]"
      : "bg-white";

  return (
    <section
      className={[
        // Use consistent 20px padding by default, slightly larger on larger screens.
        "relative overflow-hidden rounded-3xl p-[20px] sm:p-6",
        "ring-1 ring-black/5",
        "shadow-[0_12px_35px_rgba(15,23,42,0.08)]",
        "transition hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)] hover:ring-black/10",
        toneClasses,
      ].join(" ")}
    >
      {/* Decorative corner sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br from-blue-600/15 to-cyan-500/10 blur-2xl"
      />

      <header className="relative mb-4">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm leading-6 text-[var(--color-secondary)]">
            {subtitle}
          </p>
        ) : null}
      </header>

      <div className="relative min-w-0">{children}</div>

      {footer ? (
        <footer className="relative mt-4 border-t border-black/5 pt-4">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}
