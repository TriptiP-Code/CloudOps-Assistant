import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const ScanHistory = () => {
  const [scans, setScans] = useState([]);
  const [showCleanup, setShowCleanup] =
    useState(false);

  const navigate = useNavigate();

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

  const runCleanup = async (
    endpoint,
    message
  ) => {
    const confirmed =
      window.confirm(message);

    if (!confirmed) return;

    try {
      await api.delete(endpoint);

      alert("Cleanup Completed");

      fetchScans();

      setShowCleanup(false);
    } catch (err) {
      console.error(err);

      alert( err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white p-8">

      {/* Dashboard Button */}

      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg"
      >
        ← Dashboard
      </button>

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Scan History
        </h1>

        <div className="relative">

          <button
            onClick={() =>
              setShowCleanup(
                !showCleanup
              )
            }
            className="
            bg-red-600
            hover:bg-red-700
            px-4
            py-2
            rounded-lg
            font-medium
            "
          >
            Cleanup ▼
          </button>

          {showCleanup && (

            <div
              className="
              absolute
              right-0
              mt-2
              w-64
              bg-slate-900
              border
              border-slate-700
              rounded-xl
              shadow-xl
              z-50
              overflow-hidden
              "
            >

              <button
                onClick={() =>
                  runCleanup(
                    "/aws/scans/latest",
                    "Delete latest scan?"
                  )
                }
                className="
                w-full
                text-left
                px-4
                py-3
                hover:bg-slate-800
                "
              >
                Delete Latest Scan
              </button>

              <button
                onClick={() =>
                  runCleanup(
                    "/aws/scans/cleanup/1hour",
                    "Delete scans from last 1 hour?"
                  )
                }
                className="
                w-full
                text-left
                px-4
                py-3
                hover:bg-slate-800
                "
              >
                Delete Last 1 Hour
              </button>

              <button
                onClick={() =>
                  runCleanup(
                    "/aws/scans/cleanup/5hours",
                    "Delete scans from last 5 hours?"
                  )
                }
                className="
                w-full
                text-left
                px-4
                py-3
                hover:bg-slate-800
                "
              >
                Delete Last 5 Hours
              </button>

              <button
                onClick={() =>
                  runCleanup(
                    "/aws/scans/cleanup/24hours",
                    "Delete scans from last 24 hours?"
                  )
                }
                className="
                w-full
                text-left
                px-4
                py-3
                hover:bg-slate-800
                "
              >
                Delete Last 24 Hours
              </button>

              <button
                onClick={() =>
                  runCleanup(
                    "/aws/scans/cleanup/7days",
                    "Delete scans from last 7 days?"
                  )
                }
                className="
                w-full
                text-left
                px-4
                py-3
                hover:bg-slate-800
                "
              >
                Delete Last 7 Days
              </button>

              <button
                onClick={() =>
                  runCleanup(
                    "/aws/scans/cleanup/30days",
                    "Delete scans from last 30 days?"
                  )
                }
                className="
                w-full
                text-left
                px-4
                py-3
                hover:bg-slate-800
                "
              >
                Delete Last 30 Days
              </button>

              <button
                onClick={() =>
                  runCleanup(
                    "/aws/scans",
                    "Delete ALL scan history?"
                  )
                }
                className="
                w-full
                text-left
                px-4
                py-3
                text-red-400
                hover:bg-red-900
                "
              >
                Delete Everything
              </button>

            </div>

          )}

        </div>

      </div>

      {/* Table */}

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
                className="
                border-b
                border-slate-800
                hover:bg-slate-800
                "
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

            <br />

            Connect an AWS account and run your first scan.

          </div>
        )}

      </div>

    </div>
  );
};

export default ScanHistory;