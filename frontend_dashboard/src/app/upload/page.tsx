"use client";

import React, { useMemo, useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { useRouter } from "next/navigation";
import type { CsvRow } from "@/types/energy";
import { parseEnergyCsv } from "@/lib/parseCsv";

function UploadInner() {
  const router = useRouter();
  const { user, loading } = useAuth();

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

  return (
    <AppShell>
      <div className="space-y-4">
        <Card
          title="Upload consumption CSV"
          subtitle="Upload a CSV with columns like timestamp and kWh. We'll compute baseline and anomalies."
        >
          <div className="space-y-3">
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleFile(f);
              }}
              className="block w-full text-sm"
            />
            {fileName ? (
              <div className="text-xs text-[var(--color-secondary)]">Selected: {fileName}</div>
            ) : null}
            {error ? (
              <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-600/20">
                {error}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={!rows.length}
                onClick={() => router.push("/dashboard")}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                Use data in dashboard
              </button>
              <button
                type="button"
                disabled={!rows.length}
                onClick={() => {
                  // Placeholder for backend ingestion endpoint: POST /ingest or /upload.
                  // For now we just confirm parsing worked.
                  alert(`Parsed ${rows.length} rows. Backend ingestion endpoint not implemented yet.`);
                }}
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-[var(--color-primary)] ring-1 ring-black/10 hover:bg-black/5 disabled:opacity-50"
              >
                Send to backend (coming soon)
              </button>
            </div>
          </div>
        </Card>

        <Card title="Preview" subtitle={rows.length ? `${rows.length} rows parsed` : "No data yet"}>
          {rows.length ? (
            <div className="overflow-auto rounded-xl ring-1 ring-black/5">
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
                      <td className="px-3 py-2">{r.kwh.toFixed(3)}</td>
                      <td className="px-3 py-2">{r.cost != null ? r.cost.toFixed(2) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-[var(--color-secondary)]">
              Upload a CSV file to see a preview here.
            </p>
          )}
        </Card>

        <Card title="Expected CSV format" subtitle="Flexible, but these are recommended columns">
          <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--color-secondary)]">
            <li>
              <span className="font-medium text-[var(--color-primary)]">timestamp</span> (ISO string or
              something Date.parse can read)
            </li>
            <li>
              <span className="font-medium text-[var(--color-primary)]">kwh</span> (numeric)
            </li>
            <li>
              Optional: <span className="font-medium text-[var(--color-primary)]">cost</span> (numeric)
            </li>
          </ul>
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
