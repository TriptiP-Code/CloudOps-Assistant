// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <aside className="w-64 bg-slate-800 text-white min-h-screen">
//       <div className="p-4 font-bold text-xl">
//         Dashboard
//       </div>

//       <nav className="flex flex-col gap-2 p-4">
//         <Link to="/">Home</Link>

//         <Link to="/accounts">
//           AWS Accounts
//         </Link>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen border-r border-slate-800">

      <div className="p-6">
        <h2 className="text-xl font-bold">
          Navigation
        </h2>
      </div>

      <nav className="flex flex-col gap-2 px-4">

        <Link
          to="/"
          className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/accounts"
          className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
        >
          AWS Accounts
        </Link>

      </nav>
    </aside>
  );
};

export default Sidebar;