'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Square, Star } from 'lucide-react';

interface FloatingElement {
  id: number;
  type: 'star' | 'block';
  size: number;
  position: { x: number; y: number };
  duration: number;
  delay: number;
}

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  starCount?: number;
  blockCount?: number;
  className?: string;
}

export const AnimatedBackground = ({
  children,
  starCount = 15,
  blockCount = 10,
  className = ''
}: AnimatedBackgroundProps) => {
  // Generate random floating elements using React.useMemo to ensure purity
  const floatingElements = React.useMemo(() => {
    const elements: FloatingElement[] = [];

    // Generate stars
    for (let i = 0; i < starCount; i++) {
      // Using a seeded approach to generate "random" values that are stable
      const seed = i; // Using the index as a seed for consistency
      const size = ((seed * 97) % 20) + 10; // Random size between 10-30px
      const position = {
        x: (seed * 137) % 100, // Random x position between 0-100%
        y: (seed * 239) % 100 // Random y position between 0-100%
      };
      const duration = ((seed * 31) % 10) + 10; // Random duration between 10-20s
      const delay = ((seed * 17) % 5000) / 1000; // Random delay up to 5s

      elements.push({
        id: i,
        type: 'star',
        size,
        position,
        duration,
        delay
      });
    }

    // Generate blocks
    for (let i = 0; i < blockCount; i++) {
      const seed = starCount + i; // Using a different seed for blocks
      const size = ((seed * 97) % 30) + 15; // Random size between 15-45px
      const position = {
        x: (seed * 137) % 100, // Random x position between 0-100%
        y: (seed * 239) % 100 // Random y position between 0-100%
      };
      const duration = ((seed * 43) % 15) + 15; // Random duration between 15-30s
      const delay = ((seed * 19) % 5000) / 1000; // Random delay up to 5s

      elements.push({
        id: seed,
        type: 'block',
        size,
        position,
        duration,
        delay
      });
    }

    return elements;
  }, [starCount, blockCount]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Floating elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className='absolute'
          style={{
            left: `${element.position.x}%`,
            top: `${element.position.y}%`
          }}
          animate={{
            y: [0, -20, 0],
            x: element.type === 'star' ? [0, 10, -10, 0] : [0, 5, -5, 0],
            rotate: element.type === 'star' ? [0, 10, -10, 0] : [0, 5, -5, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: element.delay
          }}
        >
          {element.type === 'star' ? (
            <Star size={element.size} className='text-amber-300 opacity-70' />
          ) : (
            <Square size={element.size} className='text-blue-400 opacity-60' />
          )}
        </motion.div>
      ))}

      {/* Children content */}
      <div className='relative z-10'>{children}</div>
    </div>
  );
};
