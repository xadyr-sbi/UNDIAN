"use client";
import { useState } from "react";
import RandomPicker from "@/components/RandomPicker";
import FileUpload from "@/components/FileUpload";
import WinnerHistory from "@/components/WinnerHistory";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [winners, setWinners] = useState<{ nama: string; nik: string }[]>([]);

  const handleAddWinner = (winnerStr: string) => {
    const [nama, nik] = winnerStr.split(" – ");
    if (!winners.find((w) => w.nik === nik)) {
      setWinners((prev) => [...prev, { nama, nik }]);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* JUDUL */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-black">HADIAH DOORPRIZE</h1>
        <h2 className="text-3xl font-bold text-black">SEMARAK KEMERDEKAAN 80 TH</h2>
        <h3 className="text-xl font-semibold text-gray-700 mt-1">
          PT. GWI - 23 AGUSTUS 2025
        </h3>
      </div>

      {/* JUMLAH PESERTA */}
      <p className="text-lg font-medium text-gray-800 mb-2">
        Jumlah Peserta: <span className="font-bold">{participants.length}</span>
      </p>

      {/* RANDOM */}
      <RandomPicker
        participants={participants}
        winners={winners}
        onWinnerSelect={handleAddWinner}
      />

      {/* UPLOAD */}
      <FileUpload onFileLoad={setParticipants} />

      {/* HISTORI */}
      <WinnerHistory winners={winners} />
    </main>
  );
}