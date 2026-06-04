import { useEffect, useState } from "react";
import api from "../services/api";

const ScanHistory = () => {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      const res = await api.get("/aws/scans");

      setScans(res.data.scans);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Scan History
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">
                AWS Account
              </th>

              <th className="p-3 text-left">
                Scan Date
              </th>

              <th className="p-3 text-left">
                Findings
              </th>
            </tr>
          </thead>

          <tbody>
            {scans.map((scan) => (
              <tr
                key={scan.id}
                className="border-b"
              >
                <td className="p-3">
                  {scan.account_name}
                </td>

                <td className="p-3">
                  {new Date(
                    scan.scan_date
                  ).toLocaleString()}
                </td>

                <td className="p-3">
                  {scan.findings_count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {scans.length === 0 && (
          <div className="p-6 text-center">
            No Scan History Found
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanHistory;