'use client';

import { motion } from 'motion/react';
import type { SceneProps } from '../flipbook/types';
import Background from '../illustrations/Background';
import BoyCharacter from '../illustrations/BoyCharacter';
import GirlCharacter from '../illustrations/GirlCharacter';
import Confetti from '../illustrations/Confetti';
import Balloon from '../illustrations/Balloon';
import FloatingHearts from '../illustrations/FloatingHearts';

export default function Scene09_Celebration({ isActive }: SceneProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 0 400 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <Background variant="celebration" />

        {/* Confetti */}
        {isActive && <Confetti count={25} />}

        {/* Balloons */}
        {isActive && (
          <>
            <Balloon x={60} y={120} color="#e8788a" delay={0} scale={0.9} />
            <Balloon x={150} y={80} color="#5b8cb8" delay={0.3} scale={1} />
            <Balloon x={250} y={100} color="#f0c040" delay={0.5} scale={0.85} />
            <Balloon x={340} y={90} color="#7cba5f" delay={0.7} scale={0.95} />
          </>
        )}

        {/* Heavy hearts */}
        {isActive && <FloatingHearts count={10} intensity="heavy" />}

        {/* Boy celebrating */}
        <BoyCharacter
          pose={{
            body: 'celebrating',
            arm: 'up',
            expression: 'loving',
            facing: 'right',
          }}
          x={140}
          y={350}
          scale={1.3}
        />

        {/* Girl celebrating */}
        <GirlCharacter
          pose={{
            body: 'celebrating',
            arm: 'up',
            expression: 'loving',
            facing: 'left',
          }}
          x={260}
          y={350}
          scale={1.3}
        />

        <text x="370" y="540" className="font-hand" fill="var(--flipbook-brown)" opacity="0.3" fontSize="14" textAnchor="end">9</text>
      </svg>

      {/* Happy Birthday text */}
      <motion.div
        className="absolute top-8 left-0 right-0 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isActive ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 12 }}
      >
        <motion.p
          className="font-hand text-4xl md:text-5xl font-bold text-flipbook-red"
          animate={isActive ? {
            scale: [1, 1.05, 1],
            rotate: [-1, 1, -1],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Happy Birthday!
        </motion.p>
        <motion.div
          className="flex justify-center gap-2 mt-2"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {['&#127880;', '&#127881;', '&#127874;', '&#127881;', '&#127880;'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
              dangerouslySetInnerHTML={{ __html: emoji }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
