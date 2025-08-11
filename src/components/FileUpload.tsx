"use client";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Upload } from "lucide-react";

interface Props {
  onFileLoad: (list: string[]) => void;
}

export default function FileUpload({ onFileLoad }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setMsg(null);

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = new Uint8Array(ev.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, { header: 1 }) as string[][];

        const list = json
          .slice(1)
          .map((row) => {
            const nik = row[0]?.toString().trim();
            const nama = row[1]?.toString().trim();
            return nik && nama ? `${nama} – ${nik}` : null;
          })
          .filter(Boolean) as string[];

        if (!list.length) throw new Error("Tidak ada data valid.");
        onFileLoad(list);
        setMsg({ type: "ok", text: `✅ Berhasil memuat ${list.length} peserta` });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error tidak diketahui";
        setMsg({ type: "err", text: `❌ ${message}` });
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center">
      <input ref={ref} type="file" accept=".xlsx,.xls,.csv" onChange={handleChange} className="hidden" />
      <button
        onClick={() => ref.current?.click()}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg shadow flex items-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Memproses...
          </>
        ) : (
          <>
            <Upload size={18} />
            Upload
          </>
        )}
      </button>

      {msg && (
        <div
          className={`mt-3 text-sm flex items-center gap-2 ${
            msg.type === "ok" ? "text-green-600" : "text-red-600"
          }`}
        >
          <span>{msg.text}</span>
        </div>
      )}
    </div>
  );
}