'use client';

import { memo } from 'react';
import { useFlipBook } from './useFlipBook';
import FlipBookPage from './FlipBookPage';
import FlipBookControls from './FlipBookControls';
import { FrontCover, BackCover } from './FlipBookCover';
import SketchFilter from '../shared/SketchFilter';
import HandDrawnBorder from '../shared/HandDrawnBorder';
import Scene01_BoyWalking from '../scenes/Scene01_BoyWalking';
import Scene02_BoyWithGift from '../scenes/Scene02_BoyWithGift';
import Scene03_GiftReveal from '../scenes/Scene03_GiftReveal';
import Scene04_BoyMeetsGirl from '../scenes/Scene04_BoyMeetsGirl';
import Scene05_GirlReceives from '../scenes/Scene05_GirlReceives';
import Scene06_GirlOpens from '../scenes/Scene06_GirlOpens';
import Scene07_Surprise from '../scenes/Scene07_Surprise';
import Scene08_HugScene from '../scenes/Scene08_HugScene';
import Scene09_Celebration from '../scenes/Scene09_Celebration';
import Scene10_FinalMessage from '../scenes/Scene10_FinalMessage';

const MemoizedScene01 = memo(Scene01_BoyWalking);
const MemoizedScene02 = memo(Scene02_BoyWithGift);
const MemoizedScene03 = memo(Scene03_GiftReveal);
const MemoizedScene04 = memo(Scene04_BoyMeetsGirl);
const MemoizedScene05 = memo(Scene05_GirlReceives);
const MemoizedScene06 = memo(Scene06_GirlOpens);
const MemoizedScene07 = memo(Scene07_Surprise);
const MemoizedScene08 = memo(Scene08_HugScene);
const MemoizedScene09 = memo(Scene09_Celebration);
const MemoizedScene10 = memo(Scene10_FinalMessage);

const scenes = [
  MemoizedScene01,
  MemoizedScene02,
  MemoizedScene03,
  MemoizedScene04,
  MemoizedScene05,
  MemoizedScene06,
  MemoizedScene07,
  MemoizedScene08,
  MemoizedScene09,
  MemoizedScene10,
];

const TOTAL_PAGES = scenes.length + 2; // +2 for front and back covers

export default function FlipBook() {
  const {
    currentPage,
    isPlaying,
    nextPage,
    prevPage,
    goToPage,
    togglePlay,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTap,
  } = useFlipBook(TOTAL_PAGES);

  const pages = [
    // Page 0: Front cover
    <FrontCover key="front-cover" />,
    // Pages 1-10: Scenes
    ...scenes.map((SceneComponent, i) => (
      <SceneComponent key={`scene-${i}`} isActive={currentPage === i + 1} />
    )),
    // Page 11: Back cover
    <BackCover key="back-cover" />,
  ];

  return (
    <div className="w-full h-[100dvh] flex items-center justify-center bg-flipbook-cream overflow-hidden">
      {/* SVG filters */}
      <SketchFilter />

      {/* Book container */}
      <div
        className="relative w-full h-full
          md:max-w-md md:h-[85vh] md:rounded-2xl md:shadow-2xl
          lg:max-w-lg
          bg-flipbook-page overflow-hidden"
        style={{ perspective: '1200px' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleTap}
      >
        {/* Hand-drawn border (visible on tablet+) */}
        <div className="hidden md:block">
          <HandDrawnBorder />
        </div>

        {/* Pages */}
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {pages.map((content, index) => (
            <FlipBookPage
              key={index}
              index={index}
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
            >
              {content}
            </FlipBookPage>
          ))}
        </div>

        {/* Controls overlay */}
        <FlipBookControls
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          isPlaying={isPlaying}
          onPrev={prevPage}
          onNext={nextPage}
          onTogglePlay={togglePlay}
          onGoToPage={goToPage}
        />
      </div>
    </div>
  );
}
