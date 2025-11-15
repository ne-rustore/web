'use client';

import type { TopicId } from '@/widgets/Topics';

import { Download } from 'lucide-react';

import { AppCard } from '@/entities/App/ui/AppCard';
import { Button } from '@/shared/ui';
import { useTopApps } from '../api/useTopApps';

interface TopAppsSectionProps {
  category?: TopicId;
  title?: string;
}

export const TopAppsSection = ({
  category,
  title = 'Приложения'
}: TopAppsSectionProps) => {
  const { data, isLoading, isError } = useTopApps({
    category,
    limit: 20,
    sort: 'popular'
  });

  if (isError)
    return (
      <section className='container mx-auto px-4 py-8 text-red-600'>
        Ошибка загрузки приложений
      </section>
    );

  if (isLoading)
    return (
      <section className='container mx-auto px-4 py-8'>
        <h2 className='text-2xl font-bold mb-6 flex items-center'>
          <Download className='mr-2 h-5 w-5 text-blue-600' />
          {title}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );

  const apps = data?.items ?? [];

  return (
    <section className='container mx-auto px-4 py-8'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold flex items-center text-slate-900 dark:text-white'>
          <Download className='mr-2 h-5 w-5 text-blue-600' />
          {title}
        </h2>
        <Button
          variant='ghost'
          className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-1'
        >
          Все приложения
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </Button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {apps.map((app) => (
          <AppCard
            key={app.id}
            id={String(app.id)}
            title={app.name}
            description={app.description ?? ''}
            rating={app.rating ?? 0}
            image={app.icon_url ?? '/placeholder.png'}
            badge={category ? 'Топ категории' : undefined}
            categories={[category].filter(Boolean) as TopicId[]}
          />
        ))}
      </div>
    </section>
  );
};

function SkeletonCard() {
  return (
    <div className='rounded-xl border bg-white dark:bg-slate-800 p-4 animate-pulse'>
      <div className='flex gap-4'>
        <div className='w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg' />
        <div className='flex-1 space-y-2'>
          <div className='h-5 bg-slate-200 dark:bg-slate-700 rounded' />
          <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded' />
        </div>
      </div>
    </div>
  );
}
