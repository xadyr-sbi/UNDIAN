"use client";
import { useRef } from "react";
import * as XLSX from "xlsx";
import { Upload } from "lucide-react";

interface Props {
  onFileLoad: (list: string[]) => void;
}

export default function FileUpload({ onFileLoad }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = new Uint8Array(ev.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, { header: 1 }) as string[][];
        const list = json
          .slice(1)
          .map((r) => `${r[1]?.trim()} – ${r[0]?.trim()}`) // A=NIK, B=Nama
          .filter(Boolean) as string[];
        onFileLoad(list);
      } catch {
        alert("Gagal membaca file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center">
      <input ref={ref} type="file" accept=".xlsx,.xls,.csv" onChange={handleChange} className="hidden" />
      <button
        onClick={() => ref.current?.click()}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
      >
        <Upload size={18} className="inline mr-2" />
        Upload
      </button>
      <p className="text-xs text-gray-500 mt-1">Kolom A = NIK, Kolom B = Nama</p>
    </div>
  );
}