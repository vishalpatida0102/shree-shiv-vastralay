import { useState, useEffect, useCallback } from 'react';
import type { Review } from '../types';

const STORAGE_KEY = 'nagpur_wala_reviews';

function getReviews(): Review[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveReviews(reviews: Review[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((fn) => fn());
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(getReviews);

  useEffect(() => {
    const sync = () => setReviews(getReviews());
    listeners.add(sync);
    return () => { listeners.delete(sync); };
  }, []);

  const addReview = useCallback((data: { name: string; location: string; rating: number; message: string }) => {
    const current = getReviews();
    const newReview: Review = {
      id: Date.now().toString(),
      ...data,
      date: new Date().toISOString(),
      status: 'pending',
    };
    const updated = [newReview, ...current];
    saveReviews(updated);
    setReviews(updated);
    notify();
  }, []);

  const updateStatus = useCallback((id: string, status: Review['status']) => {
    const current = getReviews();
    const updated = current.map((r) => r.id === id ? { ...r, status } : r);
    saveReviews(updated);
    setReviews(updated);
    notify();
  }, []);

  const deleteReview = useCallback((id: string) => {
    const current = getReviews();
    const updated = current.filter((r) => r.id !== id);
    saveReviews(updated);
    setReviews(updated);
    notify();
  }, []);

  const approved = reviews.filter((r) => r.status === 'approved');
  const pending = reviews.filter((r) => r.status === 'pending');

  return { reviews, approved, pending, addReview, updateStatus, deleteReview, pendingCount: pending.length };
}
