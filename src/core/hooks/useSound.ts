import { useCallback } from 'react';
import { useOSStore } from '../store/useOSStore';

export type SoundType = 'chime' | 'click' | 'minimize' | 'sent' | 'trash' | 'hover';

const SOUND_PATHS: Record<SoundType, string> = {
  chime: '/sounds/nintendo-game-boy-startup.mp3',
  click: '/sounds/mixkit-fast-double-click-on-mouse-275.wav',
  minimize: '/sounds/minimize.mp3',
  sent: '/sounds/sent.mp3',
  trash: '/sounds/trash.mp3',
  hover: '/sounds/macos_hover_tick.wav',
};

// Audio instance pool to prevent garbage collection churn and memory spikes
const audioCache: Partial<Record<SoundType, HTMLAudioElement>> = {};

function getCachedAudio(type: SoundType): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!audioCache[type]) {
    try {
      const audio = new Audio(SOUND_PATHS[type]);
      audio.preload = 'auto';
      audioCache[type] = audio;
    } catch {
      return null;
    }
  }
  return audioCache[type] || null;
}

export function useSound() {
  const isSoundEnabled = useOSStore((state) => state.isSoundEnabled);

  const playSound = useCallback((type: SoundType, volume = 0.5) => {
    if (!isSoundEnabled) return;

    try {
      const audio = getCachedAudio(type);
      if (audio) {
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play().catch((err) => {
          // Handled gracefully (e.g. autoplay policy)
        });
      }
    } catch (e) {
      // AudioContext / Audio not ready
    }
  }, [isSoundEnabled]);

  return { playSound };
}
