import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import PixelDissolveOverlay from '../effects/PixelDissolve';
import { BootSequence } from '../boot/bootSequence';

export type TransitionPhase = 
  | 'idle'           // Normal menu state
  | 'dissolve'       // Pixel dissolve to black
  | 'blackout'       // Black screen
  | 'boot';          // Boot sequence playing

interface GameStartTransitionProps {
  active: boolean;
  onPhaseChange?: (phase: TransitionPhase) => void;
  onTransitionComplete?: () => void;
  children: React.ReactNode;
}

/**
 * GameStartTransition
 * 
 * Orchestrates the full "New Game" transition sequence:
 * 1. Pixel dissolve erodes device from center outward to black
 * 2. Brief black screen
 * 3. Boot sequence plays
 */
export default function GameStartTransition({
  active,
  onPhaseChange,
  onTransitionComplete,
  children,
}: GameStartTransitionProps) {
  const [phase, setPhase] = useState<TransitionPhase>('idle');

  const updatePhase = useCallback((newPhase: TransitionPhase) => {
    setPhase(newPhase);
    onPhaseChange?.(newPhase);
  }, [onPhaseChange]);

  useEffect(() => {
    if (!active) {
      updatePhase('idle');
      return;
    }

    // Small delay before starting dissolve
    const startTimer = setTimeout(() => {
      updatePhase('dissolve');
    }, 80);

    return () => {
      clearTimeout(startTimer);
    };
  }, [active, updatePhase]);

  const handleDissolveComplete = useCallback(() => {
    updatePhase('blackout');
    
    // Short blackout then start boot sequence
    const bootTimer = setTimeout(() => {
      updatePhase('boot');
    }, 1500); // 1.5s black screen before boot

    return () => {
      clearTimeout(bootTimer);
    };
  }, [updatePhase]);

  const handleBootComplete = useCallback(() => {
    onTransitionComplete?.();
  }, [onTransitionComplete]);

  // Render boot sequence when in boot phase
  if (phase === 'boot') {
    return (
      <View style={styles.container}>
        <BootSequence onComplete={handleBootComplete} />
      </View>
    );
  }

  // Render blackout screen
  if (phase === 'blackout') {
    return <View style={styles.blackScreen} />;
  }

  return (
    <View style={styles.container}>
      {/* Content rendered as-is, no re-renders from dissolve effect */}
      {children}
      
      {/* Pixel dissolve overlay - sits ON TOP of content */}
      <PixelDissolveOverlay
        active={phase === 'dissolve'}
        duration={2500}
        pixelSize={16}
        onComplete={handleDissolveComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blackScreen: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
