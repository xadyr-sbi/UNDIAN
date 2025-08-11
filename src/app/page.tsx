"use client";

import { useState } from "react";
import RandomPicker from "@/components/RandomPicker";
import FileUpload from "@/components/FileUpload";
import WinnerHistory from "@/components/WinnerHistory";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[]>([]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-100 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-700 mb-2">
            HADIAH DOORPRIZE
          </h1>
          <h2 className="text-3xl font-bold text-red-600 mb-2">
            SEMARAK KEMERDEKAAN 80 TH
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700">
            PT. GWI - 23 AGUSTUS 2025
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <RandomPicker 
              participants={participants} 
              onWinnerSelect={(winner) => setWinners([...winners, winner])}
            />
            <FileUpload onFileLoad={setParticipants} />
          </div>
          <div>
            <WinnerHistory winners={winners} />
          </div>
        </div>
      </div>
    </main>
  );
}