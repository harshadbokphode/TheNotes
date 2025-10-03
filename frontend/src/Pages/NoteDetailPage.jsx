import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note", error);
        toast.error("Failed to fetch note");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/notes/${id}`, note);
      setNote(res.data); // update state with saved note
      toast.success("Note updated successfully");
      setEditing(false);
    } catch (error) {
      console.error("Error updating note", error);
      toast.error("Failed to update note");
    }
  };

  if (loading) return <div className="text-center py-10">Loading note...</div>;
  if (!note) return <div className="text-center py-10">Note not found</div>;

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Notes
          </Link>

          <div className="flex gap-2">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="btn btn-primary"
              >
                Edit Note
              </button>
            ) : (
              <button onClick={handleUpdate} className="btn btn-success">
                Save Changes
              </button>
            )}

            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete
            </button>
          </div>
        </div>

        {/* Editable Form */}
        {editing ? (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) =>
                    setNote({ ...note, title: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Note content"
                  className="textarea textarea-bordered h-40"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">{note.title}</h1>
            <p className="text-base text-gray-700 whitespace-pre-wrap">
              {note.content}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Created at:{" "}
              {note.createdAt
                ? new Date(note.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteDetailPage;
