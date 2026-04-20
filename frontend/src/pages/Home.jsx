import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const API = "http://localhost:5999/api";

const authAxios = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: API,
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getUserId = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
};

// ─── Modal ─────────────────────────────────────────────────────────────────
function NoteModal({ note, onClose, onSaved }) {
  const [form, setForm] = useState({
    tittle: note?.tittle || "",
    discription: note?.discription || "",
    isPublic: note?.isPublic || false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async () => {
    if (!form.tittle.trim() || !form.discription.trim()) {
      toast.error("Title and description are required.");
      return;
    }
    setLoading(true);
    try {
      const ax = authAxios();
      if (note) {
        const res = await ax.put(`/notes/${note._id}`, form);
        onSaved(res.data.note, "edit");
        toast.success("Note updated!");
      } else {
        const res = await ax.post("/notes", form);
        onSaved(res.data.note, "create");
        toast.success("Note created!");
      }
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-lg rounded-3xl border border-blue-900/40 bg-[#071122] p-8 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <h2 className="mb-6 text-2xl font-bold text-white">
            {note ? "Edit Note" : "Create Note"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Title</label>
              <input
                name="tittle"
                value={form.tittle}
                onChange={handleChange}
                placeholder="Note title..."
                className="w-full rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Description</label>
              <textarea
                name="discription"
                value={form.discription}
                onChange={handleChange}
                rows={4}
                placeholder="Write your note, quote, or thought..."
                className="w-full resize-none rounded-xl border border-blue-900/40 bg-[#0a1630] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <label className="flex cursor-pointer items-center gap-3 select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={form.isPublic}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`h-6 w-11 rounded-full transition-colors duration-200 ${form.isPublic ? "bg-blue-600" : "bg-slate-700"}`} />
                <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${form.isPublic ? "translate-x-6" : "translate-x-1"}`} />
              </div>
              <span className="text-sm text-slate-300">
                {form.isPublic ? "🌐 Public — visible to everyone" : "🔒 Private — only you can see this"}
              </span>
            </label>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-700 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:bg-blue-500 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : note ? "Save Changes" : "Create Note"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Note Card ──────────────────────────────────────────────────────────────
function NoteCard({ note, isOwner, myId, onEdit, onDelete, onLike, index }) {
  const liked = note.likes?.map((id) => id.toString()).includes(myId);

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
      className="group rounded-3xl border border-slate-800 bg-[#071122]/90 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-xl font-semibold text-blue-300 leading-tight">
          {note.tittle}
        </h3>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-xs text-slate-500">{timeAgo(note.createdAt)}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${note.isPublic ? "bg-blue-900/40 text-blue-400" : "bg-slate-800 text-slate-400"}`}>
            {note.isPublic ? "🌐 Public" : "🔒 Private"}
          </span>
        </div>
      </div>

      {note.user?.userName && (
        <p className="mb-2 text-xs text-slate-500">by @{note.user.userName}</p>
      )}

      <p className="mb-6 leading-7 text-slate-400">{note.discription}</p>

      <div className="flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 1.4 }}
          onClick={() => onLike(note._id)}
          className="flex items-center gap-2 text-sm"
        >
          <span className={`text-xl transition ${liked ? "text-red-500" : "text-slate-600 hover:text-red-400"}`}>
            {liked ? "❤️" : "🤍"}
          </span>
          <span className="text-slate-400">{note.likes?.length || 0}</span>
        </motion.button>

        {isOwner && (
          <div className="flex items-center gap-3 opacity-0 transition group-hover:opacity-100">
            <button
              onClick={() => onEdit(note)}
              className="rounded-lg bg-slate-800 px-3 py-1 text-sm hover:bg-slate-700 text-white transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="rounded-lg bg-red-600 px-3 py-1 text-sm hover:bg-red-500 text-white transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Home ───────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("mine");
  const [myNotes, setMyNotes] = useState([]);
  const [publicNotes, setPublicNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const myId = getUserId();

  const fetchMyNotes = async () => {
    try {
      const res = await authAxios().get("/notes/my-notes");
      setMyNotes(res.data.notes);
    } catch {
      toast.error("Failed to fetch your notes");
    }
  };

  const fetchPublicNotes = async () => {
    try {
      const res = await axios.get(`${API}/notes`);
      setPublicNotes(res.data);
    } catch {
      toast.error("Failed to fetch public notes");
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchMyNotes(), fetchPublicNotes()]);
      setLoading(false);
    };
    load();
  }, []);

  const handleSaved = (savedNote, type) => {
    if (type === "create") {
      setMyNotes((prev) => [savedNote, ...prev]);
      if (savedNote.isPublic) setPublicNotes((prev) => [savedNote, ...prev]);
    } else {
      setMyNotes((prev) => prev.map((n) => (n._id === savedNote._id ? savedNote : n)));
      setPublicNotes((prev) =>
        savedNote.isPublic
          ? prev.some((n) => n._id === savedNote._id)
            ? prev.map((n) => (n._id === savedNote._id ? savedNote : n))
            : [savedNote, ...prev]
          : prev.filter((n) => n._id !== savedNote._id)
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await authAxios().delete(`/notes/${id}`);
      setMyNotes((prev) => prev.filter((n) => n._id !== id));
      setPublicNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await authAxios().put(`/notes/${id}/like`);
      const updatedLikes = res.data.likes;
      const update = (notes) =>
        notes.map((n) => (n._id === id ? { ...n, likes: updatedLikes } : n));
      setMyNotes(update);
      setPublicNotes(update);
    } catch {
      toast.error("Could not like note");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out!");
    setTimeout(() => navigate("/login"), 800);
  };

  const activeNotes = tab === "mine" ? myNotes : publicNotes;
  const filtered = activeNotes.filter(
    (n) =>
      n.tittle.toLowerCase().includes(search.toLowerCase()) ||
      n.discription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#071122",
            color: "#fff",
            border: "1px solid #1e3a5f",
          },
        }}
      />

      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 p-6 md:p-10">
        {/* Navbar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-blue-400">NoteVault</h1>
            <p className="mt-1 text-sm text-slate-400">Organize your thoughts beautifully</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="rounded-xl border border-blue-900/40 bg-[#071122] px-5 py-2 text-sm font-semibold text-blue-400 hover:bg-blue-900/20 transition"
            >
              👤 Profile
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold hover:bg-red-500 transition"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Tabs + Create */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 rounded-2xl border border-slate-800 bg-[#071122] p-1 w-fit">
            {["mine", "public"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                  tab === t
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t === "mine" ? `My Notes (${myNotes.length})` : `Public Feed (${publicNotes.length})`}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setModal("create")}
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold shadow-[0_0_20px_rgba(37,99,235,0.5)] transition hover:bg-blue-500"
          >
            + Create Note
          </motion.button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your notes..."
            className="w-full rounded-2xl border border-slate-800 bg-[#071122] px-5 py-4 text-sm outline-none placeholder:text-slate-500 text-white"
          />
        </div>

        {/* Notes */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-slate-500"
          >
            <p className="text-5xl mb-4">📝</p>
            <p className="text-lg">
              {tab === "mine" ? "No notes yet. Create your first one!" : "No public notes yet."}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((note, i) => (
              <NoteCard
                key={note._id}
                note={note}
                index={i}
                myId={myId}
                isOwner={note.user?._id === myId || note.user === myId}
                onEdit={(n) => setModal(n)}
                onDelete={handleDelete}
                onLike={handleLike}
              />
            ))}
          </div>
        )}
      </div>

      {modal && (
        <NoteModal
          note={modal === "create" ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
