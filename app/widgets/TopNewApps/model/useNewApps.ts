'use client';

import type { AppListItem } from '@/shared/api/types';

import { useQuery } from '@tanstack/react-query';

interface UseNewAppsParams {
  limit?: number;
  category?: string;
}

const fetchNewApps = async ({
  limit = 6,
  category
}: UseNewAppsParams): Promise<AppListItem[]> => {
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit.toString());
  if (category) params.append('category', category);

  const response = await fetch(`/api/apps/new?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch new apps');

  const data = await response.json();
  return data.items || [];
};

export function useNewApps({ limit = 6, category }: UseNewAppsParams = {}) {
  return useQuery<AppListItem[], Error>({
    queryKey: ['new-apps', limit, category],
    queryFn: () => fetchNewApps({ limit, category }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  });
}
