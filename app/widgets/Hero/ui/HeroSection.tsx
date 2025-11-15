import { Badge } from '@/shared/ui';

export const HeroSection = () => {
  return (
    <section className='relative'>
      <div className='relative rounded-2xl overflow-hidden bg-linear-to-r from-blue-600 to-blue-700 p-8 md:p-12 text-white'>
        <div className='relative'>
          <Badge className='bg-white/20 text-white mb-4'>
            Избранная коллекция
          </Badge>
          <h2 className='text-3xl md:text-4xl font-bold mb-2'>
            Лучшие бесплатные приложения
          </h2>
          <p className='text-blue-100 text-lg max-w-2xl'>
            Откройте тысячи бесплатных приложений и игр. Загружайте и
            устанавливайте мгновенно.
          </p>
        </div>
      </div>
    </section>
  );
};
