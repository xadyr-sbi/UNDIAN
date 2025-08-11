"use client";
import { useState } from "react";
import RandomPicker from "@/components/RandomPicker";
import FileUpload from "@/components/FileUpload";
import WinnerHistory from "@/components/WinnerHistory";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [winners, setWinners] = useState<
    { nama: string; nik: string }[]
  >([]);

  const handleAddWinner = (winnerStr: string) => {
    // winnerStr = "Nama – NIK"
    const [nama, nik] = winnerStr.split(" – ");
    setWinners((prev) => [...prev, { nama, nik }]);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      {/* Bendera Indonesia */}
      <div className="flex flex-col mb-6">
        <div className="h-6 w-32 bg-red-600"></div>
        <div className="h-6 w-32 bg-white"></div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-5xl font-extrabold text-red-700 tracking-wider" style={{ fontFamily: "Bebas Neue" }}>
          HADIAH DOORPRIZE
        </h1>
        <h2 className="text-4xl font-extrabold text-red-600 tracking-wider" style={{ fontFamily: "Bebas Neue" }}>
          SEMARAK KEMERDEKAAN 80 TH
        </h2>
        <h3 className="text-2xl font-semibold text-gray-800 mt-1">
          PT. GWI – 23 AGUSTUS 2025
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        <div className="flex-1">
          <RandomPicker participants={participants} onWinnerSelect={handleAddWinner} />
          <FileUpload onFileLoad={setParticipants} />
        </div>
        <div className="flex-1">
          <WinnerHistory winners={winners} />
        </div>
      </div>
    </main>
  );
}