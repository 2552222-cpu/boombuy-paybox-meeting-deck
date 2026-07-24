import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";

export default function SpeakerNotes({ notes }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {open ? (
        <div
          className="bg-gray-950/97 border border-gray-700 rounded-2xl p-5 shadow-2xl"
          style={{ width: 320 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.18em] uppercase">
              📋 Script
            </span>
            <button
              onClick={() => setOpen(false)}
              className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <X className="w-3 h-3 text-gray-300" />
            </button>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">{notes}</p>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          title="Script"
          className="w-10 h-10 rounded-full bg-gray-900/80 border border-gray-600 flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-gray-300" />
        </button>
      )}
    </div>
  );
}
