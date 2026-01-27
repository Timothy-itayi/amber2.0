import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import DeviceMainMenu from '@/components/device-main-menu';
import GameStartTransition, { TransitionPhase } from '@/components/transitions/GameStartTransition';
import AmberLogoScreen from '@/components/screens/AmberLogoScreen';
import OnboardingModal from '@/components/modals/OnboardingModal';

/**
 * Game States:
 * - menu: Main menu with device UI
 * - starting: Transition sequence (text change → dissolve → blackout → boot)
 * - logo: AMBER logo screen (iPhone-style)
 * - onboarding: Onboarding modal over game UI
 * - playing: Actual gameplay
 */
type GameState = 'menu' | 'starting' | 'logo' | 'onboarding' | 'playing';

export default function Index() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleNewGame = useCallback(() => {
    console.log('Starting new game...');
    // Don't change text - just start the dissolve transition immediately
    // This avoids re-render issues that cause text to flicker/change
    setGameState('starting');
    setIsTransitioning(true);
  }, []);

  const handleSettings = useCallback(() => {
    console.log('Opening settings...');
    // Navigate to settings
  }, []);

  const handlePhaseChange = useCallback((phase: TransitionPhase) => {
    console.log('Transition phase:', phase);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    console.log('Boot sequence complete - showing logo');
    setIsTransitioning(false);
    setGameState('logo');
  }, []);

  const handleLogoComplete = useCallback(() => {
    console.log('Logo complete - showing onboarding');
    setGameState('onboarding');
    setShowOnboarding(true);
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    console.log('Onboarding complete - starting game');
    setShowOnboarding(false);
    setGameState('playing');
  }, []);

  // Render based on game state
  const renderContent = () => {
    switch (gameState) {
      case 'menu':
      case 'starting':
        return (
          <GameStartTransition
            active={isTransitioning}
            onPhaseChange={handlePhaseChange}
            onTransitionComplete={handleTransitionComplete}
          >
            <DeviceMainMenu
              title="HEDGEHOG III"
              onNewGame={handleNewGame}
              onSettings={handleSettings}
            />
          </GameStartTransition>
        );

      case 'logo':
        return (
          <AmberLogoScreen
            duration={3500}
            onComplete={handleLogoComplete}
          />
        );

      case 'onboarding':
      case 'playing':
        return (
          <View style={styles.gameContainer}>
            {/* Game UI will go here */}
            <View style={styles.placeholder}>
              {/* Placeholder for now - this is where the actual game UI would render */}
            </View>
            
            {/* Onboarding modal overlay */}
            <OnboardingModal
              visible={showOnboarding}
              onComplete={handleOnboardingComplete}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1e1c',
  },
  gameContainer: {
    flex: 1,
    backgroundColor: '#20242c',
  },
  placeholder: {
    flex: 1,
    // The actual game UI will replace this
  },
});