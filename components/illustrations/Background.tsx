'use client';

import { motion } from 'motion/react';

interface BackgroundProps {
  variant?: 'park' | 'sky' | 'celebration';
  isActive?: boolean;
}

export default function Background({ variant = 'park', isActive = false }: BackgroundProps) {
  if (variant === 'sky') {
    return (
      <g>
        {/* Gradient sky */}
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#87ceeb" />
            <stop offset="70%" stopColor="#c8e6f5" />
            <stop offset="100%" stopColor="#fdf6e3" />
          </linearGradient>
        </defs>
        <rect width="400" height="560" fill="url(#sky-grad)" />

        {/* Clouds */}
        <motion.g
          animate={isActive ? { x: [0, 15, 0] } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <ellipse cx="80" cy="60" rx="30" ry="14" fill="white" opacity="0.7" />
          <ellipse cx="95" cy="55" rx="22" ry="12" fill="white" opacity="0.7" />
          <ellipse cx="300" cy="90" rx="25" ry="12" fill="white" opacity="0.5" />
          <ellipse cx="315" cy="86" rx="18" ry="10" fill="white" opacity="0.5" />
        </motion.g>
      </g>
    );
  }

  if (variant === 'celebration') {
    return (
      <g>
        <defs>
          <radialGradient id="celeb-grad" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#fff5e6" />
            <stop offset="100%" stopColor="#fdf0d5" />
          </radialGradient>
        </defs>
        <rect width="400" height="560" fill="url(#celeb-grad)" />
        {/* Subtle sparkle dots */}
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={i}
            cx={30 + ((i * 37) % 340)}
            cy={30 + ((i * 53) % 480)}
            r={1.5}
            fill="#f0c040"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </g>
    );
  }

  // Park default
  return (
    <g>
      <defs>
        <linearGradient id="park-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8e6f5" />
          <stop offset="55%" stopColor="#e8f4e0" />
          <stop offset="100%" stopColor="#7cba5f" />
        </linearGradient>
      </defs>
      <rect width="400" height="560" fill="url(#park-grad)" />

      {/* Ground */}
      <motion.path
        d="M0,460 Q100,445 200,455 Q300,445 400,460 L400,560 L0,560Z"
        fill="#7cba5f"
        stroke="#5a9a40"
        strokeWidth="1.5"
        initial={isActive ? { pathLength: 0 } : {}}
        animate={isActive ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5 }}
      />
      {/* Grass details */}
      <path d="M30,458 L34,448 M36,460 L40,450" stroke="#5a9a40" strokeWidth="1" opacity="0.4" />
      <path d="M150,452 L154,442 M156,454 L160,444" stroke="#5a9a40" strokeWidth="1" opacity="0.4" />
      <path d="M280,456 L284,446 M286,458 L290,448" stroke="#5a9a40" strokeWidth="1" opacity="0.4" />
      <path d="M350,455 L354,445" stroke="#5a9a40" strokeWidth="1" opacity="0.4" />

      {/* Tree */}
      <motion.g
        initial={isActive ? { opacity: 0, scale: 0.8 } : {}}
        animate={isActive ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ transformOrigin: '340px 400px' }}
      >
        <rect x="335" y="390" width="10" height="65" fill="#8B6914" rx="2" />
        <ellipse cx="340" cy="370" rx="30" ry="35" fill="#5a9a40" opacity="0.8" />
        <ellipse cx="330" cy="380" rx="20" ry="25" fill="#7cba5f" opacity="0.7" />
      </motion.g>
    </g>
  );
}
