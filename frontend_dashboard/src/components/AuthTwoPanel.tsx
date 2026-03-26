"use client";

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBolt,
  faChartLine,
  faCircleNotch,
  faEnvelope,
  faLock,
  faShieldHalved,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import type { AuthError } from "@supabase/supabase-js";

type Mode = "login" | "signup";

function validateEmail(email: string): string | null {
  const v = email.trim();
  if (!v) return "Email is required.";
  // Basic, pragmatic email check for UI validation.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address.";
  return null;
}

function validatePassword(password: string): string | null {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Use at least 8 characters.";
  return null;
}

function formatAuthError(err: AuthError | null): string | null {
  if (!err) return null;
  // Keep messages professional; avoid leaking raw internals.
  const msg = err.message?.toLowerCase() ?? "";
  if (msg.includes("invalid login credentials")) return "Incorrect email or password.";
  if (msg.includes("user already registered")) return "An account with this email already exists.";
  return err.message || "Authentication failed. Please try again.";
}

// PUBLIC_INTERFACE
export function AuthTwoPanel({
  initialMode = "login",
}: {
  initialMode?: Mode;
}) {
  /** Two-panel animated auth UI for login + signup using Supabase email/password. */
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const prefersReducedMotion = useReducedMotion();

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    if (emailErr || passErr) {
      setError(emailErr ?? passErr);
      return;
    }

    setBusy(true);
    try {
      if (isSignup) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (signUpError) {
          setError(formatAuthError(signUpError));
          return;
        }

        // Depending on Supabase settings, the user may need to confirm email.
        // Provide a neutral, professional notice either way.
        setNotice(
          "Account created. If email confirmation is enabled, please check your inbox to verify your address."
        );
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (signInError) {
          setError(formatAuthError(signInError));
          return;
        }

        // AuthContext will observe session change and redirect on /login page.
        setNotice("Signed in successfully. Redirecting to your dashboard…");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const panelLeftTitle = isSignup ? "Create your account" : "Welcome back";
  const panelLeftSubtitle = isSignup
    ? "Start turning consumption data into operational savings."
    : "Sign in to monitor performance, detect anomalies, and simulate improvements.";

  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-white ring-1 ring-black/5">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left: form */}
        <div className="relative p-8 sm:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/15 to-cyan-500/15 ring-1 ring-black/5">
              <FontAwesomeIcon icon={faBolt} className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">Energy Insights</div>
              <div className="text-xs text-[var(--color-secondary)]">
                Commercial analytics for measurable reduction
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-2xl font-semibold tracking-tight">{panelLeftTitle}</h1>
            <p className="mt-2 text-sm leading-6 text-[var(--color-secondary)]">{panelLeftSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-xs font-medium text-[var(--color-secondary)]">Work email</span>
              <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-blue-600/60">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-slate-400" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="name@company.com"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-medium text-[var(--color-secondary)]">Password</span>
              <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-blue-600/60">
                <FontAwesomeIcon icon={faLock} className="h-4 w-4 text-slate-400" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </label>

            {error ? (
              <div
                className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-600/15"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </div>
            ) : null}

            {notice ? (
              <div
                className="rounded-2xl bg-blue-50 px-4 py-3 text-sm text-blue-800 ring-1 ring-blue-600/15"
                role="status"
                aria-live="polite"
              >
                {notice}
              </div>
            ) : null}

            <button type="submit" disabled={busy} className="btn-primary group inline-flex w-full items-center justify-center gap-2 px-4 py-3 disabled:opacity-60">
              {busy ? (
                <FontAwesomeIcon icon={faCircleNotch} spin className="h-4 w-4" />
              ) : (
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              )}
              {isSignup ? "Create account" : "Sign in"}
              <span className="ml-1 hidden sm:inline text-white/80 font-medium">
                {isSignup ? "" : ""}
              </span>
            </button>

            <div className="flex items-center justify-between pt-2 text-xs text-[var(--color-secondary)]">
              <div>
                {isSignup ? (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError(null);
                        setNotice(null);
                      }}
                      className="cool-link font-semibold"
                    >
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    New to Energy Insights?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signup");
                        setError(null);
                        setNotice(null);
                      }}
                      className="cool-link font-semibold"
                    >
                      Create an account
                    </button>
                  </>
                )}
              </div>
              <Link href="/" className="font-semibold hover:underline">
                Back to site
              </Link>
            </div>

            <div className="pt-4 text-xs text-[var(--color-secondary)]">
              <div className="flex items-start gap-2">
                <FontAwesomeIcon icon={faShieldHalved} className="mt-0.5 h-3.5 w-3.5 text-slate-400" />
                <p>
                  Authentication is secured via Supabase. Use your organization email for account recovery and auditing.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Right: marketing panel with animated overlay */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900 p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
            <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Analytics built for operations
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              See waste early. Prioritize fixes. Prove savings.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Upload consumption data, compare against baseline, and get decision-ready insights with scenario modeling
              your finance team can trust.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                {
                  icon: faChartLine,
                  title: "Trends and baselines",
                  detail: "Daily/weekly/monthly views with a clear baseline for variance.",
                },
                {
                  icon: faWandMagicSparkles,
                  title: "Actionable insights",
                  detail: "Recommendations to reduce peak, off-hours load, and standby usage.",
                },
                {
                  icon: faShieldHalved,
                  title: "Audit-friendly access",
                  detail: "User-based authentication with secure session management.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
                >
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                    <FontAwesomeIcon icon={f.icon} className="h-4 w-4 text-white/80" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{f.title}</div>
                    <div className="mt-0.5 text-xs leading-5 text-white/70">{f.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-xs font-semibold text-white/80">Typical outcomes</div>
              <div className="mt-2 grid grid-cols-3 gap-3">
                {[
                  { k: "3–8%", v: "Load reduction" },
                  { k: "< 2 wks", v: "Time to findings" },
                  { k: "Fewer", v: "Surprise peaks" },
                ].map((s) => (
                  <div key={s.v} className="rounded-xl bg-white/5 p-3 text-center ring-1 ring-white/10">
                    <div className="text-lg font-semibold text-white">{s.k}</div>
                    <div className="mt-0.5 text-[11px] leading-4 text-white/70">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated mode indicator */}
            <div className="mt-8">
              <div className="text-xs text-white/60">Mode</div>
              <div className="mt-2 relative h-12 rounded-2xl bg-white/5 ring-1 ring-white/10 p-1">
                <motion.div
                  aria-hidden="true"
                  className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-xl bg-white/10 ring-1 ring-white/10"
                  animate={{
                    x: isSignup ? "100%" : "0%",
                  }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 320, damping: 28 }
                  }
                />
                <div className="relative grid h-full grid-cols-2 text-xs font-semibold text-white/80">
                  <button
                    type="button"
                    className="rounded-xl"
                    onClick={() => {
                      setMode("login");
                      setError(null);
                      setNotice(null);
                    }}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    className="rounded-xl"
                    onClick={() => {
                      setMode("signup");
                      setError(null);
                      setNotice(null);
                    }}
                  >
                    Sign up
                  </button>
                </div>
              </div>
              <div className="mt-2 text-[11px] leading-5 text-white/60">
                Prefer SSO? This can be enabled in Supabase later.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom animated accent */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}
