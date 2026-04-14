import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function TypingTitle() {
  const text = "Join NoteVault";
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = 120;
    const deleteSpeed = 70;
    const pauseTime = 1000;

    let timeout;

    if (!isDeleting && display.length < text.length) {
      timeout = setTimeout(() => {
        setDisplay(text.slice(0, display.length + 1));
      }, typeSpeed);
    } else if (!isDeleting && display.length === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && display.length > 0) {
      timeout = setTimeout(() => {
        setDisplay(text.slice(0, display.length - 1));
      }, deleteSpeed);
    } else if (isDeleting && display.length === 0) {
      timeout = setTimeout(() => setIsDeleting(false), 300);
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting]);

  return (
    <h1 className="text-4xl font-bold min-h-[48px]">
      {display}
      <span className="animate-pulse text-blue-400">|</span>
    </h1>
  );
}

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
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
  console.log("submit clicked");
  console.log(formData);

  try {
    const res = await axios.post(
      "http://localhost:5999/api/users/signup",
      formData
    );

    console.log("SUCCESS:", res.data);
    navigate("/login");
  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);
  }
};

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-black to-[#0b0b3b]" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-600/10 blur-3xl" />
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-700/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl text-white">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold shadow-[0_0_25px_rgba(37,99,235,0.7)]">
            N
          </div>

          <TypingTitle />

          <p className="mt-2 text-sm text-slate-400">
            Create an account to start sharing your knowledge.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-blue-900/40 bg-[#071122]/80 p-8 shadow-2xl backdrop-blur-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Username
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm outline-none"
                placeholder="@handle"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm outline-none"
                placeholder="name@example.com"
              />
            </div>

            <div className="md:col-span-2">
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
            className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold shadow-[0_0_20px_rgba(37,99,235,0.65)] transition hover:bg-blue-500"
          >
            Create Account
          </button>
<p className="mt-6 text-center text-sm text-slate-400">
  Already have an account?{" "}
  <Link to="/login" className="text-blue-400">
    Login
  </Link>
</p>
        </form>
      </div>
    </div>
  );
}