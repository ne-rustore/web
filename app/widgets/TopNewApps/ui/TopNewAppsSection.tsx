'use client';

import Link from 'next/link';

import { RefreshCw } from 'lucide-react';

import { AppCard } from '@/entities/App/ui/AppCard';
import { Button, SkeletonCard } from '@/shared/ui';
import { useNewApps } from '../model/useNewApps';

interface TopNewAppsSectionProps {
  title?: string;
  limit?: number;
}

export function TopNewAppsSection({
  title = 'Новинки',
  limit = 6
}: TopNewAppsSectionProps) {
  const {
    data: apps = [],
    isLoading,
    isError,
    refetch
  } = useNewApps({ limit });

  if (isLoading) {
    return <SectionSkeleton title={title} />;
  }

  if (isError || !apps.length) {
    return (
      <section className='py-8 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
              {title}
            </h2>
            <Button variant='ghost' size='sm' onClick={() => refetch()}>
              <RefreshCw className='w-4 h-4 mr-2' />
              Обновить
            </Button>
          </div>
          <p className='text-slate-600 dark:text-slate-400 text-center py-8'>
            Не удалось загрузить новинки. Попробуйте позже.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className='py-8 px-4 bg-slate-50 dark:bg-slate-900'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
            Новинки
          </h2>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/new'>Смотреть все →</Link>
          </Button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {apps.map((app) => (
            <AppCard
              key={app.id}
              id={app.id.toString()}
              title={app.name}
              description={app.short_description || 'Нет описания'}
              rating={app.rating}
              image={app.icon_url}
              badge={app.age_rating ? `${app.age_rating}+` : undefined}
              categories={[app.category]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionSkeleton({ title }: { title: string }) {
  return (
    <section className='py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-2xl font-bold text-slate-900 dark:text-white mb-6'>
          {title}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
