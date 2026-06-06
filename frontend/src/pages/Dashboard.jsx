

// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import StatCard from "../components/StatCard";
// import api from "../services/api";

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     awsAccounts: 0,
//     findings: 0,
//     scans: 0,
//     savings: 0,
//   });

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {
//       const res =
//         await api.get(
//           "/dashboard/stats"
//         );

//       setStats(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

  
//   return (
//     <div className="bg-slate-950 min-h-screen">

//       <Navbar />

//       <div className="flex">

//         <Sidebar />

//         <main className="flex-1 p-8">

//           {/* Header */}

//           <div className="mb-8">

//             <h1 className="text-4xl font-bold text-white">
//               Cloud Overview
//             </h1>

//             <p className="text-slate-400 mt-2">
//               Monitor AWS accounts,
//               findings and cloud cost
//               optimization opportunities.
//             </p>

//           </div>

//           {/* Stats */}

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

//             <StatCard
//               title="AWS Accounts"
//               value={stats.awsAccounts}
//             />

//             <StatCard
//               title="Findings"
//               value={stats.findings}
//             />

//             <StatCard
//               title="Potential Savings"
//               value={`$${stats.savings}`}
//             />

//             <StatCard
//               title="Scans"
//               value={stats.scans}
//             />

//           </div>

//           {/* Savings Banner */}

//           <div className="mt-8 bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl p-8 shadow-xl">

//             <h2 className="text-3xl font-bold text-white">
//               💰 Optimization Opportunity Found
//             </h2>

//             <p className="text-white/90 mt-3 text-lg">
//               You can potentially save
//               <span className="font-bold">
//                 {" "}
//                 ${stats.savings}/month
//               </span>
//               {" "}
//               by cleaning up idle AWS resources.
//             </p>

//             <div className="mt-4 bg-white/10 rounded-xl p-4">
//               <p className="text-white">
//                 Recommendation:
//               </p>

//               <p className="text-white/90 mt-2">
//                 Review stopped EC2 instances
//                 and terminate resources that
//                 are no longer required.
//               </p>
//             </div>

//           </div>

//           {/* Cloud Summary */}

//           <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-8">

//             <h2 className="text-white text-2xl font-semibold mb-4">
//               Infrastructure Summary
//             </h2>

//             <div className="grid md:grid-cols-2 gap-6">

//               <div className="bg-slate-800 rounded-xl p-5">
//                 <h3 className="text-blue-400 font-semibold">
//                   Active Monitoring
//                 </h3>

//                 <p className="text-slate-300 mt-2">
//                   {stats.awsAccounts}
//                   {" "}
//                   AWS account(s) connected.
//                 </p>
//               </div>

//               <div className="bg-slate-800 rounded-xl p-5">
//                 <h3 className="text-orange-400 font-semibold">
//                   Findings Detected
//                 </h3>

//                 <p className="text-slate-300 mt-2">
//                   {stats.findings}
//                   {" "}
//                   cloud findings discovered.
//                 </p>
//               </div>

//               <div className="bg-slate-800 rounded-xl p-5">
//                 <h3 className="text-green-400 font-semibold">
//                   Monthly Savings
//                 </h3>

//                 <p className="text-slate-300 mt-2">
//                   Estimated savings:
//                   {" "}
//                   ${stats.savings}/month
//                 </p>
//               </div>

//               <div className="bg-slate-800 rounded-xl p-5">
//                 <h3 className="text-purple-400 font-semibold">
//                   Total Scans
//                 </h3>

//                 <p className="text-slate-300 mt-2">
//                   {stats.scans}
//                   {" "}
//                   infrastructure scans completed.
//                 </p>
//               </div>

//             </div>

//           </div>

//         </main>

//       </div>

//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import FindingsTrendChart from "../components/FindingsTrendChart";
import api from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    awsAccounts: 0,
    findings: 0,
    scans: 0,
    savings: 0,
  });

  const [trendData, setTrendData] =
    useState([]);

  useEffect(() => {
    loadDashboard();
    loadTrendData();
  }, []);

  const loadDashboard = async () => {
    try {
      const res =
        await api.get(
          "/dashboard/stats"
        );

      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadTrendData =
    async () => {
      try {
        const res =
          await api.get(
            "/dashboard/trend"
          );

        setTrendData(
          res.data.trend
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

          {/* Header */}

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white">
              Cloud Overview
            </h1>

            <p className="text-slate-400 mt-2">
              Monitor AWS accounts,
              findings and cloud cost
              optimization opportunities.
            </p>
          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
              title="AWS Accounts"
              value={stats.awsAccounts}
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

          {/* Savings Banner */}

          <div className="mt-8 bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl p-8 shadow-xl">

            <h2 className="text-3xl font-bold text-white">
              💰 Optimization Opportunity Found
            </h2>

            <p className="text-white/90 mt-3 text-lg">
              You can potentially save
              <span className="font-bold">
                {" "}
                ${stats.savings}/month
              </span>
              {" "}
              by cleaning up idle AWS resources.
            </p>

            <div className="mt-4 bg-white/10 rounded-xl p-4">
              <p className="text-white">
                Recommendation:
              </p>

              <p className="text-white/90 mt-2">
                Review stopped EC2 instances
                and terminate resources that
                are no longer required.
              </p>
            </div>

          </div>

          {/* Infrastructure Summary */}

          <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-8">

            <h2 className="text-white text-2xl font-semibold mb-4">
              Infrastructure Summary
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-slate-800 rounded-xl p-5">
                <h3 className="text-blue-400 font-semibold">
                  Active Monitoring
                </h3>

                <p className="text-slate-300 mt-2">
                  {stats.awsAccounts}
                  {" "}
                  AWS account(s) connected.
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-5">
                <h3 className="text-orange-400 font-semibold">
                  Findings Detected
                </h3>

                <p className="text-slate-300 mt-2">
                  {stats.findings}
                  {" "}
                  cloud findings discovered.
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-5">
                <h3 className="text-green-400 font-semibold">
                  Monthly Savings
                </h3>

                <p className="text-slate-300 mt-2">
                  Estimated savings:
                  {" "}
                  ${stats.savings}/month
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-5">
                <h3 className="text-purple-400 font-semibold">
                  Total Scans
                </h3>

                <p className="text-slate-300 mt-2">
                  {stats.scans}
                  {" "}
                  infrastructure scans completed.
                </p>
              </div>

            </div>

          </div>

          {/* Findings Trend Chart */}

          <div className="mt-8">
            <FindingsTrendChart
              data={trendData}
            />
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;