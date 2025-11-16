'use client';

import React from 'react';

import { motion } from 'framer-motion';

interface AnimatedBlockProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
  animateFloat?: boolean; // New prop to control floating animation
  bounce?: boolean; // New prop to enable bouncing effect
}

export const AnimatedBlock = ({
  children,
  className = '',
  delay = 0,
  size = 'md',
  animateFloat = false,
  bounce = false
}: AnimatedBlockProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <motion.div
      className={`inline-block ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: animateFloat ? [0, -10, 0] : 0,
        ...(bounce ? { scale: [1, 1.05, 1] } : {})
      }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        stiffness: 100,
        y: animateFloat
          ? {
              duration: 3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut'
            }
          : undefined,
        scale: bounce
          ? {
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }
          : undefined
      }}
      whileHover={{
        scale: 1.15,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.85,
        rotate: 5,
        transition: { duration: 0.1 }
      }}
    >
      {children}
    </motion.div>
  );
};
