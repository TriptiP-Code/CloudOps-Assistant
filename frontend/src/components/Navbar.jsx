// const Navbar = () => {
//   return (
//     <nav className="bg-slate-900 text-white px-6 py-4">
//       <h1 className="text-2xl font-bold">
//         CloudOps Assistant
//       </h1>
//     </nav>
//   );
// };

// export default Navbar;

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="h-16 bg-slate-900 border-b border-slate-800 flex justify-between items-center px-8">
      <h1 className="text-2xl font-bold text-white">
        CloudOps Assistant
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;