"use client";
import { useState, useEffect, useRef } from "react";
import { Play, Square } from "lucide-react";

interface Props {
  participants: string[];
  winners: { nama: string; nik: string }[];
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

  const available = participants.filter(
    (p) => !winners.map((w) => w.nik).includes(p.split(" – ")[1])
  );

  useEffect(() => {
    if (isRunning && available.length) {
      intervalRef.current = setInterval(() => {
        const idx = Math.floor(Math.random() * available.length);
        setCurrent(available[idx]);
      }, 33); // 3× lebih cepat
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
    <div className="flex flex-col items-center gap-6 mb-8">
      {/* Kotak NIK – 30× luas */}
      <div className="w-[480px] h-[240px] bg-gray-100 border-4 border-gray-400 rounded-xl flex items-center justify-center text-8xl font-mono font-bold text-black shadow-2xl">
        {nik || "————"}
      </div>

      {/* Nama */}
      <p className="text-3xl font-semibold text-gray-800">
        {nama ? `Nama: ${nama}` : "Nama: —"}
      </p>

      {/* Tombol START / STOP */}
      <div className="flex gap-12">
        <button
          onClick={handleStart}
          disabled={isRunning || !available.length}
          className="w-32 h-32 rounded-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white flex items-center justify-center shadow-xl text-3xl transition-transform hover:scale-105"
        >
          <Play size={56} />
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className="w-32 h-32 rounded-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white flex items-center justify-center shadow-xl text-3xl transition-transform hover:scale-105"
        >
          <Square size={56} />
        </button>
      </div>
    </div>
  );
}