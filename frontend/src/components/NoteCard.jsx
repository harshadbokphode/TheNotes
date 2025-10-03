import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios";

const NoteCard = ({ note , setNotes}) => {
  if (!note) return null; // prevent crash if note is undefined
  
  const handleDelete = async (e,id) => {
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    try{
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    }catch (error){
      toast.error("Failed to delete note");
      return;}

  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-200 hover:bg-base-300 hover:shadow-xl transition-all duration-200 border border-base-300 rounded-2xl overflow-hidden"
    >
      {/* Accent top strip */}
      <div className="h-2 w-full bg-gradient-to-r from-primary to-secondary" />

      <div className="card-body">
        {/* Title */}
        <h3 className="card-title text-base-content">
          {note.title || "Untitled Note"}
        </h3>

        {/* Content preview */}
        <p className="text-base-content/70 line-clamp-3">
          {note.content || "No content available"}
        </p>

        {/* Footer */}
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-2">
            <PenSquareIcon className="size-4 text-primary" />
            <button className="btn btn-ghost btn-xs text-error" onClick={(e)=> handleDelete(e, note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
