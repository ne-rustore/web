'use client';

import type { Application } from './types';

import { useQuery } from '@tanstack/react-query';

const fetchAppById = async (id: number): Promise<Application> => {
  const response = await fetch(`/api/apps/${id}`);
  if (!response.ok) throw new Error('Failed to fetch app');
  return response.json();
};

export function useAppById(id: number) {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => fetchAppById(id),
    enabled: !!id
  });
}
