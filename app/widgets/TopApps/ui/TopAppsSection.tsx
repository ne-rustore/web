import type { topics } from '@/widgets/Topics';

import { Download } from 'lucide-react';

import { AppCard } from '@/entities/App/ui/AppCard';
import { Button } from '@/shared/ui';
import { topApps } from '../model/topApps';

type TopicId = (typeof topics)[number]['id'];

interface TopAppsSectionProps {
  category?: TopicId;
  title?: string;
}

export const TopAppsSection = ({ category, title }: TopAppsSectionProps) => {
  const filteredApps = category
    ? topApps.filter((app) =>
        (app.categories as readonly string[]).includes(category)
      )
    : topApps;

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
        {filteredApps.map((app) => (
          <AppCard key={app.id} {...app} />
        ))}
      </div>
    </section>
  );
};
