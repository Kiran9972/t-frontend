// src/pages/notes.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  // 🟢 Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await fetch("${API_URL}/api/auth/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      // ✅ Ensure array extraction
      if (data && Array.isArray(data.notes)) {
        setNotes(data.notes);
      } else {
        console.error("Unexpected notes format:", data);
        setNotes([]);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 🟢 Add Note
  const handleAddNote = async () => {
    try {
      const res = await fetch("${API_URL}/api/auth/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newNote }),
      });

      const data = await res.json();
      setMessage(data.message);

      // ✅ Update state safely
      if (res.ok && Array.isArray(data.notes)) {
        setNotes(data.notes);
        setNewNote("");
      }
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // 🟠 Edit Note
  const handleEdit = (id, content) => {
    setEditNoteId(id);
    setNewNote(content);
  };

  // 🟠 Update Note
  const handleUpdateNote = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/notes/${editNoteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newNote }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok && Array.isArray(data.notes)) {
        setNotes(data.notes);
        setNewNote("");
        setEditNoteId(null);
      }
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  // 🔴 Delete Note
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok && Array.isArray(data.notes)) {
        setNotes(data.notes);
      }
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="notes-page">
      <h2>Your Notes</h2>
      <button onClick={handleLogout}>Logout</button>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <div className="note-input">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note..."
        />
        {editNoteId ? (
          <button onClick={handleUpdateNote}>Update</button>
        ) : (
          <button onClick={handleAddNote}>Add</button>
        )}
      </div>

      <ul>
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <li key={note._id}>
              {note.content}
              <div>
                <button onClick={() => handleEdit(note._id, note.content)}>
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(note._id)}>🗑️ Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>No notes found.</p>
        )}
      </ul>
    </div>
  );
}
