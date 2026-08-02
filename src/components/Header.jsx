import React from 'react';
import { Camera, RefreshCw, Zap, Layers, Sparkles } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

export function Header({ totalInteractions, activeTab, setActiveTab }) {
  const { user, regenerateIdentity } = useUserStore();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Camera className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg text-white tracking-tight">Foto Owl</h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3 fill-indigo-400" /> InstantDB Sync
              </span>
            </div>
            <p className="text-xs text-slate-400">Real-Time Interactive Gallery</p>
          </div>
        </div>

        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'gallery' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Gallery
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'feed' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Live Feed ({totalInteractions})
          </button>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 px-3 py-1.5 rounded-xl">
          <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: user.color }} />
          <span className="text-xs font-semibold text-slate-200">{user.userName}</span>
          <button onClick={regenerateIdentity} title="Switch Identity" className="ml-2 text-slate-400 hover:text-white">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}