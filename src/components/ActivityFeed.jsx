import React from 'react';
import { Sparkles, MessageSquare, Clock, ExternalLink } from 'lucide-react';

export function ActivityFeed({ activities = [], onSelectImage }) {
  return (
    <aside className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <h2 className="font-bold text-slate-200 text-sm">Global Activity Stream</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
        {activities.slice().reverse().map(act => (
          <div
            key={act.id}
            onClick={() => onSelectImage(act.imageId)}
            className="group p-3 bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 rounded-xl cursor-pointer flex gap-3 items-start"
          >
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
              {act.type === 'comment' ? <MessageSquare className="w-4 h-4" /> : <span>{act.emoji}</span>}
            </div>
            <div className="flex-1 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">{act.userName}</span>
                <span className="text-[10px] text-slate-500">{new Date(act.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p className="text-slate-400">
                {act.type === 'comment' ? `commented: "${act.text}"` : `reacted with ${act.emoji} on ${act.imageTitle}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}