'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface AnimatedStarProps {
  filled: boolean;
  size?: number;
  className?: string;
  animateTwinkle?: boolean; // New prop to control twinkling effect
}

export const AnimatedStar = ({
  filled,
  size = 16,
  className = '',
  animateTwinkle = false
}: AnimatedStarProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.8, rotate: -5 }}
      animate={
        animateTwinkle
          ? {
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
              rotate: [0, 5, -5, 0]
            }
          : filled
            ? { scale: [1, 1.1, 1] }
            : { scale: 1 }
      }
      transition={
        animateTwinkle
          ? {
              scale: { duration: 2, repeat: Infinity, repeatType: 'loop' },
              opacity: { duration: 3, repeat: Infinity, repeatType: 'loop' },
              rotate: { duration: 4, repeat: Infinity, repeatType: 'loop' }
            }
          : filled
            ? { duration: 2, repeat: Infinity, repeatType: 'loop' }
            : {}
      }
    >
      <Star
        size={size}
        className={`transition-colors ${
          filled
            ? 'text-amber-400 fill-amber-400'
            : 'text-slate-300 dark:text-slate-600'
        }`}
      />
    </motion.div>
  );
};
