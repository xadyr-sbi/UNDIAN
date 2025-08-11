"use client";

interface WinnerHistoryProps {
  winners: string[];
}

export default function WinnerHistory({ winners }: WinnerHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Histori Pemenang
      </h3>
      {winners.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Belum ada pemenang</p>
      ) : (
        <ol className="space-y-2">
          {winners.map((winner, index) => (
            <li
              key={index}
              className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg"
            >
              <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {index + 1}
              </span>
              <span className="font-semibold text-gray-700">{winner}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}