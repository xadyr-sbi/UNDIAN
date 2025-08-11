"use client";
import { useState } from "react";
import RandomPicker from "@/components/RandomPicker";
import FileUpload from "@/components/FileUpload";

export default function Home() {
  /*  state peserta & pemenang  */
  const [participants, setParticipants] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[]>([]);

  /*  helper: ambil NIK dari string "Nama – NIK"  */
  const nikOnly = (s: string) => s.split(" – ")[1];

  const handleAddWinner = (winnerStr: string) => {
    /*  jika NIK sudah pernah menang → skip  */
    if (winners.map(nikOnly).includes(nikOnly(winnerStr))) return;
    setWinners((prev) => [...prev, winnerStr]);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-black">HADIAH DOORPRIZE</h1>
        <h2 className="text-3xl font-bold text-black">SEMARAK KEMERDEKAAN 80 TH</h2>
        <h3 className="text-xl font-semibold text-gray-700 mt-1">
          PT. GWI - 23 AGUSTUS 2025
        </h3>
      </div>

      {/* Jumlah peserta */}
      <p className="text-lg font-medium text-gray-800 mb-2">
        Jumlah Peserta: <span className="font-bold">{participants.length}</span>
      </p>

      {/* Kotak random */}
      <RandomPicker
        participants={participants}
        winners={winners}
        onWinnerSelect={handleAddWinner}
      />

      {/* Upload */}
      <FileUpload onFileLoad={setParticipants} />
    </main>
  );
}