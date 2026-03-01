'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { FlipBookState, SwipeState } from './types';

const SWIPE_THRESHOLD = 50;

export function useFlipBook(totalPages: number) {
  const [state, setState] = useState<FlipBookState>({
    currentPage: 0,
    totalPages,
    isPlaying: true, // Auto-play by default
    isFlipping: false,
    direction: 'forward',
    speed: 3.5,
  });

  const swipeRef = useRef<SwipeState>({
    startX: 0,
    startY: 0,
    deltaX: 0,
    isSwiping: false,
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToPage = useCallback((page: number) => {
    if (state.isFlipping) return;
    const clamped = Math.max(0, Math.min(page, totalPages - 1));
    if (clamped === state.currentPage) return;

    setState(prev => ({
      ...prev,
      currentPage: clamped,
      direction: clamped > prev.currentPage ? 'forward' : 'backward',
      isFlipping: true,
    }));

    setTimeout(() => {
      setState(prev => ({ ...prev, isFlipping: false }));
    }, 800);
  }, [state.currentPage, state.isFlipping, totalPages]);

  const nextPage = useCallback(() => {
    if (state.currentPage < totalPages - 1) {
      goToPage(state.currentPage + 1);
    } else {
      // Stop autoplay at last page
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, [state.currentPage, totalPages, goToPage]);

  const prevPage = useCallback(() => {
    if (state.currentPage > 0) {
      goToPage(state.currentPage - 1);
    }
  }, [state.currentPage, goToPage]);

  const togglePlay = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const setSpeed = useCallback((speed: number) => {
    setState(prev => ({ ...prev, speed }));
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (state.isPlaying && !state.isFlipping && state.currentPage < totalPages - 1) {
      timerRef.current = setTimeout(() => {
        nextPage();
      }, state.speed * 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state.isPlaying, state.isFlipping, state.currentPage, state.speed, totalPages, nextPage]);

  // Touch/swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    swipeRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      deltaX: 0,
      isSwiping: true,
    };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!swipeRef.current.isSwiping) return;
    const touch = e.touches[0];
    swipeRef.current.deltaX = touch.clientX - swipeRef.current.startX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!swipeRef.current.isSwiping) return;
    const { deltaX } = swipeRef.current;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        nextPage();
      } else {
        prevPage();
      }
    }

    swipeRef.current.isSwiping = false;
    swipeRef.current.deltaX = 0;
  }, [nextPage, prevPage]);

  // Tap zones: left half = prev, right half = next
  const handleTap = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = rect.width / 2;

    if (x < half) {
      prevPage();
    } else {
      nextPage();
    }
  }, [nextPage, prevPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'p') {
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, togglePlay]);

  return {
    ...state,
    nextPage,
    prevPage,
    goToPage,
    togglePlay,
    setSpeed,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTap,
  };
}
