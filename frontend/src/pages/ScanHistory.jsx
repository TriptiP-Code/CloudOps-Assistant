import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const ScanHistory = () => {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    fetchScans();
  }, []);

  const navigate = useNavigate();

  const fetchScans = async () => {
    try {
      const res = await api.get("/aws/scans");

      setScans(res.data.scans);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white p-8">
      <button
  onClick={() => navigate("/dashboard")}
  className="mb-6 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg"
>
  ← Dashboard
</button>
      <h1 className="text-3xl font-bold mb-6">
        Scan History
      </h1>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
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
                className="border-b border-slate-800 hover:bg-slate-800"
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
          <div className="p-10 text-center text-slate-400">
            No scans executed yet.
            Connect an AWS account and run your first scan.
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanHistory;