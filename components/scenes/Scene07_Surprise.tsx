'use client';

import { motion } from 'motion/react';
import type { SceneProps } from '../flipbook/types';
import Background from '../illustrations/Background';
import GirlCharacter from '../illustrations/GirlCharacter';
import FloatingHearts from '../illustrations/FloatingHearts';

export default function Scene07_Surprise({ isActive }: SceneProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 0 400 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <Background variant="celebration" />

        {/* Floating hearts */}
        {isActive && <FloatingHearts count={8} intensity="medium" />}

        {/* Girl surprised reaction - big, centered */}
        <motion.g
          animate={isActive ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ transformOrigin: '200px 370px' }}
        >
          <GirlCharacter
            pose={{
              body: 'standing',
              arm: 'up',
              expression: 'surprised',
              facing: 'right',
            }}
            x={200}
            y={340}
            scale={1.6}
          />
        </motion.g>

        {/* Exclamation marks flying out */}
        {isActive && ['!', '!', '!', '!!'].map((mark, i) => (
          <motion.text
            key={i}
            x={200}
            y={310}
            textAnchor="middle"
            fontSize="24"
            fontFamily="'Caveat', cursive"
            fontWeight="bold"
            fill={['#d94f5c', '#f0c040', '#e8788a', '#5b8cb8'][i]}
            initial={{ opacity: 0, y: 310, x: 200 }}
            animate={{
              opacity: [0, 1, 0],
              y: [310, 240 - i * 20],
              x: [200, 160 + i * 40],
              rotate: [(i - 1.5) * 10, (i - 1.5) * 25],
              scale: [0.5, 1.3, 0.8],
            }}
            transition={{
              duration: 1.5,
              delay: 0.5 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            {mark}
          </motion.text>
        ))}

        {/* Sparkle burst */}
        {isActive && [...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <motion.circle
              key={i}
              cx={200}
              cy={320}
              r={3}
              fill={['#f0c040', '#e8788a', '#5b8cb8', '#7cba5f'][i % 4]}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                cx: [200, 200 + Math.cos(angle) * 60],
                cy: [320, 320 + Math.sin(angle) * 60],
              }}
              transition={{
                duration: 1.2,
                delay: 0.8 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          );
        })}

        <text x="370" y="540" className="font-hand" fill="var(--flipbook-brown)" opacity="0.3" fontSize="14" textAnchor="end">7</text>
      </svg>

      <motion.div
        className="absolute top-6 left-0 right-0 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isActive ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <p className="font-hand text-3xl md:text-4xl text-flipbook-red font-bold">
          Oh wow!! 
        </p>
      </motion.div>
    </div>
  );
}
