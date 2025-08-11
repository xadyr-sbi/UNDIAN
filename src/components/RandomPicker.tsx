"use client";
import { useState, useEffect, useRef } from "react";
import { Play, Square } from "lucide-react";

interface Props {
  participants: string[];
  onWinnerSelect: (winner: string) => void;
}

export default function RandomPicker({ participants, onWinnerSelect }: Props) {
  const [current, setCurrent] = useState("---");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && participants.length) {
      intervalRef.current = setInterval(() => {
        const i = Math.floor(Math.random() * participants.length);
        setCurrent(participants[i]);
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, participants]);

  const handleStart = () => {
    if (!participants.length) return alert("Upload peserta dulu!");
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (participants.length) onWinnerSelect(current);
  };

  // Pisah lagi untuk UI
  const [nama, nik] = current.split(" – ");

  return (
    <div className="bg-white/80 backdrop-blur rounded-xl shadow-2xl p-6 mb-6 flex flex-col items-center gap-4">
      {/* Kotak besar NIK */}
      <div className="w-72 h-32 bg-red-100 border-4 border-red-600 rounded-lg flex items-center justify-center text-4xl font-mono font-bold text-red-700">
        {nik || "---"}
      </div>
      <div className="text-xl font-semibold text-gray-800">
        {nama || "Nama"}
      </div>

      <div className="flex gap-6 mt-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="w-24 h-24 rounded-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        >
          <Play size={40} />
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className="w-24 h-24 rounded-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        >
          <Square size={40} />
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Jumlah Peserta: {participants.length}
      </p>
    </div>
  );
}