'use client';

import { motion } from 'framer-motion';

import { Badge } from '@/shared/ui';
import { AnimatedBackground } from '@/shared/ui/AnimatedBackground';

export const HeroSection = () => {
  return (
    <section className='relative'>
      <div className='relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 p-8 md:p-12 text-white'>
        <AnimatedBackground
          starCount={10}
          blockCount={5}
          className='absolute inset-0'
        >
          <div className='relative z-10'>
            <Badge className='bg-white/20 text-white mb-4'>
              Избранная коллекция
            </Badge>
            <motion.h2
              className='text-3xl md:text-4xl font-bold mb-2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Лучшие бесплатные приложения
            </motion.h2>
            <motion.p
              className='text-blue-100 text-lg max-w-2xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Откройте тысячи бесплатных приложений и игр. Загружайте и
              устанавливайте мгновенно.
            </motion.p>
          </div>
        </AnimatedBackground>
      </div>
    </section>
  );
};
