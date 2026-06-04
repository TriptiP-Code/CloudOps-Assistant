import { useEffect, useState } from "react";
import api from "../services/api";

const Findings = () => {
  const [findings, setFindings] = useState([]);

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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Findings
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
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
                className="border-b"
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
          <div className="p-6 text-center">
            No Findings Yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Findings;