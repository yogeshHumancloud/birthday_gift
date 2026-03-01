export interface FlipBookState {
  currentPage: number;
  totalPages: number;
  isPlaying: boolean;
  isFlipping: boolean;
  direction: 'forward' | 'backward';
  speed: number; // seconds per page
}

export interface SceneProps {
  isActive: boolean;
  onAnimationComplete?: () => void;
}

export interface CharacterPose {
  body: 'standing' | 'walking' | 'reaching' | 'hugging' | 'celebrating' | 'waving';
  arm: 'down' | 'behind' | 'forward' | 'up' | 'hugging' | 'waving';
  expression: 'neutral' | 'happy' | 'surprised' | 'mischievous' | 'loving';
  facing: 'left' | 'right';
}

export interface FlipBookPageProps {
  index: number;
  currentPage: number;
  totalPages: number;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  isFlipping: boolean;
}

export type FlipDirection = 'forward' | 'backward';

export interface SwipeState {
  startX: number;
  startY: number;
  deltaX: number;
  isSwiping: boolean;
}
