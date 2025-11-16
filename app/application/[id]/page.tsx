'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Download, User } from 'lucide-react';

import { useAppById } from '@/shared/api/useAppById';
import { AnimatedStar, Button } from '@/shared/ui';
import { RatingBarsChart } from '@/shared/ui/RatingBarsChart';

export default function AppDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: app, isLoading, isError } = useAppById(id);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-slate-50 dark:bg-slate-900'>
        <div className='container mx-auto px-4 py-8'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='animate-pulse'
          >
            <div className='h-6 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-6'></div>
            <div className='flex gap-6'>
              <div className='w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-xl'></div>
              <div className='flex-1 space-y-4'>
                <div className='h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4'></div>
                <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2'></div>
                <div className='h-10 bg-slate-200 dark:bg-slate-700 rounded w-32'></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isError || !app) {
    return (
      <motion.div
        className='min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className='text-center'
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1
            className='text-2xl font-bold text-slate-900 dark:text-white mb-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Приложение не найдено
          </motion.h1>
          <Link href='/'>
            <Button>Вернуться на главную</Button>
          </Link>
        </motion.div>
      </motion.div>
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
    <motion.div
      className='min-h-screen bg-slate-50 dark:bg-slate-900'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col lg:flex-row gap-8 mb-8'
        >
          <motion.div
            className='shrink-0'
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <img
              src={app.icon_url}
              alt={app.name}
              className='w-32 h-32 rounded-2xl object-cover shadow-lg'
            />
          </motion.div>

          {/* App Info */}
          <div className='flex-1'>
            <motion.h1
              className='text-3xl font-bold text-slate-900 dark:text-white mb-2'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {app.name}
            </motion.h1>

            <motion.div
              className='flex flex-wrap items-center gap-4 mb-4'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Rating */}
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1'>
                  <AnimatedStar
                    filled={true}
                    size={20}
                    className='text-amber-400'
                    animateTwinkle={true}
                  />
                  <span className='font-semibold text-slate-900 dark:text-white'>
                    {app.rating.toFixed(1)}
                  </span>
                </div>
                <span className='text-sm text-slate-500 dark:text-slate-400'>
                  ({formatRatingCount(app.rating_count)} оценок)
                </span>
              </div>

              {/* Category */}
              <motion.span
                className='px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {app.category}
              </motion.span>

              {/* Price */}
              <motion.span
                className='text-lg font-semibold text-slate-900 dark:text-white'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                {app.price === 0 ? 'Бесплатно' : `${app.price} ${app.currency}`}
              </motion.span>
            </motion.div>

            {/* Download Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size='lg'
                className='bg-blue-600 hover:bg-blue-700 text-white'
              >
                <Download className='w-5 h-5 mr-2' />
                Установить
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 lg:grid-cols-3 gap-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Screenshots */}
            {app.screenshot_urls && app.screenshot_urls.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className='text-xl font-semibold text-slate-900 dark:text-white mb-4'>
                  Скриншоты
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                  {app.screenshot_urls.map((screenshot, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.03 }}
                      className='overflow-hidden rounded-lg'
                    >
                      <img
                        src={screenshot}
                        alt={`${app.name} screenshot ${index + 1}`}
                        className='rounded-lg shadow-md object-cover w-full h-64'
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className='text-xl font-semibold text-slate-900 dark:text-white mb-4'>
                Описание
              </h2>
              <div className='prose prose-slate dark:prose-invert max-w-none'>
                <p className='text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line'>
                  {app.description}
                </p>
              </div>
            </motion.section>
          </div>

          <div className='space-y-6'>
            <motion.section
              className='bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>
                Информация
              </h3>

              <div className='space-y-3'>
                <motion.div
                  className='flex items-center gap-3'
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <User className='w-4 h-4 text-slate-400' />
                  <div>
                    <div className='text-sm text-slate-500 dark:text-slate-400'>
                      Разработчик
                    </div>
                    <div className='font-medium text-slate-900 dark:text-white'>
                      {app.developer}
                    </div>
                  </div>
                </motion.div>

                {app.seller && app.seller !== app.developer && (
                  <motion.div
                    className='flex items-center gap-3'
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <User className='w-4 h-4 text-slate-400' />
                    <div>
                      <div className='text-sm text-slate-500 dark:text-slate-400'>
                        Продавец
                      </div>
                      <div className='font-medium text-slate-900 dark:text-white'>
                        {app.seller}
                      </div>
                    </div>
                  </motion.div>
                )}

                {app.release_date && (
                  <motion.div
                    className='flex items-center gap-3'
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Calendar className='w-4 h-4 text-slate-400' />
                    <div>
                      <div className='text-sm text-slate-500 dark:text-slate-400'>
                        Дата релиза
                      </div>
                      <div className='font-medium text-slate-900 dark:text-white'>
                        {formatDate(app.release_date)}
                      </div>
                    </div>
                  </motion.div>
                )}

                {app.version && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className='text-sm text-slate-500 dark:text-slate-400'>
                      Версия
                    </div>
                    <div className='font-medium text-slate-900 dark:text-white'>
                      {app.version}
                    </div>
                  </motion.div>
                )}

                {app.genres && app.genres.length > 0 && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className='text-sm text-slate-500 dark:text-slate-400 mb-2'>
                      Жанры
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {app.genres.map((genre, index) => (
                        <motion.span
                          key={index}
                          className='px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-sm'
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          {genre}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.section>

            <motion.section
              className='bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ y: -5 }}
            >
              <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>
                Статистика
              </h3>
              <div className='space-y-4'>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className='text-sm text-slate-600 dark:text-slate-300'
                >
                  Рейтинг: {app.rating.toFixed(1)}/5.0
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className='text-sm text-slate-600 dark:text-slate-300'
                >
                  Оценок: {formatRatingCount(app.rating_count)}
                </motion.div>
              </div>
            </motion.section>

            <motion.section
              className='bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>
                Действия
              </h3>

              <div className='space-y-3'>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant='outline' className='w-full justify-center'>
                    <Download className='w-4 h-4 mr-2' />
                    Установить
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant='outline' className='w-full justify-center'>
                    Поделиться
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant='outline' className='w-full justify-center'>
                    Добавить в избранное
                  </Button>
                </motion.div>
              </div>
            </motion.section>
          </div>
        </motion.div>

        <motion.section
          className='mt-12'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <RatingBarsChart
            totalRatings={app.rating_count}
            ratings={[
              {
                stars: 5,
                count: Math.floor(app.rating_count * 0.5),
                percentage: 50
              },
              {
                stars: 4,
                count: Math.floor(app.rating_count * 0.3),
                percentage: 30
              },
              {
                stars: 3,
                count: Math.floor(app.rating_count * 0.1),
                percentage: 10
              },
              {
                stars: 2,
                count: Math.floor(app.rating_count * 0.06),
                percentage: 6
              },
              {
                stars: 1,
                count: Math.floor(app.rating_count * 0.04),
                percentage: 4
              }
            ].map((r, i) => ({
              ...r,
              count:
                i === 0
                  ? Math.floor(app.rating_count * (app.rating / 5))
                  : r.count
            }))}
          />
        </motion.section>
      </div>
    </motion.div>
  );
}
