import React, { useState } from 'react';
import { X, Send, Trash2, Sparkles, Clock } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

const ALL_EMOJIS = ['❤️', '🔥', '😍', '👏', '🚀', '💡', '🎉', '🌟'];

export function ImageModal({ image, reactions = [], comments = [], onClose, onAddReaction, onDeleteReaction, onAddComment, onDeleteComment }) {
  const { user } = useUserStore();
  const [commentText, setCommentText] = useState('');

  if (!image) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(image.id, commentText.trim());
    setCommentText('');
  };

  const reactionCounts = reactions.reduce((acc, r) => {
    acc[r.emoji] = (acc[r.emoji] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-slate-950/70 text-slate-400 hover:text-white rounded-full">
          <X className="w-5 h-5" />
        </button>

        <div className="w-full md:w-3/5 bg-slate-950 flex flex-col justify-between">
          <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
            <img src={image.url} alt={image.title} className="max-h-[75vh] w-full object-contain" />
          </div>
          <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">{image.title}</h2>
              <p className="text-xs text-slate-400">By {image.author}</p>
            </div>
            <span className="text-xs bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full">{image.category}</span>
          </div>
        </div>

        <div className="w-full md:w-2/5 flex flex-col bg-slate-900 border-l border-slate-800">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Live Interactions
            </h3>
            <span className="text-xs text-slate-400">{comments.length} comments</span>
          </div>

          <div className="p-4 border-b border-slate-800 bg-slate-950/40">
            <div className="flex flex-wrap gap-2">
              {ALL_EMOJIS.map(emoji => {
                const myReaction = reactions.find(r => r.emoji === emoji && r.userId === user.userId);
                const count = reactionCounts[emoji] || 0;
                return (
                  <button
                    key={emoji}
                    onClick={() => myReaction ? onDeleteReaction(myReaction.id) : onAddReaction(image.id, emoji)}
                    className={`px-2.5 py-1.5 rounded-xl border text-sm flex items-center gap-1.5 ${
                      myReaction ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold' : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span>{emoji}</span>
                    {count > 0 && <span className="text-xs text-slate-400">{count}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {comments.map(c => (
              <div key={c.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-300">{c.userName}</span>
                  {c.userId === user.userId && (
                    <button onClick={() => onDeleteComment(c.id)} className="text-slate-500 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-200">{c.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 bg-slate-950/80 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add real-time comment..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <button type="submit" disabled={!commentText.trim()} className="p-2.5 bg-indigo-600 text-white rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}