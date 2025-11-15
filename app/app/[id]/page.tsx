'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ArrowLeft, Calendar, Download, Star, User } from 'lucide-react';

import { useAppById } from '@/shared/api/useAppById';
import { Button } from '@/shared/ui';

export default function AppDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: app, isLoading, isError } = useAppById(id);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-slate-50 dark:bg-slate-900'>
        <div className='container mx-auto px-4 py-8'>
          <div className='animate-pulse'>
            <div className='h-6 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-6'></div>
            <div className='flex gap-6'>
              <div className='w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-xl'></div>
              <div className='flex-1 space-y-4'>
                <div className='h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4'></div>
                <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2'></div>
                <div className='h-10 bg-slate-200 dark:bg-slate-700 rounded w-32'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !app) {
    return (
      <div className='min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-slate-900 dark:text-white mb-4'>
            Приложение не найдено
          </h1>
          <Link href='/'>
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRatingCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-900'>
      {/* Header */}
      <header className='border-b bg-white dark:bg-slate-800'>
        <div className='container mx-auto px-4 py-4'>
          <Link
            href='/'
            className='inline-flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Назад
          </Link>
        </div>
      </header>

      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col lg:flex-row gap-8 mb-8'>
          <div className='shrink-0'>
            <img
              src={app.icon_url}
              alt={app.name}
              className='w-32 h-32 rounded-2xl object-cover shadow-lg'
            />
          </div>

          {/* App Info */}
          <div className='flex-1'>
            <h1 className='text-3xl font-bold text-slate-900 dark:text-white mb-2'>
              {app.name}
            </h1>

            <div className='flex flex-wrap items-center gap-4 mb-4'>
              {/* Rating */}
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1'>
                  <Star className='w-5 h-5 text-amber-400 fill-current' />
                  <span className='font-semibold text-slate-900 dark:text-white'>
                    {app.rating.toFixed(1)}
                  </span>
                </div>
                <span className='text-sm text-slate-500 dark:text-slate-400'>
                  ({formatRatingCount(app.rating_count)} оценок)
                </span>
              </div>

              {/* Category */}
              <span className='px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium'>
                {app.category}
              </span>

              {/* Price */}
              <span className='text-lg font-semibold text-slate-900 dark:text-white'>
                {app.price === 0 ? 'Бесплатно' : `${app.price} ${app.currency}`}
              </span>
            </div>

            {/* Download Button */}
            <Button
              size='lg'
              className='bg-blue-600 hover:bg-blue-700 text-white'
            >
              <Download className='w-5 h-5 mr-2' />
              Установить
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Screenshots */}
            {app.screenshot_urls && app.screenshot_urls.length > 0 && (
              <section>
                <h2 className='text-xl font-semibold text-slate-900 dark:text-white mb-4'>
                  Скриншоты
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                  {app.screenshot_urls.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot}
                      alt={`${app.name} screenshot ${index + 1}`}
                      className='rounded-lg shadow-md object-cover w-full h-64'
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Description */}
            <section>
              <h2 className='text-xl font-semibold text-slate-900 dark:text-white mb-4'>
                Описание
              </h2>
              <div className='prose prose-slate dark:prose-invert max-w-none'>
                <p className='text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line'>
                  {app.description}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* App Details */}
            <section className='bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm'>
              <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>
                Информация
              </h3>

              <div className='space-y-3'>
                {/* Developer */}
                <div className='flex items-center gap-3'>
                  <User className='w-4 h-4 text-slate-400' />
                  <div>
                    <div className='text-sm text-slate-500 dark:text-slate-400'>
                      Разработчик
                    </div>
                    <div className='font-medium text-slate-900 dark:text-white'>
                      {app.developer}
                    </div>
                  </div>
                </div>

                {/* Seller */}
                {app.seller && app.seller !== app.developer && (
                  <div className='flex items-center gap-3'>
                    <User className='w-4 h-4 text-slate-400' />
                    <div>
                      <div className='text-sm text-slate-500 dark:text-slate-400'>
                        Продавец
                      </div>
                      <div className='font-medium text-slate-900 dark:text-white'>
                        {app.seller}
                      </div>
                    </div>
                  </div>
                )}

                {/* Release Date */}
                {app.release_date && (
                  <div className='flex items-center gap-3'>
                    <Calendar className='w-4 h-4 text-slate-400' />
                    <div>
                      <div className='text-sm text-slate-500 dark:text-slate-400'>
                        Дата релиза
                      </div>
                      <div className='font-medium text-slate-900 dark:text-white'>
                        {formatDate(app.release_date)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Version */}
                {app.version && (
                  <div>
                    <div className='text-sm text-slate-500 dark:text-slate-400'>
                      Версия
                    </div>
                    <div className='font-medium text-slate-900 dark:text-white'>
                      {app.version}
                    </div>
                  </div>
                )}

                {/* Genres */}
                {app.genres && app.genres.length > 0 && (
                  <div>
                    <div className='text-sm text-slate-500 dark:text-slate-400 mb-2'>
                      Жанры
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {app.genres.map((genre, index) => (
                        <span
                          key={index}
                          className='px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-sm'
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Additional Actions */}
            <section className='bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm'>
              <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>
                Действия
              </h3>

              <div className='space-y-3'>
                <Button variant='outline' className='w-full justify-center'>
                  <Download className='w-4 h-4 mr-2' />
                  Установить
                </Button>

                <Button variant='outline' className='w-full justify-center'>
                  Поделиться
                </Button>

                <Button variant='outline' className='w-full justify-center'>
                  Добавить в избранное
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
