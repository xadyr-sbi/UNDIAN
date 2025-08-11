"use client";

import { useRef } from "react";
import * as XLSX from "xlsx";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileLoad: (participants: string[]) => void;
}

export default function FileUpload({ onFileLoad }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
        
        // Ambil kolom pertama sebagai nama peserta
        const names = jsonData
          .slice(1) // Skip header
          .map(row => row[0])
          .filter(name => name && name.trim());
        
        onFileLoad(names);
        alert(`Berhasil memuat ${names.length} peserta!`);
      } catch (error) {
        alert("Gagal membaca file. Pastikan format file benar.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Upload Daftar Peserta
      </h3>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileUpload}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors"
      >
        <Upload size={20} />
        Pilih File Excel/CSV
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Format: Kolom pertama berisi nama peserta
      </p>
    </div>
  );
}