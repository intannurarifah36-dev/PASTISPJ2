import { useEffect, useState } from "react";
import TableSPJ from "./components/TableSPJ";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("URL_API_GOOGLE_SCRIPT")
      .then(res => res.json())
      .then(res => {
        setData(res);
        setFiltered(res);
      });
  }, []);

  const handleSearch = (keyword) => {
    const result = data.filter(item =>
      item["No SPJ"]?.toLowerCase().includes(keyword.toLowerCase())
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