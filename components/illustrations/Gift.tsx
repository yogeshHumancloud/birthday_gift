'use client';

import { motion } from 'motion/react';

interface GiftProps {
  x?: number;
  y?: number;
  scale?: number;
  isOpen?: boolean;
  showGlow?: boolean;
}

export default function Gift({ x = 0, y = 0, scale = 1, isOpen = false, showGlow = false }: GiftProps) {
  return (
    <motion.g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Glow effect */}
      {showGlow && (
        <motion.ellipse
          cx="0" cy="-5"
          rx="25" ry="20"
          fill="#f0c040"
          opacity={0}
          animate={{ opacity: [0, 0.4, 0.2, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          filter="url(#glow)"
        />
      )}

      {/* Box body */}
      <rect x="-18" y="-8" width="36" height="24" rx="3" fill="#d94f5c" stroke="#b33a44" strokeWidth="1.5" />

      {/* Ribbon vertical */}
      <rect x="-3" y="-8" width="6" height="24" fill="#f0c040" opacity="0.8" />
      {/* Ribbon horizontal */}
      <rect x="-18" y="2" width="36" height="5" fill="#f0c040" opacity="0.8" />

      {/* Lid */}
      <motion.g
        animate={isOpen ? { rotate: -45, y: -10 } : {}}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        style={{ transformOrigin: '-20px -8px' }}
      >
        <rect x="-20" y="-14" width="40" height="8" rx="2" fill="#e85a66" stroke="#b33a44" strokeWidth="1.5" />
        {/* Lid ribbon */}
        <rect x="-3" y="-14" width="6" height="8" fill="#f0c040" opacity="0.8" />

        {/* Bow */}
        <g transform="translate(0, -14)">
          <path d="M0,0 Q-10,-10 -5,-14 Q0,-10 0,0 Q0,-10 5,-14 Q10,-10 0,0Z"
            fill="#f0c040" stroke="#d4a020" strokeWidth="1" />
          <circle cx="0" cy="0" r="2.5" fill="#d4a020" />
        </g>
      </motion.g>

      {/* Sparkles when showing */}
      {showGlow && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <motion.text
              key={i}
              x={[-22, 22, -16, 16][i]}
              y={[-20, -18, -28, -26][i]}
              fontSize="8"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            >
              &#10022;
            </motion.text>
          ))}
        </>
      )}
    </motion.g>
  );
}
