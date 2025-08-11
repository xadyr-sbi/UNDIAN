"use client";

interface Props {
  winners: { nama: string; nik: string }[];
}

export default function WinnerHistory({ winners }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-xl shadow-2xl p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Histori Pemenang</h3>
      {winners.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Belum ada pemenang</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-red-600">
                <th className="py-2 px-2 font-semibold text-gray-700">#</th>
                <th className="py-2 px-2 font-semibold text-gray-700">Nama</th>
                <th className="py-2 px-2 font-semibold text-gray-700">NIK</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((w, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 px-2">{i + 1}</td>
                  <td className="py-2 px-2">{w.nama}</td>
                  <td className="py-2 px-2 font-mono">{w.nik}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}