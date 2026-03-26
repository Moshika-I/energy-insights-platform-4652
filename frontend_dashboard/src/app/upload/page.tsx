"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleCheck,
  faCloudArrowUp,
  faFileCsv,
  faPaperPlane,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import type { CsvRow } from "@/types/energy";
import { parseEnergyCsv } from "@/lib/parseCsv";

function UploadInner() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const prefersReducedMotion = useReducedMotion();

  const [fileName, setFileName] = useState<string | null>(null);
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const preview = useMemo(() => rows.slice(0, 10), [rows]);

  if (!loading && !user) {
    router.replace("/login");
    return null;
  }

  async function handleFile(file: File) {
    setError(null);
    setFileName(file.name);
    const text = await file.text();
    const parsed = parseEnergyCsv(text);
    if (!parsed.ok) {
      setRows([]);
      setError(parsed.error);
      return;
    }
    setRows(parsed.rows);
  }

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 26 };

  return (
    <AppShell>
      <div className="core-section mx-auto w-full max-w-5xl space-y-6">
        <section className="relative overflow-hidden rounded-[28px] bg-white/75 p-[20px] ring-1 ring-black/5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur sm:p-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/10"
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-blue-800 ring-1 ring-black/5 shadow-sm">
                <FontAwesomeIcon icon={faCloudArrowUp} className="h-3.5 w-3.5" />
                Data ingestion
              </div>

              <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Upload consumption CSV</h1>
              <p className="mt-2 text-sm leading-6 text-[var(--color-secondary)]">
                Upload a CSV with columns like <span className="font-semibold text-[var(--color-primary)]">timestamp</span>{" "}
                and <span className="font-semibold text-[var(--color-primary)]">kWh</span>. We’ll compute baseline and anomalies.
              </p>
            </div>

            {/* Keep primary actions uniformly aligned to the right/bottom edge */}
            <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:items-end">
              <motion.button
                type="button"
                disabled={!rows.length}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={transition}
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                Use in dashboard
              </motion.button>

              <motion.button
                type="button"
                disabled={!rows.length}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={transition}
                onClick={() => {
                  // Placeholder for backend ingestion endpoint: POST /ingest or /upload.
                  // For now we just confirm parsing worked.
                  alert(`Parsed ${rows.length} rows. Backend ingestion endpoint not implemented yet.`);
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-2.5 text-sm font-semibold text-[var(--color-primary)] ring-1 ring-black/10 shadow-sm transition hover:bg-white disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4 text-slate-500" />
                Send to backend (soon)
              </motion.button>
            </div>
          </div>
        </section>

        <Card title="Upload document" subtitle="Drop a CSV here or click to choose a file." tone="tint">
          <div className="space-y-4">
            {/* Drop-zone style picker (click-to-upload). Drag/drop behavior can be added later. */}
            <label className="block">
              <span className="sr-only">Consumption CSV</span>
              <div className="group relative">
                <div className="rounded-3xl bg-white/75 p-[20px] ring-1 ring-black/10 shadow-sm backdrop-blur transition group-hover:ring-black/20">
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white ring-1 ring-black/5">
                      <FontAwesomeIcon icon={faFileCsv} className="h-5 w-5 text-blue-700" />
                    </span>
                    <div className="text-sm font-semibold text-[var(--color-primary)]">
                      Drag & drop your CSV here
                    </div>
                    <div className="text-sm text-[var(--color-secondary)]">
                      or click to browse files
                    </div>

                    <div className="mt-1 inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition group-hover:bg-blue-700">
                      <FontAwesomeIcon icon={faCloudArrowUp} className="h-4 w-4" />
                      <span className="ml-2">Upload CSV</span>
                    </div>

                    <div className="text-xs text-[var(--color-secondary)]">
                      CSV only. We’ll parse and preview the first rows.
                    </div>
                  </div>
                </div>

                {/* Real input overlays the zone for a consistent CTA-centered interaction */}
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void handleFile(f);
                  }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
            </label>

            <div className="flex flex-wrap items-center justify-between gap-2">
              {fileName ? (
                <div className="inline-flex items-center gap-2 rounded-2xl bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-800 ring-1 ring-cyan-600/20">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5" />
                  Selected: {fileName}
                </div>
              ) : (
                <div className="text-xs text-[var(--color-secondary)]">No file selected yet.</div>
              )}

              <div className="text-xs text-[var(--color-secondary)]">
                Expected columns: <span className="font-semibold text-[var(--color-primary)]">timestamp</span>,{" "}
                <span className="font-semibold text-[var(--color-primary)]">kwh</span> (optional{" "}
                <span className="font-semibold text-[var(--color-primary)]">cost</span>)
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-600/20">
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5 h-4 w-4" />
                  <div>{error}</div>
                </div>
              </div>
            ) : null}
          </div>
        </Card>

        <Card title="Preview" subtitle={rows.length ? `${rows.length} rows parsed` : "No data yet"}>
          {rows.length ? (
            <div className="overflow-auto rounded-2xl ring-1 ring-black/5">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-black/5 text-xs text-[var(--color-secondary)]">
                  <tr>
                    <th className="px-3 py-2">timestamp</th>
                    <th className="px-3 py-2">kwh</th>
                    <th className="px-3 py-2">cost</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((r, idx) => (
                    <tr key={idx} className="border-t border-black/5">
                      <td className="px-3 py-2 font-mono text-xs">{r.timestamp}</td>
                      <td className="px-3 py-2 font-medium">{r.kwh.toFixed(3)}</td>
                      <td className="px-3 py-2">{r.cost != null ? r.cost.toFixed(2) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-black/5">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-slate-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Upload a CSV to see a preview</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-secondary)]">
                    We’ll validate timestamps and numeric columns, then show the first 10 rows here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card title="Expected CSV format" subtitle="Flexible, but these are recommended columns">
          <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--color-secondary)]">
            <li>
              <span className="font-medium text-[var(--color-primary)]">timestamp</span> (ISO string or something{" "}
              <span className="font-medium text-[var(--color-primary)]">Date.parse</span> can read)
            </li>
            <li>
              <span className="font-medium text-[var(--color-primary)]">kwh</span> (numeric)
            </li>
            <li>
              Optional: <span className="font-medium text-[var(--color-primary)]">cost</span> (numeric)
            </li>
          </ul>

          <div className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm text-blue-900 ring-1 ring-blue-600/15">
            <div className="flex items-start gap-2">
              <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-4 w-4 text-blue-700" />
              <div>
                <div className="font-semibold">Tip</div>
                <div className="mt-1 text-sm leading-6 text-blue-900/80">
                  After parsing, click <span className="font-semibold">Use in dashboard</span> to explore rollups and anomalies.
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

export default function UploadPage() {
  return (
    <AuthProvider>
      <UploadInner />
    </AuthProvider>
  );
}
