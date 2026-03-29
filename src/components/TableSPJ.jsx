export default function TableSPJ({ data }) {
  return (
    <table className="w-full bg-white rounded shadow">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="p-2">No SPJ</th>
          <th className="p-2">Tanggal</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i} className="text-center border-t">
            <td className="p-2">{item["No SPJ"]}</td>
            <td>{item["Tanggal"]}</td>
            <td>
              <span className={`px-2 py-1 rounded text-white ${
                item.Status === "Cair"
                  ? "bg-green-500"
                  : item.Status === "Proses"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}>
                {item.Status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}