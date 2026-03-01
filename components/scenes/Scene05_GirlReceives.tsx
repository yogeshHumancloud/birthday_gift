'use client';

import { motion } from 'motion/react';
import type { SceneProps } from '../flipbook/types';
import Background from '../illustrations/Background';
import BoyCharacter from '../illustrations/BoyCharacter';
import GirlCharacter from '../illustrations/GirlCharacter';
import Gift from '../illustrations/Gift';
import FloatingHearts from '../illustrations/FloatingHearts';

export default function Scene05_GirlReceives({ isActive }: SceneProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 0 400 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <Background variant="park" />

        {/* Floating hearts */}
        {isActive && <FloatingHearts count={6} intensity="light" />}

        {/* Boy giving gift */}
        <BoyCharacter
          pose={{
            body: 'standing',
            arm: 'forward',
            expression: 'happy',
            facing: 'right',
          }}
          x={130}
          y={360}
          scale={1.3}
        />

        {/* Gift moving from boy to girl */}
        <motion.g
          initial={{ x: 180, y: 395 }}
          animate={isActive ? { x: 230, y: 395 } : {}}
          transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
        >
          <Gift x={0} y={0} scale={1} />
        </motion.g>

        {/* Girl receiving */}
        <GirlCharacter
          pose={{
            body: 'standing',
            arm: 'forward',
            expression: 'surprised',
            facing: 'left',
          }}
          x={280}
          y={360}
          scale={1.3}
        />

        <text x="370" y="540" className="font-hand" fill="var(--flipbook-brown)" opacity="0.3" fontSize="14" textAnchor="end">5</text>
      </svg>

      <motion.div
        className="absolute top-6 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="font-hand text-2xl md:text-3xl text-flipbook-brown/80">
          &quot;This is for you!&quot;
        </p>
      </motion.div>
    </div>
  );
}
