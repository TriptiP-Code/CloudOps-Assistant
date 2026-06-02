// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import StatCard from "../components/StatCard";

// const Dashboard = () => {
//   return (
//     <>
//       <Navbar />

//       <div className="flex">
//         <Sidebar />

//         <main className="flex-1 p-8 bg-gray-100">
//           <h2 className="text-3xl font-bold mb-6">
//             Cloud Overview
//           </h2>

//           <div className="grid grid-cols-4 gap-4">
//             <StatCard
//               title="AWS Accounts"
//               value="0"
//             />

//             <StatCard
//               title="Findings"
//               value="0"
//             />

//             <StatCard
//               title="Savings"
//               value="$0"
//             />

//             <StatCard
//               title="Scans"
//               value="0"
//             />
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

const Dashboard = () => {
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
              Monitor AWS accounts, findings and optimization opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
              title="AWS Accounts"
              value="1"
            />

            <StatCard
              title="Findings"
              value="0"
            />

            <StatCard
              title="Potential Savings"
              value="$0"
            />

            <StatCard
              title="Scans"
              value="0"
            />

          </div>

          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-xl p-8">

            <h2 className="text-white text-xl font-semibold mb-4">
              Welcome to CloudOps Assistant
            </h2>

            <p className="text-slate-400">
              Connect AWS accounts, run infrastructure scans,
              identify waste, estimate savings and automate remediation.
            </p>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Dashboard;
