import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import api from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    accounts: 0,
    findings: 0,
    scans: 0,
    savings: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        accountsRes,
        findingsRes,
        scansRes,
      ] = await Promise.all([
        api.get("/aws/accounts"),
        api.get("/aws/findings"),
        api.get("/aws/scans"),
      ]);

      setStats({
        accounts: accountsRes.data.length,
        findings:
          findingsRes.data.findings.length,
        scans:
          scansRes.data.scans.length,
        savings: 0,
      });
    } catch (error) {
      console.error(
        "Dashboard Load Error",
        error
      );
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white">
              Cloud Overview
            </h1>

            <p className="text-slate-400 mt-2">
              Monitor AWS accounts,
              findings and optimization
              opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              title="AWS Accounts"
              value={stats.accounts}
            />

            <StatCard
              title="Findings"
              value={stats.findings}
            />

            <StatCard
              title="Potential Savings"
              value={`$${stats.savings}`}
            />

            <StatCard
              title="Scans"
              value={stats.scans}
            />
          </div>

          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h2 className="text-white text-xl font-semibold mb-4">
              Welcome to CloudOps Assistant
            </h2>

            <p className="text-slate-400">
              Connect AWS accounts,
              run infrastructure scans,
              identify waste,
              estimate savings and
              automate remediation.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;