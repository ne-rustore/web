'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui';
import { topics } from '../model/topics';

interface TopicsSectionProps {
  currentCategory?: string;
  className?: string;
}

export const TopicsSection = ({
  currentCategory: propCategory,
  className
}: TopicsSectionProps) => {
  const params = useParams();
  const currentCategory =
    propCategory || (params.category as string) || topics[0].id;

  const getTopicHref = (topicId: string) => {
    return topicId === topics[0].id ? '/' : `/${topicId}`;
  };

  return (
    <section className={cn('container mx-auto px-4 py-8', className)}>
      <nav aria-label='Topics navigation'>
        <div className='flex flex-wrap gap-2'>
          {topics.map((topic) => {
            const isActive = topic.id === currentCategory;

            return (
              <Link
                key={topic.id}
                href={getTopicHref(topic.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size='sm'
                  className={cn(
                    'flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-200',
                    'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
                    isActive
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-sm'
                  )}
                >
                  <span className='shrink-0'>{topic.icon}</span>
                  <span className='whitespace-nowrap'>{topic.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>
    </section>
  );
};
