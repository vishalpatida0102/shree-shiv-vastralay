import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'shree_shiv_vastralay_favorites';

function getFavorites(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Simple event emitter for cross-component sync
const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((fn) => fn());
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(getFavorites);

  useEffect(() => {
    const sync = () => setFavorites(getFavorites());
    listeners.add(sync);
    return () => { listeners.delete(sync); };
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    const current = getFavorites();
    const updated = current.includes(id)
      ? current.filter((fid) => fid !== id)
      : [...current, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setFavorites(updated);
    notify();
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite, count: favorites.length };
}
