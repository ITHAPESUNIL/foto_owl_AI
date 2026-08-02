import React, { useState, useEffect } from 'react';
import { db, id } from './lib/instantdb';
import { fetchUnsplashImages } from './lib/unsplash';
import { useUserStore } from './store/useUserStore';
import { Header } from './components/Header';
import { ImageCard } from './components/ImageCard';
import { ImageModal } from './components/ImageModal';
import { ActivityFeed } from './components/ActivityFeed';
import { Search } from 'lucide-react';

export default function App() {
  const { user } = useUserStore();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('gallery');
  const [searchQuery, setSearchQuery] = useState('');

  const { isLoading, error, data } = db.useQuery({
    reactions: {},
    comments: {},
    activities: {}
  });

  useEffect(() => {
    async function loadData() {
      const imgs = await fetchUnsplashImages();
      setImages(imgs);
    }
    loadData();
  }, []);

  const reactions = data?.reactions || [];
  const comments = data?.comments || [];
  const activities = data?.activities || [];

  const handleAddReaction = (imageId, emoji) => {
    const reactionId = id();
    const actId = id();
    const img = images.find(i => i.id === imageId);

    db.transact([
      db.tx.reactions[reactionId].update({ imageId, emoji, userId: user.userId, userName: user.userName, createdAt: Date.now() }),
      db.tx.activities[actId].update({ type: 'reaction', imageId, imageTitle: img?.title || 'Photo', emoji, userId: user.userId, userName: user.userName, createdAt: Date.now() })
    ]);
  };

  const handleDeleteReaction = (reactionId) => {
    db.transact([db.tx.reactions[reactionId].delete()]);
  };

  const handleAddComment = (imageId, text) => {
    const commentId = id();
    const actId = id();
    const img = images.find(i => i.id === imageId);

    db.transact([
      db.tx.comments[commentId].update({ imageId, text, userId: user.userId, userName: user.userName, createdAt: Date.now() }),
      db.tx.activities[actId].update({ type: 'comment', imageId, imageTitle: img?.title || 'Photo', text, userId: user.userId, userName: user.userName, createdAt: Date.now() })
    ]);
  };

  const handleDeleteComment = (commentId) => {
    db.transact([db.tx.comments[commentId].delete()]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
      <Header totalInteractions={activities.length} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={`space-y-6 ${activeTab === 'feed' ? 'hidden lg:block lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gallery..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {images.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase())).map((img) => (
              <ImageCard
                key={img.id}
                image={img}
                reactions={reactions.filter(r => r.imageId === img.id)}
                comments={comments.filter(c => c.imageId === img.id)}
                onOpenModal={setSelectedImage}
                onAddReaction={handleAddReaction}
              />
            ))}
          </div>
        </div>

        <div className={`h-[calc(100vh-120px)] sticky top-20 ${activeTab === 'gallery' ? 'hidden lg:block lg:col-span-1' : 'col-span-4 lg:col-span-2'}`}>
          <ActivityFeed activities={activities} onSelectImage={(id) => {
            const img = images.find(i => i.id === id);
            if (img) setSelectedImage(img);
          }} />
        </div>
      </main>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          reactions={reactions.filter(r => r.imageId === selectedImage.id)}
          comments={comments.filter(c => c.imageId === selectedImage.id)}
          onClose={() => setSelectedImage(null)}
          onAddReaction={handleAddReaction}
          onDeleteReaction={handleDeleteReaction}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      )}
    </div>
  );
}