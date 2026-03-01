'use client';

import { motion } from 'motion/react';
import type { CharacterPose } from '../flipbook/types';

interface BoyCharacterProps {
  pose: CharacterPose;
  x?: number;
  y?: number;
  scale?: number;
}

export default function BoyCharacter({ pose, x = 0, y = 0, scale = 1 }: BoyCharacterProps) {
  const flip = pose.facing === 'left' ? -1 : 1;

  // Right arm positions based on pose
  const rightArmRotation = {
    down: 0,
    behind: -60,
    forward: 40,
    up: -120,
    hugging: 60,
    waving: -100,
  }[pose.arm];

  // Left arm mirrors
  const leftArmRotation = {
    down: 0,
    behind: 60,
    forward: -40,
    up: 120,
    hugging: -60,
    waving: 0,
  }[pose.arm];

  // Expression
  const mouthPath = {
    neutral: 'M-3,0 Q0,2 3,0',
    happy: 'M-4,0 Q0,5 4,0',
    surprised: 'M-2,-2 Q0,3 2,-2',
    mischievous: 'M-4,1 Q0,4 4,0',
    loving: 'M-4,0 Q0,6 4,0',
  }[pose.expression];

  const eyeScale = pose.expression === 'surprised' ? 1.4 : 1;
  const isWalking = pose.body === 'walking';
  const isWaving = pose.arm === 'waving';

  return (
    <motion.g
      transform={`translate(${x}, ${y}) scale(${scale * flip}, ${scale})`}
      filter="url(#sketch)"
    >
      {/* Body/Shirt */}
      <motion.g
        animate={isWalking ? { y: [0, -3, 0] } : {}}
        transition={isWalking ? { duration: 0.5, repeat: Infinity } : {}}
      >
        {/* Legs */}
        <motion.g
          animate={isWalking ? { rotate: ['-10deg', '10deg', '-10deg'] } : {}}
          transition={isWalking ? { duration: 0.5, repeat: Infinity } : {}}
          style={{ transformOrigin: '0 50px' }}
        >
          <line x1="-6" y1="50" x2="-8" y2="80" stroke="#3c2415" strokeWidth="3" strokeLinecap="round" />
          {/* Shoe */}
          <ellipse cx="-10" cy="82" rx="6" ry="3" fill="#5a3a28" />
        </motion.g>
        <motion.g
          animate={isWalking ? { rotate: ['10deg', '-10deg', '10deg'] } : {}}
          transition={isWalking ? { duration: 0.5, repeat: Infinity } : {}}
          style={{ transformOrigin: '0 50px' }}
        >
          <line x1="6" y1="50" x2="8" y2="80" stroke="#3c2415" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="10" cy="82" rx="6" ry="3" fill="#5a3a28" />
        </motion.g>

        {/* Body - blue shirt */}
        <rect x="-14" y="20" width="28" height="32" rx="6" fill="#5b8cb8" stroke="#3c5a7a" strokeWidth="1.5" />

        {/* Left arm - animated with pose */}
        <motion.g
          animate={{ rotate: leftArmRotation }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{ transformOrigin: '-14px 28px' }}
        >
          <line x1="-14" y1="28" x2="-30" y2="48" stroke="#f5c8a0" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="-30" cy="49" r="3.5" fill="#f5c8a0" />
        </motion.g>

        {/* Right arm - either waving animation or pose-based */}
        {isWaving ? (
          <motion.g
            style={{ transformOrigin: '14px 28px' }}
            animate={{ rotate: [-100, -130, -100] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <line x1="14" y1="28" x2="26" y2="6" stroke="#f5c8a0" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="26" cy="4" r="3.5" fill="#f5c8a0" />
          </motion.g>
        ) : (
          <motion.g
            animate={{ rotate: rightArmRotation }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ transformOrigin: '14px 28px' }}
          >
            <line x1="14" y1="28" x2="30" y2="48" stroke="#f5c8a0" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="30" cy="49" r="3.5" fill="#f5c8a0" />
          </motion.g>
        )}

        {/* Head */}
        <circle cx="0" cy="4" r="16" fill="#f5c8a0" stroke="#e0a878" strokeWidth="1.5" />

        {/* Hair - messy boy hair (sits on top, doesn't cover face) */}
        <path
          d="M-14,-6 Q-12,-18 -4,-16 Q0,-22 6,-16 Q12,-18 14,-6 Q16,-10 14,-4"
          fill="#5a3a28" stroke="#3c2415" strokeWidth="1"
        />

        {/* Eyes */}
        <motion.g animate={{ scale: eyeScale }} style={{ transformOrigin: '0 0' }}>
          <circle cx="-5" cy="2" r="2.5" fill="#3c2415" />
          <circle cx="5" cy="2" r="2.5" fill="#3c2415" />
          {/* Eye shine */}
          <circle cx="-4" cy="1" r="0.8" fill="white" />
          <circle cx="6" cy="1" r="0.8" fill="white" />
        </motion.g>

        {/* Eyebrows */}
        {pose.expression === 'mischievous' ? (
          <>
            <line x1="-8" y1="-4" x2="-2" y2="-6" stroke="#5a3a28" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="-6" x2="8" y2="-3" stroke="#5a3a28" strokeWidth="1.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <line x1="-8" y1="-5" x2="-2" y2="-5" stroke="#5a3a28" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="-5" x2="8" y2="-5" stroke="#5a3a28" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}

        {/* Mouth */}
        <path d={mouthPath} transform="translate(0, 10)" stroke="#c0705a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Blush when happy/loving */}
        {(pose.expression === 'happy' || pose.expression === 'loving') && (
          <>
            <circle cx="-10" cy="7" r="3" fill="#e8788a" opacity="0.3" />
            <circle cx="10" cy="7" r="3" fill="#e8788a" opacity="0.3" />
          </>
        )}
      </motion.g>
    </motion.g>
  );
}
