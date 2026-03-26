"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

type NavItem = { href: string; label: string };

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/upload", label: "Upload CSV" },
];

// PUBLIC_INTERFACE
export function AppShell({
  children,
  rightPanel,
}: {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}) {
  /** Application shell with top bar, left navigation, main content, and optional right panel. */
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-primary)]">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 ring-1 ring-black/5" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Energy Insights</div>
              <div className="text-xs text-[var(--color-secondary)]">
                Usage, anomalies, and savings scenarios
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-2 text-sm text-[var(--color-secondary)] hover:bg-black/5"
            >
              Home
            </Link>
            <div className="hidden text-sm text-[var(--color-secondary)] sm:block">
              {user?.email ?? "Not signed in"}
            </div>
            <button
              type="button"
              onClick={() => signOut().catch(console.error)}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[240px_1fr_320px]">
        <aside className="hidden lg:block">
          <nav className="rounded-2xl bg-white p-3 ring-1 ring-black/5">
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
              Navigation
            </div>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "block rounded-xl px-3 py-2 text-sm transition",
                        active
                          ? "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20"
                          : "text-[var(--color-primary)] hover:bg-black/5",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className="min-w-0">{children}</main>

        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">{rightPanel}</div>
        </aside>
      </div>
    </div>
  );
}
