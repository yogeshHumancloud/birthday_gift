'use client';

import { motion } from 'motion/react';
import type { SceneProps } from '../flipbook/types';
import Background from '../illustrations/Background';
import FloatingHearts from '../illustrations/FloatingHearts';

export default function Scene08_HugScene({ isActive }: SceneProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg viewBox="0 0 400 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <Background variant="sky" isActive={isActive} />

        {/* Abundant floating hearts - heavy intensity */}
        {isActive && <FloatingHearts count={12} intensity="heavy" />}

        {/* Hug scene - simplified combined characters since hugging */}
        <motion.g
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isActive ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: '200px 380px' }}
          filter="url(#sketch)"
        >
          {/* Boy body (left) */}
          <rect x="170" y="380" width="26" height="30" rx="6" fill="#5b8cb8" stroke="#3c5a7a" strokeWidth="1.5" />
          {/* Girl body (right) - dress overlapping slightly */}
          <path d="M196,380 Q198,410 194,414 L218,414 Q222,410 216,380Z" fill="#e8788a" stroke="#d06878" strokeWidth="1.5" />

          {/* Arms hugging - boy's arm around girl */}
          <path d="M196,390 Q210,385 216,392" stroke="#f5c8a0" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* Girl's arm around boy */}
          <path d="M196,392 Q182,387 170,394" stroke="#f5c8a0" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Legs */}
          <line x1="178" y1="410" x2="176" y2="440" stroke="#3c2415" strokeWidth="3" strokeLinecap="round" />
          <line x1="190" y1="410" x2="192" y2="440" stroke="#3c2415" strokeWidth="3" strokeLinecap="round" />
          <line x1="202" y1="414" x2="200" y2="440" stroke="#f5c8a0" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="212" y1="414" x2="214" y2="440" stroke="#f5c8a0" strokeWidth="2.5" strokeLinecap="round" />

          {/* Shoes */}
          <ellipse cx="174" cy="442" rx="6" ry="3" fill="#5a3a28" />
          <ellipse cx="194" cy="442" rx="6" ry="3" fill="#5a3a28" />
          <ellipse cx="198" cy="442" rx="5" ry="2.5" fill="#e8788a" />
          <ellipse cx="216" cy="442" rx="5" ry="2.5" fill="#e8788a" />

          {/* Boy head */}
          <circle cx="183" cy="364" r="15" fill="#f5c8a0" stroke="#e0a878" strokeWidth="1.5" />
          {/* Boy hair */}
          <path d="M168,358 Q170,346 178,348 Q183,342 188,348 Q196,346 198,358" fill="#5a3a28" stroke="#3c2415" strokeWidth="1" />
          {/* Boy eyes (closed - happy) */}
          <path d="M177,363 Q180,366 183,363" stroke="#3c2415" strokeWidth="1.5" fill="none" />
          {/* Boy smile */}
          <path d="M179,370 Q183,375 187,370" stroke="#c0705a" strokeWidth="1.5" fill="none" />
          {/* Boy blush */}
          <circle cx="175" cy="367" r="3" fill="#e8788a" opacity="0.3" />

          {/* Girl head */}
          <circle cx="210" cy="364" r="14" fill="#f5c8a0" stroke="#e0a878" strokeWidth="1.5" />
          {/* Girl hair */}
          <path d="M196,360 Q194,346 202,344 Q208,340 214,344 Q222,346 224,360 Q226,368 224,376 M196,360 Q194,370 196,376" fill="#4a2810" stroke="#3c1f0a" strokeWidth="1" />
          {/* Girl bow */}
          <g transform="translate(220, 350)">
            <path d="M0,0 Q-4,-4 -2,-6 Q0,-4 0,0 Q0,-4 2,-6 Q4,-4 0,0Z" fill="#e8788a" />
            <circle cx="0" cy="0" r="1" fill="#d06878" />
          </g>
          {/* Girl eyes (closed - happy) */}
          <path d="M204,363 Q207,366 210,363" stroke="#3c2415" strokeWidth="1.5" fill="none" />
          {/* Girl smile */}
          <path d="M206,370 Q210,375 214,370" stroke="#c0705a" strokeWidth="1.5" fill="none" />
          {/* Girl blush */}
          <circle cx="218" cy="367" r="3" fill="#e8788a" opacity="0.3" />
        </motion.g>

        {/* Big heart above them */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={isActive ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        >
          <motion.g
            animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M200,310 C200,300 185,285 175,295 C165,305 175,320 200,340 C225,320 235,305 225,295 C215,285 200,300 200,310Z"
              fill="#e8788a"
              opacity="0.8"
              stroke="#d06878"
              strokeWidth="1"
            />
          </motion.g>
        </motion.g>

        <text x="370" y="540" className="font-hand" fill="var(--flipbook-brown)" opacity="0.3" fontSize="14" textAnchor="end">8</text>
      </svg>

      <motion.div
        className="absolute top-4 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="font-hand text-2xl md:text-3xl text-flipbook-pink font-semibold">
          The biggest hug ever!
        </p>
      </motion.div>
    </div>
  );
}
