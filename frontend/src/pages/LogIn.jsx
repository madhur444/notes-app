import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LogIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login clicked", formData);

    try {
     const res = await axios.post(
    "http://localhost:5999/api/users/login",
    formData
  );

  localStorage.setItem("token", res.data.token);
  navigate("/");
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-blue-900/40 bg-[#071122]/80 p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm outline-none"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}