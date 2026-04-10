import { Search, RefreshCw, Download } from "lucide-react";
import { Registrant } from "@/types/admin";

type RegistrantTableProps = {
  registrants: Registrant[];
  filteredRegistrants: Registrant[];
  search: string;
  onSearchChange: (val: string) => void;
  onRefresh: () => void;
  onExport: () => void;
  isLoading: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
};

export default function RegistrantTable({
  registrants,
  filteredRegistrants,
  search,
  onSearchChange,
  onRefresh,
  onExport,
  isLoading,
  pagination
}: RegistrantTableProps) {
  return (
    <div className="bg-white border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b-2 border-gray-100 gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pendaftar..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border-2 border-gray-200 focus:border-festika-teal outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onRefresh}
            className="flex items-center gap-2 border-2 border-gray-200 px-3 py-2 text-sm font-bold hover:border-festika-teal transition-all"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} /> Refresh
          </button>
          <button 
            onClick={onExport}
            disabled={registrants.length === 0}
            className="flex items-center gap-2 bg-festika-teal text-white px-3 py-2 text-sm font-bold border-2 border-festika-navy shadow-[2px_2px_0_0_#0F2A36] disabled:opacity-50"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-20 text-center text-gray-400">Memuat data...</div>
        ) : filteredRegistrants.length === 0 ? (
          <div className="p-20 text-center text-gray-400">Tidak ada data.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-festika-navy text-white text-left font-bold">
                <th className="p-4">#</th>
                <th className="p-4">Nama</th>
                <th className="p-4">WhatsApp</th>
                <th className="p-4">Jurusan</th>
                <th className="p-4">Angkatan</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrants.map((r, i) => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-400 font-mono text-xs">
                    {pagination ? (pagination.currentPage - 1) * 50 + (i + 1) : i + 1}
                  </td>
                  <td className="p-4 font-bold text-festika-navy">{r.name}</td>
                  <td className="p-4 text-gray-600 font-mono text-xs">{r.phone}</td>
                  <td className="p-4">
                    <span className="bg-festika-teal/10 text-festika-teal px-2 py-0.5 text-[10px] font-bold">
                      {r.major}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-festika-orange/10 text-festika-orange px-2 py-0.5 text-[10px] font-bold">
                      {r.year}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="bg-gray-50 p-4 border-t-2 border-festika-navy flex items-center justify-between">
          <p className="text-xs font-bold text-festika-navy">
            Halaman {pagination.currentPage} dari {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={pagination.currentPage <= 1 || isLoading}
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              className="px-4 py-1.5 border-2 border-festika-navy font-bold text-sm bg-white hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            <button
              disabled={pagination.currentPage >= pagination.totalPages || isLoading}
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              className="px-4 py-1.5 border-2 border-festika-navy font-bold text-sm bg-festika-navy text-white hover:bg-festika-navy/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-[2px_2px_0_0_#F5A623]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
