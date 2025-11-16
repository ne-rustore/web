import type { SearchItem } from '../types';

import { useEffect, useRef, useState } from 'react';

import { useSearchStore } from '@/store/searchStore';
import { searchApps } from './api';
import { DEBOUNCE_DELAY } from './constants';

export const useSearch = () => {
  const { recent, saveRecent, clearRecent } = useSearchStore();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const mounted = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!mounted.current) return;
    if (timer.current) clearTimeout(timer.current);

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchApps(query);
        if (mounted.current) setResults(data);
      } catch {
        if (mounted.current) setResults([]);
      } finally {
        if (mounted.current) setLoading(false);
      }
    }, DEBOUNCE_DELAY);

    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query]);

  return { query, setQuery, results, loading, recent, saveRecent, clearRecent };
};
