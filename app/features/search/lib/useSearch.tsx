import { useEffect, useRef, useState } from 'react';

import { SearchItem } from '../types';
import { DEBOUNCE_DELAY, mockSearch } from './constants';

export const useSearch = () => {
  const [recent, setRecent] = useState<SearchItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('recent-searches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!mounted.current) return;

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!query.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }

    setLoading(true);

    debounceTimer.current = setTimeout(async () => {
      try {
        const data = await mockSearch(query);
        if (mounted.current) {
          setResults(data);
          setLoading(false);
        }
      } catch {
        if (mounted.current) {
          setResults([]);
          setLoading(false);
        }
      }
    }, DEBOUNCE_DELAY);

    return () => {
      mounted.current = false;
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  const saveRecent = (item: SearchItem) => {
    const newRecent = [item, ...recent.filter((i) => i.id !== item.id)].slice(
      0,
      5,
    );
    setRecent(newRecent);
    try {
      localStorage.setItem('recent-searches', JSON.stringify(newRecent));
    } catch (e) {
      console.error('Failed to save recent search', e);
    }
  };

  const clearRecent = () => {
    setRecent([]);
    try {
      localStorage.removeItem('recent-searches');
    } catch (e) {
      console.error('Failed to clear recent searches', e);
    }
  };

  return {
    query,
    setQuery,
    results,
    loading,
    recent,
    saveRecent,
    clearRecent,
  };
};
