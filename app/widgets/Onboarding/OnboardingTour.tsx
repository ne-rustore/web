'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';

import { Button, Sheet, SheetContent } from '@/shared/ui';

interface TourStep {
  target: string;
  title: string;
  content: string;
}

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="hero"]',
    title: 'Добро пожаловать в RuStore!',
    content: 'Здесь вы найдёте лучшие российские приложения и игры.'
  },
  {
    target: '[data-tour="search"]',
    title: 'Поиск приложений',
    content: 'Быстро находите нужное приложение по названию или категории.'
  },
  {
    target: '[data-tour="topics"]',
    title: 'Тематические подборки',
    content: 'Специальные подборки по темам: образование, игры, финансы и др.'
  },
  {
    target: '[data-tour="top-apps"]',
    title: 'Топ приложений',
    content: 'Самые популярные и скачиваемые приложения прямо сейчас.'
  }
];

export const OnboardingTour = () => {
  const [isOpen, setIsOpen] = useState(() => {
    return !localStorage.getItem('rustore-onboarding');
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);

  const removeAllHighlights = useCallback(() => {
    document.querySelectorAll('.tour-highlight').forEach((el) => {
      el.classList.remove('tour-highlight');
    });
  }, []);

  const highlightStep = useCallback(
    (stepIndex: number) => {
      removeAllHighlights();
      const selector = tourSteps[stepIndex].target;
      const element = document.querySelector(selector);
      if (element) {
        element.classList.add('tour-highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    [removeAllHighlights]
  );

  const startTour = () => {
    setShowWelcome(false);
    setCurrentStep(0);
    highlightStep(0);
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      highlightStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = useCallback(() => {
    localStorage.setItem('rustore-onboarding', 'true');
    setIsOpen(false);
    removeAllHighlights();
  }, [removeAllHighlights]);

  useEffect(() => {
    if (isOpen && !showWelcome) {
      highlightStep(currentStep);
    }
    return () => removeAllHighlights();
  }, [currentStep, showWelcome, isOpen, highlightStep, removeAllHighlights]);

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-slate-900 p-4'
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className='text-center max-w-md'
            >
              <div className='mb-8'>
                <div className='w-24 h-24 mx-auto mb-6'>
                  <Image
                    src='/RuStore_Color_Logo.svg'
                    alt='RuStore'
                    width={96}
                    height={96}
                    className='w-full h-full object-contain drop-shadow-lg'
                  />
                </div>
                <h1 className='text-3xl font-bold text-slate-900 dark:text-white mb-3'>
                  Добро пожаловать в RuStore!
                </h1>
                <p className='text-slate-600 dark:text-slate-300'>
                  Откройте для себя мир российских приложений
                </p>
              </div>
              <Button
                size='lg'
                onClick={startTour}
                className='bg-blue-600 hover:bg-blue-700 text-white'
              >
                Начать
                <ArrowRight className='w-5 h-5 ml-2' />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tour Steps */}
      <Sheet open={!showWelcome && isOpen} onOpenChange={() => {}}>
        <SheetContent
          side='bottom'
          className='h-auto p-6 rounded-t-3xl border-0 shadow-2xl'
        >
          <div className='max-w-md mx-auto'>
            <div className='flex justify-between items-start mb-4'>
              <div>
                <h3 className='text-lg font-semibold text-slate-900 dark:text-white'>
                  {tourSteps[currentStep].title}
                </h3>
                <p className='text-sm text-slate-600 dark:text-slate-300 mt-1'>
                  {tourSteps[currentStep].content}
                </p>
              </div>
              <button
                onClick={completeOnboarding}
                className='text-slate-400 hover:text-slate-600 transition-colors'
              >
                <X className='w-5 h-5' />
              </button>
            </div>

            <div className='flex items-center justify-between mt-6'>
              <div className='flex gap-1'>
                {tourSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-8 rounded-full transition-colors ${
                      i === currentStep
                        ? 'bg-blue-600'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <div className='flex gap-2'>
                {currentStep === tourSteps.length - 1 ? (
                  <Button size='sm' onClick={completeOnboarding}>
                    <Check className='w-4 h-4 mr-1' />
                    Готово
                  </Button>
                ) : (
                  <Button size='sm' onClick={nextStep}>
                    Далее
                    <ArrowRight className='w-4 h-4 ml-1' />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* УЛУЧШЕННАЯ ПОДСВЕТКА */}
      <style jsx global>{`
        .tour-highlight {
          position: relative;
          z-index: 40;
          outline: 6px solid rgba(59, 130, 246, 0.6);
          border-radius: 16px;
          box-shadow:
            0 0 0 9999px rgba(0, 0, 0, 0.6),
            0 0 60px rgba(59, 130, 246, 0.5),
            0 0 120px rgba(59, 130, 246, 0.3);
          animation:
            pulse-outline 2s infinite,
            scale-pulse 1.5s infinite alternate;
          transform-origin: center;
        }

        @keyframes pulse-outline {
          0%,
          100% {
            outline-color: rgba(59, 130, 246, 0.6);
            box-shadow:
              0 0 0 9999px rgba(0, 0, 0, 0.6),
              0 0 60px rgba(59, 130, 246, 0.5),
              0 0 120px rgba(59, 130, 246, 0.3);
          }
          50% {
            outline-color: rgba(59, 130, 246, 0.9);
            box-shadow:
              0 0 0 9999px rgba(0, 0, 0, 0.7),
              0 0 80px rgba(59, 130, 246, 0.7),
              0 0 160px rgba(59, 130, 246, 0.5);
          }
        }

        @keyframes scale-pulse {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.03);
          }
        }
      `}</style>
    </>
  );
};
