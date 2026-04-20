import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const API = "http://localhost:5999/api";

const authAxios = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: API,
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getUserFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
};

export default function Profile() {
  const [myNotes, setMyNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getUserFromToken();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await authAxios().get("/notes/my-notes");
        setMyNotes(res.data.notes);
      } catch {
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const publicNotes = myNotes.filter((n) => n.isPublic);
  const privateNotes = myNotes.filter((n) => !n.isPublic);
  const totalLikes = myNotes.reduce((acc, n) => acc + (n.likes?.length || 0), 0);

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#071122", color: "#fff", border: "1px solid #1e3a5f" },
        }}
      />

      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 p-6 md:p-10 max-w-4xl mx-auto">

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-blue-400 transition"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 rounded-3xl border border-blue-900/40 bg-[#071122]/80 p-8 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-bold shadow-[0_0_25px_rgba(37,99,235,0.5)]">
              {user?.userName?.[0]?.toUpperCase() || "U"}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">
                @{user?.userName || "User"}
              </h1>
              <p className="mt-1 text-sm text-slate-400">NoteVault member</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: "Total Notes", value: myNotes.length },
              { label: "Public", value: publicNotes.length },
              { label: "Total Likes", value: totalLikes },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="rounded-2xl border border-slate-800 bg-[#0a1630] p-4 text-center"
              >
                <p className="text-2xl font-bold text-blue-400">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notes list */}
        <h2 className="mb-6 text-xl font-semibold text-slate-300">Your Notes</h2>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : myNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <p className="text-5xl mb-4">📝</p>
            <p>No notes yet. Go create some!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myNotes.map((note, i) => (
              <motion.div
                key={note._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-slate-800 bg-[#071122]/90 p-5 hover:border-blue-500/50 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-blue-300">{note.tittle}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${note.isPublic ? "bg-blue-900/40 text-blue-400" : "bg-slate-800 text-slate-400"}`}>
                        {note.isPublic ? "🌐 Public" : "🔒 Private"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{note.discription}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0 text-xs text-slate-500">
                    <span>{timeAgo(note.createdAt)}</span>
                    <span className="flex items-center gap-1">
                      ❤️ {note.likes?.length || 0}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
