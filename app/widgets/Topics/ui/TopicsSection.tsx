'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui';
import { topics } from '../model/topics';

interface TopicsSectionProps {
  currentCategory?: string;
}

export const TopicsSection = ({
  currentCategory: propCategory
}: TopicsSectionProps) => {
  const params = useParams();
  const currentCategory =
    propCategory || (params.category as string) || topics[0].id;

  return (
    <section className='container mx-auto px-4 py-8'>
      <div className='flex flex-wrap gap-2'>
        {topics.map((topic) => {
          const isActive = topic.id === currentCategory;

          return (
            <Link key={topic.id} href={`/${topic.id}`}>
              <Button
                variant={isActive ? 'default' : 'outline'}
                size='sm'
                className={cn(
                  'flex items-center gap-2 rounded-full text-sm font-medium transition-all',
                  isActive
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                )}
              >
                {topic.icon}
                <span>{topic.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
