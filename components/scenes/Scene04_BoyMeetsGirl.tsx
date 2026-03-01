'use client';

import { motion } from 'motion/react';
import type { SceneProps } from '../flipbook/types';
import Background from '../illustrations/Background';
import BoyCharacter from '../illustrations/BoyCharacter';
import GirlCharacter from '../illustrations/GirlCharacter';
import FloatingHearts from '../illustrations/FloatingHearts';

export default function Scene04_BoyMeetsGirl({ isActive }: SceneProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 0 400 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <Background variant="park" />

        {/* Ambient floating hearts */}
        {isActive && <FloatingHearts count={5} intensity="light" />}

        {/* Boy on left */}
        <motion.g
          initial={{ x: -60 }}
          animate={isActive ? { x: 0 } : { x: -60 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <BoyCharacter
            pose={{
              body: 'standing',
              arm: 'down',
              expression: 'happy',
              facing: 'right',
            }}
            x={120}
            y={360}
            scale={1.3}
          />
        </motion.g>

        {/* Girl enters from right */}
        <motion.g
          initial={{ x: 80 }}
          animate={isActive ? { x: 0 } : { x: 80 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
        >
          <GirlCharacter
            pose={{
              body: 'walking',
              arm: 'down',
              expression: 'happy',
              facing: 'left',
            }}
            x={270}
            y={360}
            scale={1.3}
          />
        </motion.g>

        <text x="370" y="540" className="font-hand" fill="var(--flipbook-brown)" opacity="0.3" fontSize="14" textAnchor="end">4</text>
      </svg>

      <motion.div
        className="absolute top-6 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="font-hand text-2xl md:text-3xl text-flipbook-brown/80">
          And then she arrived...
        </p>
      </motion.div>
    </div>
  );
}
