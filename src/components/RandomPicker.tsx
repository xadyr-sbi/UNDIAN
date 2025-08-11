"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Square } from "lucide-react";

interface RandomPickerProps {
  participants: string[];
  onWinnerSelect: (winner: string) => void;
}

export default function RandomPicker({ participants, onWinnerSelect }: RandomPickerProps) {
  const [currentName, setCurrentName] = useState("---");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && participants.length > 0) {
      intervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * participants.length);
        setCurrentName(participants[randomIndex]);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, participants]);

  const handleStart = () => {
    if (participants.length === 0) {
      alert("Silakan upload daftar peserta terlebih dahulu!");
      return;
    }
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (participants.length > 0) {
      onWinnerSelect(currentName);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-red-600 mb-4 animate-pulse">
          {currentName}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleStart}
          disabled={isRunning || participants.length === 0}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Play size={20} />
          START
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Square size={20} />
          STOP
        </button>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Jumlah Peserta: {participants.length}
        </p>
      </div>
    </div>
  );
}