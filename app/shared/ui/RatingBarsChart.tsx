'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface RatingBar {
  stars: number;
  count: number;
}

interface RatingBarsChartProps {
  title?: string;
  totalRatings: number;
  ratings: RatingBar[];
}

type Gradient = [string, string];

const gradients: Record<number, Gradient> = {
  5: ['#fbbf24', '#f59e0b'],
  4: ['#fde047', '#facc15'],
  3: ['#bef264', '#a3e635'],
  2: ['#fb923c', '#f97316'],
  1: ['#f87171', '#ef4444']
};

function getGradientColor(stars: number): Gradient {
  return gradients[stars] ?? ['#94a3b8', '#64748b'];
}

const starColors = {
  5: 'text-amber-400',
  4: 'text-yellow-400',
  3: 'text-lime-400',
  2: 'text-orange-400',
  1: 'text-red-400'
};

export function RatingBarsChart({
  title = 'Распределение оценок',
  totalRatings,
  ratings
}: RatingBarsChartProps) {
  const maxCount = Math.max(...ratings.map((r) => r.count), 1);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700'
    >
      <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2'>
        <Star className='w-5 h-5 text-amber-500' />
        {title}
      </h3>

      <div className='space-y-3'>
        {ratings.map((rating, index) => {
          const barWidth =
            totalRatings > 0 ? (rating.count / maxCount) * 100 : 0;

          return (
            <motion.div
              key={rating.stars}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className='flex items-center gap-3 group'
            >
              <div className='w-8 text-right'>
                <span
                  className={`font-medium ${starColors[rating.stars as keyof typeof starColors]}`}
                >
                  {rating.stars}★
                </span>
              </div>

              <div className='flex-1 relative'>
                <div className='h-8 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: 'easeOut'
                    }}
                    className='h-full rounded-full relative overflow-hidden'
                    style={{
                      background: `linear-gradient(90deg, ${getGradientColor(rating.stars)[0]}, ${getGradientColor(rating.stars)[1]})`,
                      boxShadow:
                        'inset 0 1px 3px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.3)'
                    }}
                  >
                    <div className='absolute inset-0 opacity-40'>
                      <div className='h-full w-1/3 bg-linear-to-r from-transparent via-white to-transparent -skew-x-12'></div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Количество */}
              <div className='w-16 text-right'>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className='text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors'
                >
                  {formatCount(rating.count)}
                </motion.span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className='mt-5 pt-4 border-t border-slate-200 dark:border-slate-700'>
        <p className='text-sm text-slate-500 dark:text-slate-400 text-center'>
          Всего оценок:{' '}
          <span className='font-semibold text-slate-700 dark:text-slate-300'>
            {formatCount(totalRatings)}
          </span>
        </p>
      </div>
    </motion.section>
  );
}

function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}
