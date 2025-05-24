import { useState, useEffect } from 'react';

type GameHistory = {
  game: string;
  address: string;
  amount: string;
  txLink: string;
};

export const useGameHistory = (address: string) => {
  const [history, setHistory] = useState<GameHistory[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(address);
    if (raw) {
      setHistory(JSON.parse(raw));
    }
  }, [address]);

  const save = (game: GameHistory) => {
    if (typeof window === 'undefined') return;

    const existing = JSON.parse(localStorage.getItem(address) || '[]');

    if (existing.length >= 10) {
      existing.pop(); // oldest at the end, so remove last
    }

    existing.unshift(game); // add newest to the front

    localStorage.setItem(address, JSON.stringify(existing));
    console.log('history', history);
    setHistory(existing);
  };

  return { history, save };
};
