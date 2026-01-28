import { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import DeviceMainMenu from '@/components/device-main-menu';
import GameStartTransition, { TransitionPhase } from '@/components/transitions/GameStartTransition';
import AmberLogoScreen from '@/components/screens/AmberLogoScreen';
import OnboardingModal from '@/components/modals/OnboardingModal';
import GameConsole from '@/components/game/GameConsole';
import FeatureBoard, { InstalledModule, ModuleType } from '@/components/game/FeatureBoard';
import SystemMapVisualization from '@/components/game/SystemMapVisualization';
import { Ticket, getShuffledTickets, getModuleStatus } from '@/data/tickets';

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
 * In-game screen states for switching between Ticket Console, Feature Board, and Transformation
 */
type GameScreen = 'console' | 'featureBoard' | 'transforming';

/**
 * Tool to module type mapping
 */
const TOOL_TO_MODULE_TYPE: Record<string, ModuleType> = {
  'FIX': 'feature',
  'ROUTE': 'routed',
  'DEFER': 'archived',
  'ESCALATE': 'critical',
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
  
  // Pending module for transformation animation
  const [pendingModule, setPendingModule] = useState<InstalledModule | null>(null);
  
  // Ticket queue - shuffled on game start
  const [ticketQueue, setTicketQueue] = useState<Ticket[]>(() => getShuffledTickets());
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  
  // Derived state
  const currentTicket = useMemo(() => 
    currentTicketIndex < ticketQueue.length ? ticketQueue[currentTicketIndex] : null,
    [ticketQueue, currentTicketIndex]
  );
  const ticketsRemaining = ticketQueue.length - currentTicketIndex;

  const handleNewGame = useCallback(() => {
    // Reset game state for new session
    setTicketQueue(getShuffledTickets());
    setCurrentTicketIndex(0);
    setInstalledModules([]);
    setTicketsProcessed(0);
    setSelectedTool(null);
    setCurrentScreen('console');
    
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

    if (!currentTicket) {
      console.log('No ticket to process');
      return;
    }

    console.log('Applying tool:', selectedTool, 'to ticket:', currentTicket.id);
    
    // Create a new module based on the selected tool and current ticket
    const moduleType = TOOL_TO_MODULE_TYPE[selectedTool] || 'feature';
    const newModule: InstalledModule = {
      id: `module-${Date.now()}`,
      type: moduleType,
      name: currentTicket.featureNames[moduleType],
      status: getModuleStatus(moduleType),
      ticketId: currentTicket.id,
    };

    // Store pending module and switch to transformation screen
    setPendingModule(newModule);
    setCurrentScreen('transforming');
    setSelectedTool(null);
    
    // Advance to next ticket
    setCurrentTicketIndex(prev => prev + 1);

    console.log('Starting transformation for:', newModule.name);
  }, [selectedTool, currentTicket]);

  const handleTransformationComplete = useCallback(() => {
    if (!pendingModule) {
      console.log('No pending module to install');
      setCurrentScreen('console');
      return;
    }

    console.log('Transformation complete, installing:', pendingModule.name);
    
    // Actually install the module now
    setInstalledModules(prev => [...prev, pendingModule]);
    setTicketsProcessed(prev => prev + 1);
    setPendingModule(null);
    setCurrentScreen('console');
  }, [pendingModule]);

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
            {/* Screen switching between Console, Feature Board, and Transformation */}
            {currentScreen === 'console' && (
              <GameConsole
                currentTicket={currentTicket}
                selectedTool={selectedTool}
                onLeverPull={handleApplyTool}
                onToolSelect={handleToolSelect}
                onNavigateToFeatureBoard={handleNavigateToFeatureBoard}
                installedModulesCount={installedModules.length}
                ticketsRemaining={ticketsRemaining}
              />
            )}
            
            {currentScreen === 'featureBoard' && (
              <FeatureBoard
                modules={installedModules}
                onBack={handleNavigateToConsole}
                systemLoad={Math.min(100, installedModules.length * 12 + 10)}
                ticketsProcessed={ticketsProcessed}
              />
            )}
            
            {currentScreen === 'transforming' && pendingModule && (
              <SystemMapVisualization
                existingModules={installedModules}
                newModule={pendingModule}
                onComplete={handleTransformationComplete}
                duration={3800}
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
