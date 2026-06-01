import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen">
      <div className="p-4 font-bold text-xl">
        Dashboard
      </div>

      <nav className="flex flex-col gap-2 p-4">
        <Link to="/">Home</Link>

        <Link to="/accounts">
          AWS Accounts
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;