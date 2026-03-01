'use client';

import { motion } from 'motion/react';
import type { SceneProps } from '../flipbook/types';
import Background from '../illustrations/Background';
import BoyCharacter from '../illustrations/BoyCharacter';
import GirlCharacter from '../illustrations/GirlCharacter';
import FloatingHearts from '../illustrations/FloatingHearts';

export default function Scene10_FinalMessage({ isActive }: SceneProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 0 400 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <Background variant="celebration" />

        {/* Lots of hearts - heavy */}
        {isActive && <FloatingHearts count={14} intensity="heavy" />}

        {/* Characters waving at bottom */}
        <motion.g
          initial={{ y: 30, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <BoyCharacter
            pose={{
              body: 'standing',
              arm: 'waving',
              expression: 'loving',
              facing: 'right',
            }}
            x={150}
            y={380}
            scale={1.1}
          />
          <GirlCharacter
            pose={{
              body: 'standing',
              arm: 'waving',
              expression: 'loving',
              facing: 'left',
            }}
            x={250}
            y={380}
            scale={1.1}
          />
        </motion.g>

        {/* Small heart between them */}
        <motion.g
          initial={{ scale: 0 }}
          animate={isActive ? { scale: 1 } : {}}
          transition={{ delay: 1.5, type: 'spring', stiffness: 300, damping: 10 }}
        >
          <motion.path
            d="M200,395 C200,390 192,384 188,389 C184,394 192,402 200,410 C208,402 216,394 212,389 C208,384 200,390 200,395Z"
            fill="#e8788a"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ transformOrigin: '200px 397px' }}
          />
        </motion.g>

        {/* Decorative border sparkles */}
        {isActive && [...Array(8)].map((_, i) => (
          <motion.text
            key={i}
            x={[40, 360, 30, 370, 50, 350, 60, 340][i]}
            y={[100, 120, 250, 270, 170, 190, 330, 310][i]}
            fontSize="14"
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          >
            &#10022;
          </motion.text>
        ))}

        <text x="370" y="540" className="font-hand" fill="var(--flipbook-brown)" opacity="0.3" fontSize="14" textAnchor="end">10</text>
      </svg>

      {/* Main birthday message */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-10 pointer-events-none">
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <motion.h1
            className="font-hand text-5xl md:text-6xl font-bold text-flipbook-red leading-tight"
            animate={isActive ? {
              scale: [1, 1.03, 1],
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            Happy Birthday
            <br />
            Wifey!!
          </motion.h1>

          <motion.p
            className="font-hand text-9xl md:text-9xl text-flipbook-pink mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Shardha
          </motion.p>

          <motion.div
            className="mt-4 flex justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className="text-3xl text-flipbook-pink"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              >
                &#10084;
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="font-hand text-xl md:text-2xl text-flipbook-brown/70 mt-4"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            With all my love &#128152;
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
