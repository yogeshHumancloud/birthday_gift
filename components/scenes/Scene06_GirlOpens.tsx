'use client';

import { motion } from 'motion/react';
import type { SceneProps } from '../flipbook/types';
import Background from '../illustrations/Background';
import GirlCharacter from '../illustrations/GirlCharacter';
import Gift from '../illustrations/Gift';
import FloatingHearts from '../illustrations/FloatingHearts';

export default function Scene06_GirlOpens({ isActive }: SceneProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 0 400 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <Background variant="sky" isActive={isActive} />

        {/* Floating hearts */}
        {isActive && <FloatingHearts count={6} intensity="medium" />}

        {/* Girl opening gift - centered */}
        <GirlCharacter
          pose={{
            body: 'standing',
            arm: 'forward',
            expression: 'surprised',
            facing: 'right',
          }}
          x={200}
          y={340}
          scale={1.5}
        />

        {/* Gift opening with glow */}
        <motion.g
          initial={{ y: 10 }}
          animate={isActive ? { y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Gift x={280} y={385} scale={1.4} isOpen={isActive} showGlow={isActive} />
        </motion.g>

        {/* Golden glow emanating */}
        {isActive && (
          <motion.ellipse
            cx="280" cy="370"
            rx="40" ry="35"
            fill="#f0c040"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.15, 0.1, 0.15], scale: [0.5, 1.2, 1, 1.2] }}
            transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
          />
        )}

        {/* Light rays */}
        {isActive && [0, 1, 2, 3, 4, 5].map((i) => (
          <motion.line
            key={i}
            x1="280" y1="370"
            x2={280 + Math.cos(i * Math.PI / 3) * 50}
            y2={370 + Math.sin(i * Math.PI / 3) * 50}
            stroke="#f0c040"
            strokeWidth="1.5"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: [0, 0.5, 0], pathLength: [0, 1] }}
            transition={{ delay: 1 + i * 0.15, duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          />
        ))}

        <text x="370" y="540" className="font-hand" fill="var(--flipbook-brown)" opacity="0.3" fontSize="14" textAnchor="end">6</text>
      </svg>

      <motion.div
        className="absolute top-6 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="font-hand text-2xl md:text-3xl text-flipbook-brown/80">
          She opens it and...
        </p>
      </motion.div>
    </div>
  );
}
