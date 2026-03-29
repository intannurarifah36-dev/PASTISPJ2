import { useEffect, useState } from "react";
import TableSPJ from "./components/TableSPJ";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // 🔥 DATA DUMMY (BIAR TIDAK ERROR SAAT DEPLOY)
    const dummy = [
      { "No SPJ": "001", "Tanggal": "2025-01-01", "Status": "Cair" },
      { "No SPJ": "002", "Tanggal": "2025-01-02", "Status": "Proses" },
      { "No SPJ": "003", "Tanggal": "2025-01-03", "Status": "Ditolak" }
    ];

    setData(dummy);
    setFiltered(dummy);
  }, []);

  const handleSearch = (keyword) => {
    const result = data.filter(item =>
      item["No SPJ"].toLowerCase().includes(keyword.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📊 PASTI-SPJ Dashboard</h1>

      <SearchBar onSearch={handleSearch} />
      <TableSPJ data={filtered} />
    </div>
  );
}
