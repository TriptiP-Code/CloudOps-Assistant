import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8 bg-gray-100">
          <h2 className="text-3xl font-bold mb-6">
            Cloud Overview
          </h2>

          <div className="grid grid-cols-4 gap-4">
            <StatCard
              title="AWS Accounts"
              value="0"
            />

            <StatCard
              title="Findings"
              value="0"
            />

            <StatCard
              title="Savings"
              value="$0"
            />

            <StatCard
              title="Scans"
              value="0"
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;