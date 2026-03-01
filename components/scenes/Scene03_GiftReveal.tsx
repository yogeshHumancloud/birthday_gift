'use client';

import { motion } from 'motion/react';
import type { SceneProps } from '../flipbook/types';
import Background from '../illustrations/Background';
import BoyCharacter from '../illustrations/BoyCharacter';
import Gift from '../illustrations/Gift';

export default function Scene03_GiftReveal({ isActive }: SceneProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 0 400 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <Background variant="park" />

        {/* Boy with arm forward revealing gift */}
        <BoyCharacter
          pose={{
            body: 'standing',
            arm: 'forward',
            expression: 'happy',
            facing: 'right',
          }}
          x={150}
          y={360}
          scale={1.4}
        />

        {/* Gift reveal animation */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={isActive ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
        >
          <Gift x={240} y={400} scale={1.2} showGlow={isActive} />
        </motion.g>

        {/* Sparkle particles */}
        {isActive && [0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={i}
            cx={240 + (i * 20 - 40)}
            cy={380}
            r={2}
            fill="#f0c040"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -30 - i * 10],
              x: [(i - 2) * 5, (i - 2) * 15],
            }}
            transition={{
              duration: 1.5,
              delay: 0.8 + i * 0.15,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        ))}

        <text x="370" y="540" className="font-hand" fill="var(--flipbook-brown)" opacity="0.3" fontSize="14" textAnchor="end">3</text>
      </svg>

      <motion.div
        className="absolute top-6 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="font-hand text-2xl md:text-3xl text-flipbook-brown/80">
          {/* Ta-da! A surprise! */}
          I have an idea
        </p>
      </motion.div>
    </div>
  );
}
