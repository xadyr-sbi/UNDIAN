"use client";
import { useState, useEffect, useRef } from "react";
import { Play, Square } from "lucide-react";

interface Props {
  participants: string[];
  winners: string[];
  onWinnerSelect: (winner: string) => void;
}

export default function RandomPicker({
  participants,
  winners,
  onWinnerSelect,
}: Props) {
  const [current, setCurrent] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /* filter peserta yang NIK-nya belum keluar */
  const available = participants.filter(
    (p) => !winners.map((w) => w.split(" – ")[1]).includes(p.split(" – ")[1])
  );

  useEffect(() => {
    if (isRunning && available.length) {
      intervalRef.current = setInterval(() => {
        const idx = Math.floor(Math.random() * available.length);
        setCurrent(available[idx]);
      }, 33); // ~3× lebih cepat (~30 fps)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, available]);

  const handleStart = () => {
    if (!available.length) return alert("Tidak ada peserta tersedia!");
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (current) onWinnerSelect(current);
  };

  const [nama, nik] = current ? current.split(" – ") : ["", ""];
  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      {/* Kotak NIK */}
      <div className="w-80 h-40 bg-gray-100 border-2 border-gray-400 rounded-lg flex items-center justify-center text-5xl font-mono font-bold text-black">
        {nik || "————"}
      </div>

      {/* Nama */}
      <p className="text-2xl font-semibold text-gray-800">
        {nama ? `Nama: ${nama}` : "Nama: —"}
      </p>

      {/* Tombol START / STOP */}
      <div className="flex gap-8">
        <button
          onClick={handleStart}
          disabled={isRunning || !available.length}
          className="w-28 h-28 rounded-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white flex items-center justify-center shadow-lg text-2xl"
        >
          <Play size={48} />
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className="w-28 h-28 rounded-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white flex items-center justify-center shadow-lg text-2xl"
        >
          <Square size={48} />
        </button>
      </div>
    </div>
  );
}