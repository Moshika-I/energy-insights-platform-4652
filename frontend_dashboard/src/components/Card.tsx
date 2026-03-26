"use client";

import React from "react";

// PUBLIC_INTERFACE
export function Card({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  /** Standard card container for dashboard widgets. */
  return (
    <section className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
      <header className="mb-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        {subtitle ? (
          <p className="mt-0.5 text-xs text-[var(--color-secondary)]">{subtitle}</p>
        ) : null}
      </header>
      <div className="min-w-0">{children}</div>
      {footer ? <footer className="mt-3 border-t border-black/5 pt-3">{footer}</footer> : null}
    </section>
  );
}
