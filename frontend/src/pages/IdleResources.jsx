import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const IdleResources = () => {
  const [resources, setResources] =
    useState([]);

  const [totalSavings,
    setTotalSavings] =
    useState(0);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources =
    async () => {
      try {
        const res =
          await api.get(
            "/aws/idle-resources"
          );

        setResources(
          res.data.resources
        );

        setTotalSavings(
          res.data.totalSavings
        );
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div className="bg-slate-950 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-8">

          <h1 className="text-4xl font-bold text-white mb-6">
            Idle Resources
          </h1>

          <div className="bg-emerald-950 border border-emerald-700 rounded-xl p-6 mb-8">

            <h2 className="text-2xl font-bold text-emerald-400">
              💰 Potential Savings
            </h2>

            <p className="text-white mt-3">
              You can save approximately
              <span className="font-bold text-emerald-400">
                {" "}
                ${totalSavings}/month
              </span>
              {" "}by removing or
              rightsizing idle resources.
            </p>

          </div>

          <div className="bg-slate-900 rounded-xl p-6">

            <table className="w-full text-white">

              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-3 text-left">
                    Instance ID
                  </th>

                  <th className="py-3 text-left">
                    Type
                  </th>

                  <th className="py-3 text-left">
                    State
                  </th>

                  <th className="py-3 text-left">
                    Savings
                  </th>
                </tr>
              </thead>

              <tbody>

                {resources.map(
                  (resource) => (
                    <tr
                      key={
                        resource.resource_id
                      }
                      className="border-b border-slate-800"
                    >
                      <td className="py-3">
                        {
                          resource.resource_id
                        }
                      </td>

                      <td className="py-3">
                        {
                          resource.instance_type
                        }
                      </td>

                      <td className="py-3 text-yellow-400">
                        {
                          resource.state
                        }
                      </td>

                      <td className="py-3 text-green-400">
                        $
                        {
                          resource.monthly_savings
                        }
                      </td>
                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>
  );
};

export default IdleResources;