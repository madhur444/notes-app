import SignUp from "./SignUp";
import { Link } from "react-router-dom";
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4">
      {/* ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-black to-[#0b0b3b]" />
      <div className="absolute -left-10 top-24 h-32 w-32 rotate-12 rounded-xl bg-blue-500/5 blur-sm" />
      <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-blue-700/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md text-white">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold shadow-[0_0_25px_rgba(37,99,235,0.7)]">
            N
          </div>
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-sm text-slate-400">
            Share your thoughts, build your knowledge
          </p>
        </div>

        <div className="rounded-3xl border border-blue-900/40 bg-[#071122]/80 p-6 shadow-2xl backdrop-blur-md">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-slate-300">Password</label>
                <button className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold shadow-[0_0_20px_rgba(37,99,235,0.65)] transition hover:bg-blue-500">
              Sign In
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-slate-500">
            <div className="h-px flex-1 bg-slate-800" />
            <span>Or continue with</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="rounded-xl border border-slate-800 bg-[#0a1630] py-3 text-sm font-medium hover:border-slate-700">
              GitHub
            </button>
            <button className="rounded-xl border border-slate-800 bg-[#0a1630] py-3 text-sm font-medium hover:border-slate-700">
              Google
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
         <span className="text-blue-400"><p className="mt-6 text-center text-sm text-slate-400">
  Don't have an account?{" "}
  <Link to="/signup" className="text-blue-400 hover:text-blue-300">
    Sign Up
  </Link>
</p></span>
        </p>
      </div>
    </div>
  );
}
