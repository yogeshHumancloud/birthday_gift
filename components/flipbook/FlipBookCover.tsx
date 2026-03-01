'use client';

import { motion } from 'motion/react';

export function FrontCover() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Decorative border */}
      <svg className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)]" viewBox="0 0 300 400" fill="none">
        <rect x="5" y="5" width="290" height="390" rx="8"
          stroke="var(--flipbook-brown)" strokeWidth="2" strokeDasharray="8 4"
          opacity="0.4" />
        <rect x="12" y="12" width="276" height="376" rx="6"
          stroke="var(--flipbook-pink)" strokeWidth="1.5" strokeDasharray="6 6"
          opacity="0.3" />
      </svg>

      {/* Hearts decoration */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-flipbook-pink"
          style={{
            left: `${15 + i * 14}%`,
            top: `${10 + (i % 3) * 8}%`,
            fontSize: `${14 + (i % 3) * 6}px`,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          &#10084;
        </motion.div>
      ))}

      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          &#127873;
        </motion.div>
        <h1 className="font-hand text-4xl md:text-5xl font-bold text-flipbook-brown mb-3 leading-tight">
          A Special Day
        </h1>
        <p className="font-hand text-xl md:text-2xl text-flipbook-pink">
          ~ a little story for you ~
        </p>

      </motion.div>

      {/* Bottom hearts */}
      <div className="absolute bottom-8 flex gap-3 text-flipbook-pink opacity-40">
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ fontSize: `${10 + i * 2}px` }}>&#10084;</span>
        ))}
      </div>
    </div>
  );
}

export function BackCover() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-4xl mb-4">&#10084;</div>
        <p className="font-hand text-2xl text-flipbook-brown mb-2">
          The End
        </p>
        <p className="font-hand text-lg text-flipbook-pink">
          Made with love
        </p>
        <motion.div
          className="mt-6 text-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          &#128152;
        </motion.div>
      </motion.div>
    </div>
  );
}
