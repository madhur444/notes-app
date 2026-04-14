import React from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

  const notes = [
    {
      id: 1,
      title: "MongoDB Revision",
      content: "Revise schema, model, routes and controllers.",
      date: "Today",
    },
    {
      id: 2,
      title: "React Tasks",
      content: "Complete login token and protected routes.",
      date: "Yesterday",
    },
    {
      id: 3,
      title: "Office Work",
      content: "Finish pending tasks before 5 PM.",
      date: "2 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      {/* background glow */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 p-6 md:p-10">
        {/* Navbar */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-blue-400">
              NoteVault
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Organize your thoughts beautifully
            </p>
          </div>

          <button
  onClick={handleLogout}
  className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold"
>
  Logout
</button>
        </div>

        {/* top action section */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Your Notes</h2>
            <p className="mt-1 text-slate-400">
              Capture ideas, tasks, and memories.
            </p>
          </div>

          <button className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold shadow-[0_0_20px_rgba(37,99,235,0.5)] transition hover:bg-blue-500">
            + Create Note
          </button>
        </div>

        {/* search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search your notes..."
            className="w-full rounded-2xl border border-slate-800 bg-[#071122] px-5 py-4 text-sm outline-none placeholder:text-slate-500"
          />
        </div>

        {/* notes grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="group rounded-3xl border border-slate-800 bg-[#071122]/90 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-blue-300">
                  {note.title}
                </h3>
                <span className="text-xs text-slate-500">{note.date}</span>
              </div>

              <p className="mb-6 leading-7 text-slate-400">
                {note.content}
              </p>

              <div className="flex items-center gap-3 opacity-0 transition group-hover:opacity-100">
                <button className="rounded-lg bg-slate-800 px-3 py-1 text-sm hover:bg-slate-700">
                  Edit
                </button>
                <button className="rounded-lg bg-red-600 px-3 py-1 text-sm hover:bg-red-500">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}