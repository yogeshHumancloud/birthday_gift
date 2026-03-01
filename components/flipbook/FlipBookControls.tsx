'use client';

import { motion } from 'motion/react';

interface FlipBookControlsProps {
  currentPage: number;
  totalPages: number;
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onGoToPage: (page: number) => void;
}

export default function FlipBookControls({
  currentPage,
  totalPages,
  isPlaying,
  onPrev,
  onNext,
  onTogglePlay,
  onGoToPage,
}: FlipBookControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom,8px)]">
      <div className="flex flex-col items-center gap-2 p-3">
        {/* Page dots */}
        <div className="flex gap-1.5 mb-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                onGoToPage(i);
              }}
              className="group p-1"
              aria-label={`Go to page ${i + 1}`}
            >
              <motion.div
                className="rounded-full"
                style={{
                  backgroundColor: i === currentPage
                    ? 'var(--flipbook-pink)'
                    : 'var(--flipbook-brown)',
                  opacity: i === currentPage ? 1 : 0.3,
                }}
                animate={{
                  width: i === currentPage ? 20 : 8,
                  height: 8,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {!isPlaying && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              disabled={currentPage === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center
                bg-flipbook-brown/10 hover:bg-flipbook-brown/20
                disabled:opacity-30 disabled:cursor-not-allowed
                transition-colors font-hand text-xl text-flipbook-brown"
              aria-label="Previous page"
            >
              &#8249;
            </button>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); onTogglePlay(); }}
            className="w-12 h-12 rounded-full flex items-center justify-center
              bg-flipbook-pink/20 hover:bg-flipbook-pink/30
              transition-colors text-flipbook-pink"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="4" y="3" width="4" height="14" rx="1" />
                <rect x="12" y="3" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3l12 7-12 7V3z" />
              </svg>
            )}
          </button>

          {!isPlaying && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              disabled={currentPage === totalPages - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center
                bg-flipbook-brown/10 hover:bg-flipbook-brown/20
                disabled:opacity-30 disabled:cursor-not-allowed
                transition-colors font-hand text-xl text-flipbook-brown"
              aria-label="Next page"
            >
              &#8250;
            </button>
          )}
        </div>

        <p className="font-hand text-sm text-flipbook-brown/50">
          {currentPage + 1} / {totalPages}
        </p>
      </div>
    </div>
  );
}
