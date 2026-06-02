import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/login",
        form
      );

      login(res.data.token);

      navigate("/");
    } catch (err) {
      alert("Login Failed");
    }
  };
const token = localStorage.getItem("token");

if (token) {
  return <Navigate to="/" replace />;
}
  // return (
  //   <div className="h-screen flex justify-center items-center bg-gray-100">
  //     <form
  //       onSubmit={handleSubmit}
  //       className="bg-white p-8 rounded-xl shadow w-96"
  //     >
  //       <h2 className="text-2xl font-bold mb-6">
  //         Login
  //       </h2>

  //       <input
  //         className="border p-2 w-full mb-4"
  //         placeholder="Email"
  //         onChange={(e) =>
  //           setForm({
  //             ...form,
  //             email: e.target.value,
  //           })
  //         }
  //       />

  //       <input
  //         type="password"
  //         className="border p-2 w-full mb-4"
  //         placeholder="Password"
  //         onChange={(e) =>
  //           setForm({
  //             ...form,
  //             password: e.target.value,
  //           })
  //         }
  //       />

  //       <button className="bg-blue-600 text-white p-2 w-full rounded">
  //         Login
  //       </button>
  //     </form>
  //   </div>
  // );

  return (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl"
    >

      <h1 className="text-3xl font-bold text-white mb-2">
        CloudOps Assistant
      </h1>

      <p className="text-slate-400 mb-8">
        Sign in to your account
      </p>

      <input
        className="w-full p-3 mb-4 rounded-lg bg-slate-800 border border-slate-700 text-white"
        placeholder="Email"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        className="w-full p-3 mb-6 rounded-lg bg-slate-800 border border-slate-700 text-white"
        placeholder="Password"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 text-white font-semibold"
      >
        Login
      </button>
      <div className="mt-6 text-center">

  <p className="text-slate-400">
    Don't have an account?
  </p>

  <Link
    to="/register"
    className="text-blue-400 hover:text-blue-300 font-medium"
  >
    Create Account
  </Link>

</div>

    </form>

  </div>
);
};

export default Login;