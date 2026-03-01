'use client';

import { motion } from 'motion/react';

interface FlipBookPageProps {
  index: number;
  currentPage: number;
  children: React.ReactNode;
  totalPages: number;
}

export default function FlipBookPage({
  index,
  currentPage,
  children,
  totalPages,
}: FlipBookPageProps) {
  const isFlipped = index < currentPage;
  const isActive = index === currentPage;
  const zIndex = isFlipped
    ? index
    : totalPages - index;

  return (
    <motion.div
      className="absolute inset-0 preserve-3d"
      style={{
        transformOrigin: 'left center',
        zIndex: isActive ? totalPages + 1 : zIndex,
      }}
      animate={{
        rotateY: isFlipped ? -180 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
    >
      {/* Front face */}
      <div
        className="absolute inset-0 backface-hidden rounded-r-lg overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--flipbook-page) 0%, var(--flipbook-warm) 100%)',
          boxShadow: isActive ? '4px 0 16px var(--flipbook-shadow)' : '2px 0 8px var(--flipbook-shadow)',
        }}
      >
        {children}
      </div>

      {/* Back face - paper texture */}
      <div
        className="absolute inset-0 backface-hidden rounded-r-lg"
        style={{
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(225deg, var(--flipbook-warm) 0%, var(--flipbook-cream) 100%)',
          boxShadow: '-2px 0 8px var(--flipbook-shadow)',
        }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 28px,
              #c4a882 28px,
              #c4a882 29px
            )`,
          }}
        />
      </div>
    </motion.div>
  );
}
