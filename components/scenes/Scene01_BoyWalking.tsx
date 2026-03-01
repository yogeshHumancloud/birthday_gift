'use client';

import { motion } from 'motion/react';
import type { SceneProps } from '../flipbook/types';
import Background from '../illustrations/Background';
import BoyCharacter from '../illustrations/BoyCharacter';

export default function Scene01_BoyWalking({ isActive }: SceneProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 0 400 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <Background variant="park" isActive={isActive} />

        {/* Boy walks in from left */}
        <motion.g
          initial={{ x: -80 }}
          animate={isActive ? { x: 140 } : { x: -80 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <BoyCharacter
            pose={{
              body: 'walking',
              arm: 'down',
              expression: 'happy',
              facing: 'right',
            }}
            x={0}
            y={360}
            scale={1.3}
          />
        </motion.g>

        {/* Page number */}
        <text x="370" y="540" className="font-hand" fill="var(--flipbook-brown)" opacity="0.3" fontSize="14" textAnchor="end">1</text>
      </svg>

      {/* Scene text */}
      <motion.div
        className="absolute top-6 left-0 right-0 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="font-hand text-2xl md:text-3xl text-flipbook-brown/80">
          One fine day...
        </p>
      </motion.div>
    </div>
  );
}
