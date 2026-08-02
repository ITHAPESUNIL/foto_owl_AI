import { create } from 'zustand';

const ADJECTIVES = ['Curious', 'Creative', 'Swift', 'Bright', 'Cosmic', 'Vibrant', 'Zen', 'Mystic'];
const ANIMALS = ['Owl', 'Falcon', 'Panther', 'Phoenix', 'Otter', 'Lynx', 'Fox', 'Panda'];
const COLORS = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7'];

function generateRandomUser() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const num = Math.floor(100 + Math.random() * 900);
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const userId = 'user_' + Math.random().toString(36).substring(2, 9);
  return { userId, userName: `${adj} ${animal} #${num}`, color };
}

const savedUser = JSON.parse(localStorage.getItem('foto_owl_user') || 'null') || generateRandomUser();
localStorage.setItem('foto_owl_user', JSON.stringify(savedUser));

export const useUserStore = create((set) => ({
  user: savedUser,
  regenerateIdentity: () => {
    const newUser = generateRandomUser();
    localStorage.setItem('foto_owl_user', JSON.stringify(newUser));
    set({ user: newUser });
  }
}));