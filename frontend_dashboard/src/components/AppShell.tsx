"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBolt,
  faCloudArrowUp,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";

type NavItem = { href: string; label: string; icon: typeof faGaugeHigh };

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: faGaugeHigh },
  { href: "/upload", label: "Upload CSV", icon: faCloudArrowUp },
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
      {/* Background wash for a "super-app" vibe */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-superapp" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-subtle opacity-[0.35]" aria-hidden="true" />

      <header className="sticky top-0 z-20 border-b border-black/5 surface-frosted">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/15 to-cyan-500/15 ring-1 ring-black/5">
              <FontAwesomeIcon icon={faBolt} className="h-5 w-5 text-blue-700" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">
                Energy Insights
              </div>
              <div className="text-xs text-[var(--color-secondary)]">
                Usage, anomalies, and scenarios
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-2xl bg-white/60 px-3 py-2 text-xs text-[var(--color-secondary)] ring-1 ring-black/5 sm:block">
              {user?.email ?? "Not signed in"}
            </div>

            <button type="button" onClick={() => signOut().catch(console.error)} className="btn-primary inline-flex items-center gap-2">
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[260px_1fr_340px]">
        <aside className="hidden lg:block">
          <nav className="rounded-3xl bg-white/70 p-3 ring-1 ring-black/5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="mb-2 px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
              Navigation
            </div>

            <ul className="space-y-1.5 p-2">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-sm transition",
                        "ring-1 ring-transparent",
                        active
                          ? "bg-gradient-to-br from-blue-600/10 via-white to-cyan-500/10 text-blue-800 ring-blue-600/15"
                          : "text-[var(--color-primary)] hover:bg-black/5",
                      ].join(" ")}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white ring-1 ring-black/5">
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={["h-4 w-4", active ? "text-blue-700" : "text-slate-500"].join(" ")}
                        />
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 rounded-2xl bg-gradient-to-br from-violet-600/[0.10] via-white to-pink-500/[0.06] p-4 ring-1 ring-black/5">
              <div className="text-xs font-semibold text-[var(--color-primary)]">
                Pro tip
              </div>
              <div className="mt-1 text-xs leading-5 text-[var(--color-secondary)]">
                Upload a CSV to replace mock series and explore baselines with real data.
              </div>
              <Link href="/upload" className="btn-secondary mt-3 inline-flex items-center gap-2 px-3 py-2 text-xs">
                Upload now <FontAwesomeIcon icon={faArrowRightFromBracket} className="h-3.5 w-3.5 rotate-180" />
              </Link>
            </div>
          </nav>
        </aside>

        <main className="min-w-0">{children}</main>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">{rightPanel}</div>
        </aside>
      </div>
    </div>
  );
}
