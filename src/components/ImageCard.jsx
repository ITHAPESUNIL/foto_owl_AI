import React from 'react';
import { MessageSquare, User } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

const EMOJI_PRESETS = ['❤️', '🔥', '😍', '👏', '🚀'];

export function ImageCard({ image, reactions = [], comments = [], onOpenModal, onAddReaction }) {
  const { user } = useUserStore();

  const reactionCounts = reactions.reduce((acc, r) => {
    acc[r.emoji] = (acc[r.emoji] || 0) + 1;
    return acc;
  }, {});

  const myReactions = reactions.filter(r => r.userId === user.userId).map(r => r.emoji);

  return (
    <div className="group bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all flex flex-col">
      <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onOpenModal(image)}>
        <img src={image.url} alt={image.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-70" />
        <div className="absolute top-3 left-3 bg-slate-900/80 px-2.5 py-1 rounded-full text-[11px] text-slate-300">
          {image.category}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div>
            <h3 className="font-bold text-sm text-slate-100">{image.title}</h3>
            <p className="text-[11px] text-slate-400 flex items-center gap-1"><User className="w-3 h-3" /> {image.author}</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-900/70 px-2 py-1 rounded-lg text-xs">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>{comments.length}</span>
          </div>
        </div>
      </div>

      <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 max-w-[65%]">
          {Object.entries(reactionCounts).length > 0 ? (
            Object.entries(reactionCounts).map(([emoji, count]) => (
              <button
                key={emoji}
                onClick={() => onAddReaction(image.id, emoji)}
                className={`px-2 py-1 text-xs rounded-full border flex items-center gap-1 ${
                  myReactions.includes(emoji) ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200' : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <span>{emoji}</span>
                <span className="text-[10px] text-slate-400">{count}</span>
              </button>
            ))
          ) : (
            <span className="text-[11px] text-slate-500 italic">No reactions yet</span>
          )}
        </div>

        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          {EMOJI_PRESETS.slice(0, 3).map(emoji => (
            <button key={emoji} onClick={() => onAddReaction(image.id, emoji)} className="w-7 h-7 flex items-center justify-center text-xs hover:scale-125 transition-transform">
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}