import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import DeviceMainMenu from '@/components/device-main-menu';
import GameStartTransition, { TransitionPhase } from '@/components/transitions/GameStartTransition';
import AmberLogoScreen from '@/components/screens/AmberLogoScreen';
import OnboardingModal from '@/components/modals/OnboardingModal';
import GameConsole from '@/components/game/GameConsole';
import FeatureBoard, { InstalledModule, ModuleType } from '@/components/game/FeatureBoard';

/** When true, NEW GAME skips boot sequence and onboarding and goes straight to the game console. */
const DEV_SKIP_TO_GAME = true;

/**
 * Game States:
 * - menu: Main menu with device UI
 * - starting: Transition sequence (text change → dissolve → blackout → boot)
 * - logo: AMBER logo screen (iPhone-style)
 * - onboarding: Onboarding modal over game UI
 * - playing: Actual gameplay
 */
type GameState = 'menu' | 'starting' | 'logo' | 'onboarding' | 'playing';

/**
 * In-game screen states for switching between Ticket Console and Feature Board
 */
type GameScreen = 'console' | 'featureBoard';

/**
 * Tool to module type mapping
 */
const TOOL_TO_MODULE_TYPE: Record<string, ModuleType> = {
  'FIX': 'feature',
  'ROUTE': 'routed',
  'DEFER': 'archived',
  'ESCALATE': 'critical',
};

/**
 * Generate a feature name from a tool type (placeholder - will be ticket-driven)
 */
const generateFeatureName = (tool: string): string => {
  const features: Record<string, string[]> = {
    'FIX': [
      'AVIAN LOGISTICS INTEGRATION',
      'SHADOW LABOUR MODULE',
      'TEMPORAL CITRUS SUBSYSTEM',
      'SURPRISE ENTRY SYSTEM',
      'EMERGENCY MESSAGING DEVICE',
    ],
    'ROUTE': [
      'WILDLIFE SERVICES PACKET',
      'EXTERNAL SYSTEMS RELAY',
      'DEPARTMENT 7 TRANSFER',
      'LEGACY SUPPORT REDIRECT',
    ],
    'DEFER': [
      'PIGEON SUBSYSTEM ARCHIVE',
      'TUESDAY PROTOCOL BACKUP',
      'SHADOW CONTRACT STORAGE',
      'REALITY BUFFER CACHE',
    ],
    'ESCALATE': [
      'CRITICAL FEATURE ENABLED',
      'PRIORITY OVERRIDE ACTIVE',
      'EMERGENCY PROTOCOL LIVE',
      'SYSTEM ALERT ENGAGED',
    ],
  };
  const options = features[tool] || features['FIX'];
  return options[Math.floor(Math.random() * options.length)];
};

/**
 * Generate module status text
 */
const generateModuleStatus = (type: ModuleType): string => {
  switch (type) {
    case 'feature': return 'ACTIVE';
    case 'routed': return 'TRANSFERRED';
    case 'archived': return 'PRESERVED';
    case 'critical': return 'MONITORING';
  }
};

export default function Index() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // In-game state
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('console');
  const [installedModules, setInstalledModules] = useState<InstalledModule[]>([]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [ticketsProcessed, setTicketsProcessed] = useState(0);

  const handleNewGame = useCallback(() => {
    if (DEV_SKIP_TO_GAME) {
      setGameState('playing');
      setShowOnboarding(false);
      return;
    }
    console.log('Starting new game...');
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

  // ============================================
  // IN-GAME HANDLERS
  // ============================================
  
  const handleToolSelect = useCallback((tool: string) => {
    console.log('Tool selected:', tool);
    setSelectedTool(tool);
  }, []);

  const handleApplyTool = useCallback(() => {
    if (!selectedTool) {
      console.log('No tool selected');
      return;
    }

    console.log('Applying tool:', selectedTool);
    
    // Create a new module based on the selected tool
    const moduleType = TOOL_TO_MODULE_TYPE[selectedTool] || 'feature';
    const newModule: InstalledModule = {
      id: `module-${Date.now()}`,
      type: moduleType,
      name: generateFeatureName(selectedTool),
      status: generateModuleStatus(moduleType),
      ticketId: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
    };

    setInstalledModules(prev => [...prev, newModule]);
    setTicketsProcessed(prev => prev + 1);
    setSelectedTool(null);

    console.log('Module installed:', newModule.name);
  }, [selectedTool]);

  const handleNavigateToFeatureBoard = useCallback(() => {
    console.log('Navigating to Feature Board');
    setCurrentScreen('featureBoard');
  }, []);

  const handleNavigateToConsole = useCallback(() => {
    console.log('Navigating back to Console');
    setCurrentScreen('console');
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
            {/* Screen switching between Console and Feature Board */}
            {currentScreen === 'console' ? (
              <GameConsole
                onLeverPull={handleApplyTool}
                onToolSelect={handleToolSelect}
                onNavigateToFeatureBoard={handleNavigateToFeatureBoard}
                installedModulesCount={installedModules.length}
              />
            ) : (
              <FeatureBoard
                modules={installedModules}
                onBack={handleNavigateToConsole}
                systemLoad={Math.min(100, installedModules.length * 12 + 10)}
                ticketsProcessed={ticketsProcessed}
              />
            )}
            
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
    backgroundColor: '#0c0e10',
  },
});