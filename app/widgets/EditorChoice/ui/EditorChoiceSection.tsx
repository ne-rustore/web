'use client';

import Link from 'next/link';

import { Bookmark } from 'lucide-react';

import { AppCard } from '@/entities/App/ui/AppCard';
import { Button, SkeletonCard } from '@/shared/ui';

interface EditorChoiceSectionProps {
  title?: string;
  limit?: number;
}

// Mock data for editor's choice apps
const editorChoiceApps = [
  {
    id: '1',
    name: 'Figma',
    description:
      'Прототипирование и дизайн интерфейсов для веб- и мобильных приложений',
    rating: 4.8,
    icon_url: 'https://placehold.co/64x64/3b82f6/ffffff?text=F',
    category: 'Design'
  },
  {
    id: '2',
    name: 'VS Code',
    description:
      'Мощный и удобный редактор кода от Microsoft с поддержкой расширений',
    rating: 4.7,
    icon_url: 'https://placehold.co/64x64/10b981/ffffff?text=V',
    category: 'Development'
  },
  {
    id: '3',
    name: 'Slack',
    description:
      'Продвинутый инструмент командной работы и коммуникации для профессионалов',
    rating: 4.5,
    icon_url: 'https://placehold.co/64x64/8b5cf6/ffffff?text=S',
    category: 'Communication'
  },
  {
    id: '4',
    name: 'Notion',
    description:
      'Универсальный рабочий инструмент для заметок, задач и баз данных',
    rating: 4.6,
    icon_url: 'https://placehold.co/64x64/ec4899/ffffff?text=N',
    category: 'Productivity'
  },
  {
    id: '5',
    name: 'Trello',
    description:
      'Инструмент управления проектами с визуальной доской задач Kanban',
    rating: 4.4,
    icon_url: 'https://placehold.co/64x64/ff5722/ffffff?text=T',
    category: 'Productivity'
  },
  {
    id: '6',
    name: 'Spotify',
    description:
      'Музыкальный стриминговый сервис с миллиардами треков на выбор',
    rating: 4.3,
    icon_url: 'https://placehold.co/64x64/22c55e/ffffff?text=S',
    category: 'Entertainment'
  }
];

export function EditorChoiceSection({
  title = 'Выбор редакции',
  limit = 6
}: EditorChoiceSectionProps) {
  const apps = editorChoiceApps.slice(0, limit);
  const isLoading = false; // Since we're using mock data

  if (isLoading) {
    return <SectionSkeleton title={title} />;
  }

  return (
    <section className='py-8 px-4 bg-slate-50 dark:bg-slate-900'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-slate-900 dark:text-white flex items-center'>
            <Bookmark className='mr-2 h-5 w-5 text-blue-600' />
            {title}
          </h2>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/editor-choice'>Смотреть все →</Link>
          </Button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {apps.map((app) => (
            <AppCard
              key={app.id}
              id={app.id}
              title={app.name}
              description={app.description}
              rating={app.rating}
              image={app.icon_url}
              badge='Рекомендовано'
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
        <h2 className='text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center'>
          <Bookmark className='mr-2 h-5 w-5 text-blue-600' />
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
