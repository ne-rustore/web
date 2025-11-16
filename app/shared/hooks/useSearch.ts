import type { SearchItem } from '@/features/search/types';

import { useEffect, useRef, useState } from 'react';

import { searchApps } from '@/features/search/lib/api'; // <-- новый импорт
import { DEBOUNCE_DELAY } from '@/features/search/lib/constants';
import { useSearchStore } from '@/store/searchStore';

export const useSearch = () => {
  const { recent, saveRecent, clearRecent } = useSearchStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!mounted.current) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!query.trim()) {
      Promise.resolve().then(() => {
        if (mounted.current) {
          setResults([]);
          setLoading(false);
        }
      });
      return;
    }

    Promise.resolve().then(() => {
      if (mounted.current) setLoading(true);
    });

    debounceTimer.current = setTimeout(async () => {
      try {
        const data = await searchApps(query);
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

  return {
    query,
    setQuery,
    results,
    loading,
    recent,
    saveRecent,
    clearRecent
  };
};
