import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Findings = () => {
  const [findings, setFindings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFindings();
  }, []);

  const fetchFindings = async () => {
    try {
      const res = await api.get("/aws/findings");

      setFindings(res.data.findings);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFindings = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all findings?"
    );

    if (!confirmed) return;

    try {
      await api.delete("/aws/findings");

      setFindings([]);

      alert("All findings deleted successfully");
    } catch (err) {
      console.error(err);

      alert("Failed to delete findings");
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white p-8">

      {/* Navigation */}

      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg"
      >
        ← Dashboard
      </button>

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Findings
        </h1>

        <button
          onClick={deleteFindings}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium"
        >
          Delete All Findings
        </button>

      </div>

      {/* Table */}

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">
                Resource ID
              </th>

              <th className="p-3 text-left">
                Type
              </th>

              <th className="p-3 text-left">
                State
              </th>

              <th className="p-3 text-left">
                Instance Type
              </th>

              <th className="p-3 text-left">
                Created
              </th>
            </tr>
          </thead>

          <tbody>

            {findings.map((finding) => (
              <tr
                key={finding.id}
                className="border-b border-slate-800 hover:bg-slate-800"
              >
                <td className="p-3">
                  {finding.resource_id}
                </td>

                <td className="p-3">
                  {finding.resource_type}
                </td>

                <td className="p-3">
                  {finding.state}
                </td>

                <td className="p-3">
                  {finding.instance_type}
                </td>

                <td className="p-3">
                  {new Date(
                    finding.created_at
                  ).toLocaleString()}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

        {findings.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            No findings yet.
            <br />
            Run a cloud scan to discover resources.
          </div>
        )}

      </div>

    </div>
  );
};

export default Findings;