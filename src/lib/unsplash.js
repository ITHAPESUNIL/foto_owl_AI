export const CURATED_IMAGES = [
  {
    id: 'img-1',
    url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000&auto=format&fit=crop',
    title: 'Sahara Dune Horizon',
    author: 'Elena Rostova',
    category: 'Nature'
  },
  {
    id: 'img-2',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
    title: 'Cyberpunk Neon Alley',
    author: 'Kenji Takahashi',
    category: 'Urban'
  },
  {
    id: 'img-3',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
    title: 'Yosemite Alpine Valley',
    author: 'Marcus Vance',
    category: 'Landscape'
  },
  {
    id: 'img-4',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop',
    title: 'Northern Lights Aurora',
    author: 'Astrid Lindgren',
    category: 'Astronomy'
  },
  {
    id: 'img-5',
    url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000&auto=format&fit=crop',
    title: 'Abstract Canvas Symphony',
    author: 'Sofia Chen',
    category: 'Art'
  },
  {
    id: 'img-6',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    title: 'Tropical Sunset Waters',
    author: 'Kai Morgan',
    category: 'Ocean'
  }
];

export async function fetchUnsplashImages() {
  return CURATED_IMAGES;
}