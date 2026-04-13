import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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

export default function SignUpPage() {
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

        <div className="rounded-3xl border border-blue-900/40 bg-[#071122]/80 p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-8 flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-blue-500/60 bg-blue-500/5 text-slate-400">
              📷
            </div>
            <p className="mt-3 text-sm text-slate-400">Upload Profile Picture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Username</label>
              <input className="w-full rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm outline-none placeholder:text-slate-500" placeholder="@handle" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input className="w-full rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm outline-none placeholder:text-slate-500" placeholder="name@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Password</label>
              <input type="password" className="w-full rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm outline-none" placeholder="••••••••" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Confirm Password</label>
              <input type="password" className="w-full rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm outline-none" placeholder="••••••••" />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-slate-300">Short Bio (Optional)</label>
            <textarea rows={4} className="w-full rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm outline-none placeholder:text-slate-500" placeholder="Frontend Developer @ Startup | Tech enthusiast" />
          </div>

          <button className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold shadow-[0_0_20px_rgba(37,99,235,0.65)] transition hover:bg-blue-500">
            Create Account
          </button>

          <p className="mt-5 text-center text-xs text-slate-400">
            By signing up, you agree to our <span className="text-blue-400">Terms of Service</span> and <span className="text-blue-400">Privacy Policy</span>.
          </p>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
