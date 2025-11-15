'use client';

import type { ApplicationListResponse } from '@/shared/api/types';

import { useQuery } from '@tanstack/react-query';

type Sort = 'popular' | 'rating' | 'new' | 'name';

interface Params {
  category?: string;
  limit?: number;
  sort?: Sort;
}

const fetchApps = async (p: Params): Promise<ApplicationListResponse> => {
  const params = new URLSearchParams();

  if (p.category) params.append('category', p.category);
  if (p.limit) params.append('limit', p.limit.toString());
  if (p.sort) params.append('sort', p.sort);

  const url = `/api/apps?${params}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export function useTopApps({
  category,
  limit = 20,
  sort = 'popular'
}: Params = {}) {
  return useQuery({
    queryKey: ['top-apps', category, limit, sort],
    queryFn: () => fetchApps({ category, limit, sort }),
    retry: 2
  });
}
