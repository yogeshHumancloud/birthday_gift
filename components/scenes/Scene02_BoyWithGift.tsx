'use client';

import { motion } from 'motion/react';
import type { SceneProps } from '../flipbook/types';
import Background from '../illustrations/Background';
import BoyCharacter from '../illustrations/BoyCharacter';

export default function Scene02_BoyWithGift({ isActive }: SceneProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 0 400 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <Background variant="park" />

        {/* Boy standing with arm behind back */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <BoyCharacter
            pose={{
              body: 'standing',
              arm: 'behind',
              expression: 'mischievous',
              facing: 'right',
            }}
            x={180}
            y={360}
            scale={1.4}
          />
        </motion.g>

        {/* Question mark thought bubble */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
        >
          {/* Bubble */}
          <ellipse cx="260" cy="300" rx="28" ry="22" fill="white" stroke="var(--flipbook-brown)" strokeWidth="1.5" opacity="0.9" />
          {/* Bubble tail dots */}
          <circle cx="235" cy="330" r="4" fill="white" stroke="var(--flipbook-brown)" strokeWidth="1" opacity="0.8" />
          <circle cx="225" cy="342" r="2.5" fill="white" stroke="var(--flipbook-brown)" strokeWidth="1" opacity="0.7" />

          <motion.text
            x="260" y="308"
            textAnchor="middle"
            fontSize="28"
            fontFamily="'Caveat', cursive"
            fontWeight="bold"
            fill="var(--flipbook-brown)"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ?
          </motion.text>
        </motion.g>

        {/* Hidden gift peek */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 0.6 } : {}}
          transition={{ delay: 1.2 }}
        >
          <rect x="130" y="388" width="16" height="12" rx="2" fill="#d94f5c" opacity="0.5" />
          <rect x="136" y="388" width="4" height="12" fill="#f0c040" opacity="0.4" />
        </motion.g>

        <text x="370" y="540" className="font-hand" fill="var(--flipbook-brown)" opacity="0.3" fontSize="14" textAnchor="end">2</text>
      </svg>

      <motion.div
        className="absolute top-6 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="font-hand text-2xl md:text-3xl text-flipbook-brown/80">
          {/* He had a secret... */}
          what should I give her gift??
        </p>
      </motion.div>
    </div>
  );
}
