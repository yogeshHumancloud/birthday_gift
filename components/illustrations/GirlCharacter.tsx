'use client';

import { motion } from 'motion/react';
import type { CharacterPose } from '../flipbook/types';

interface GirlCharacterProps {
  pose: CharacterPose;
  x?: number;
  y?: number;
  scale?: number;
}

export default function GirlCharacter({ pose, x = 0, y = 0, scale = 1 }: GirlCharacterProps) {
  const flip = pose.facing === 'left' ? -1 : 1;

  const rightArmRotation = {
    down: 0,
    behind: -60,
    forward: 40,
    up: -120,
    hugging: -60,
    waving: -100,
  }[pose.arm];

  const leftArmRotation = {
    down: 0,
    behind: 60,
    forward: -40,
    up: 120,
    hugging: 60,
    waving: 0,
  }[pose.arm];

  const mouthPath = {
    neutral: 'M-3,0 Q0,2 3,0',
    happy: 'M-4,0 Q0,5 4,0',
    surprised: 'M-3,-2 A3,3 0 1,0 3,-2',
    mischievous: 'M-4,1 Q0,4 4,0',
    loving: 'M-4,0 Q0,6 4,0',
  }[pose.expression];

  const eyeScale = pose.expression === 'surprised' ? 1.5 : 1;
  const isWalking = pose.body === 'walking';
  const isWaving = pose.arm === 'waving';

  return (
    <motion.g
      transform={`translate(${x}, ${y}) scale(${scale * flip}, ${scale})`}
      filter="url(#sketch)"
    >
      <motion.g
        animate={isWalking ? { y: [0, -3, 0] } : {}}
        transition={isWalking ? { duration: 0.5, repeat: Infinity } : {}}
      >
        {/* Legs */}
        <motion.g
          animate={isWalking ? { rotate: ['-8deg', '8deg', '-8deg'] } : {}}
          transition={isWalking ? { duration: 0.5, repeat: Infinity } : {}}
          style={{ transformOrigin: '0 54px' }}
        >
          <line x1="-5" y1="54" x2="-6" y2="80" stroke="#f5c8a0" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="-8" cy="82" rx="5" ry="2.5" fill="#e8788a" />
        </motion.g>
        <motion.g
          animate={isWalking ? { rotate: ['8deg', '-8deg', '8deg'] } : {}}
          transition={isWalking ? { duration: 0.5, repeat: Infinity } : {}}
          style={{ transformOrigin: '0 54px' }}
        >
          <line x1="5" y1="54" x2="6" y2="80" stroke="#f5c8a0" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="8" cy="82" rx="5" ry="2.5" fill="#e8788a" />
        </motion.g>

        {/* Dress */}
        <path
          d="M-16,22 Q-18,54 -14,56 L14,56 Q18,54 16,22 Z"
          fill="#e8788a" stroke="#d06878" strokeWidth="1.5"
        />
        {/* Dress pattern - small dots */}
        <circle cx="-4" cy="35" r="1" fill="#f5a0b0" opacity="0.6" />
        <circle cx="6" cy="40" r="1" fill="#f5a0b0" opacity="0.6" />
        <circle cx="-8" cy="45" r="1" fill="#f5a0b0" opacity="0.6" />
        <circle cx="2" cy="48" r="1" fill="#f5a0b0" opacity="0.6" />

        {/* Left arm - animated with pose */}
        <motion.g
          animate={{ rotate: leftArmRotation }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{ transformOrigin: '-14px 28px' }}
        >
          <line x1="-14" y1="28" x2="-28" y2="46" stroke="#f5c8a0" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-28" cy="47" r="3" fill="#f5c8a0" />
        </motion.g>

        {/* Right arm - either waving animation or pose-based */}
        {isWaving ? (
          <motion.g
            style={{ transformOrigin: '14px 28px' }}
            animate={{ rotate: [-100, -130, -100] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <line x1="14" y1="28" x2="24" y2="8" stroke="#f5c8a0" strokeWidth="3" strokeLinecap="round" />
            <circle cx="24" cy="6" r="3" fill="#f5c8a0" />
          </motion.g>
        ) : (
          <motion.g
            animate={{ rotate: rightArmRotation }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ transformOrigin: '14px 28px' }}
          >
            <line x1="14" y1="28" x2="28" y2="46" stroke="#f5c8a0" strokeWidth="3" strokeLinecap="round" />
            <circle cx="28" cy="47" r="3" fill="#f5c8a0" />
          </motion.g>
        )}

        {/* Hair behind head (back layer) */}
        <path
          d="M-12,2 Q-16,10 -14,22 Q-13,26 -11,24
             M12,2 Q16,10 14,22 Q13,26 11,24"
          fill="#4a2810" stroke="#3c1f0a" strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Head */}
        <circle cx="0" cy="4" r="15" fill="#f5c8a0" stroke="#e0a878" strokeWidth="1.5" />

        {/* Hair on top - sits above head, does NOT cover face */}
        <path
          d="M-15,2 Q-15,-10 -10,-15 Q-4,-20 2,-16 Q8,-20 13,-14 Q16,-8 15,2"
          fill="#4a2810" stroke="#3c1f0a" strokeWidth="1"
        />
        {/* Hair side strands - frame the face, don't cover it */}
        <path
          d="M-15,2 Q-17,6 -16,12 Q-15,16 -13,14"
          fill="#4a2810" stroke="#3c1f0a" strokeWidth="1"
        />
        <path
          d="M15,2 Q17,6 16,12 Q15,16 13,14"
          fill="#4a2810" stroke="#3c1f0a" strokeWidth="1"
        />
        {/* Hair highlight */}
        <path d="M-8,-13 Q-4,-17 2,-14" stroke="#6b3d1e" strokeWidth="1.5" fill="none" opacity="0.4" />

        {/* Bow */}
        <g transform="translate(12, -12)">
          <path d="M0,0 Q-6,-5 -3,-8 Q0,-6 0,0 Q0,-6 3,-8 Q6,-5 0,0Z" fill="#e8788a" stroke="#d06878" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1.5" fill="#d06878" />
        </g>

        {/* Eyes */}
        <motion.g animate={{ scale: eyeScale }} style={{ transformOrigin: '0 2px' }}>
          <ellipse cx="-5" cy="2" rx="2.5" ry="3" fill="#3c2415" />
          <ellipse cx="5" cy="2" rx="2.5" ry="3" fill="#3c2415" />
          {/* Eye shine */}
          <circle cx="-4" cy="0.5" r="1" fill="white" />
          <circle cx="6" cy="0.5" r="1" fill="white" />
          {/* Eyelashes */}
          <line x1="-8" y1="0" x2="-7" y2="-2" stroke="#3c2415" strokeWidth="0.8" />
          <line x1="8" y1="0" x2="7" y2="-2" stroke="#3c2415" strokeWidth="0.8" />
        </motion.g>

        {/* Mouth */}
        <path d={mouthPath} transform="translate(0, 10)" stroke="#c0705a" strokeWidth="1.5" fill={pose.expression === 'surprised' ? '#c0705a' : 'none'} strokeLinecap="round" />

        {/* Blush */}
        {(pose.expression === 'happy' || pose.expression === 'loving' || pose.expression === 'surprised') && (
          <>
            <circle cx="-10" cy="7" r="3.5" fill="#e8788a" opacity="0.25" />
            <circle cx="10" cy="7" r="3.5" fill="#e8788a" opacity="0.25" />
          </>
        )}
      </motion.g>
    </motion.g>
  );
}
