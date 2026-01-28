import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  Extrapolation,
  runOnJS,
  withDelay,
  interpolateColor,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { gameConsoleStyles as styles, colors } from '../../styles/game-console.styles';
import { Ticket } from '../../data/tickets';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================
// FEATURE BOARD NAVIGATION LATCH
// ============================================
interface FeatureBoardLatchProps {
  onPress?: () => void;
  moduleCount?: number;
  /** When true, plays the "receiving module" animation */
  isReceiving?: boolean;
}

function FeatureBoardLatch({ onPress, moduleCount = 0, isReceiving = false }: FeatureBoardLatchProps) {
  const latchAnim = useSharedValue(0);
  const glowAnim = useSharedValue(0);
  const receiveAnim = useSharedValue(0);
  const receivePulse = useSharedValue(0);

  // Pulse glow when modules are installed
  React.useEffect(() => {
    if (moduleCount > 0) {
      glowAnim.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(0.3, { duration: 1000 })
        ),
        -1,
        false
      );
    } else {
      glowAnim.value = withTiming(0, { duration: 300 });
    }
  }, [moduleCount]);

  // Receiving animation - plays when a module is being installed
  React.useEffect(() => {
    if (isReceiving) {
      // Bright flash and pulse
      receiveAnim.value = withSequence(
        withTiming(1, { duration: 100 }),
        withTiming(0.6, { duration: 200 }),
        withTiming(1, { duration: 100 }),
        withTiming(0, { duration: 300 })
      );
      // Scale pulse
      receivePulse.value = withSequence(
        withSpring(1.15, { damping: 8, stiffness: 300 }),
        withSpring(1, { damping: 12, stiffness: 200 })
      );
    }
  }, [isReceiving]);

  const handlePress = () => {
    latchAnim.value = withSequence(
      withSpring(1, { damping: 15, stiffness: 400 }),
      withDelay(100, withSpring(0, { damping: 20, stiffness: 300 }))
    );
    onPress?.();
  };

  const animatedLatchStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(latchAnim.value, [0, 1], [0, 4]) },
      { scale: receivePulse.value || 1 },
    ],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowAnim.value,
  }));

  const animatedReceiveStyle = useAnimatedStyle(() => ({
    opacity: receiveAnim.value,
  }));

  return (
    <View style={latchStyles.container}>
      <View style={latchStyles.labelContainer}>
        <Text style={latchStyles.label}>FEATURES</Text>
      </View>
      
      <GestureDetector gesture={Gesture.Tap().onEnd(() => runOnJS(handlePress)())}>
        <Animated.View style={[latchStyles.latchFrame, animatedLatchStyle]}>
          <LinearGradient
            colors={[colors.metalHighlight, colors.metalMid, colors.metalDark]}
            style={StyleSheet.absoluteFill}
          />
          
          {/* Inner recess */}
          <View style={latchStyles.latchInner}>
            <LinearGradient
              colors={[colors.bodyDarker, colors.bodyDarkest, colors.bodyDarker]}
              style={StyleSheet.absoluteFill}
            />
            
            {/* Module count display */}
            <View style={latchStyles.countDisplay}>
              <Text style={latchStyles.countText}>
                {moduleCount > 0 ? moduleCount.toString().padStart(2, '0') : '--'}
              </Text>
            </View>
            
            {/* Status LED */}
            <View style={[
              latchStyles.led,
              moduleCount > 0 ? latchStyles.ledActive : latchStyles.ledOff
            ]} />
            
            {/* Glow overlay (ambient pulse) */}
            <Animated.View style={[latchStyles.glowOverlay, animatedGlowStyle]} />
            
            {/* Receive flash overlay */}
            <Animated.View style={[latchStyles.receiveFlash, animatedReceiveStyle]} />
          </View>
          
          {/* Edge highlights */}
          <View style={latchStyles.highlightTop} />
          <View style={latchStyles.shadowBottom} />
        </Animated.View>
      </GestureDetector>
      
      <Text style={latchStyles.sublabel}>▶ VIEW</Text>
    </View>
  );
}

const latchStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  labelContainer: {
    marginBottom: 6,
  },
  label: {
    fontFamily: 'monospace',
    fontSize: 8,
    fontWeight: '700',
    color: colors.textMid,
    letterSpacing: 2,
  },
  latchFrame: {
    width: 64,
    height: 52,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.metalDark,
    overflow: 'hidden',
    position: 'relative',
  },
  latchInner: {
    flex: 1,
    margin: 3,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  countDisplay: {
    backgroundColor: colors.screenBackground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.bodyDarkest,
  },
  countText: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: '700',
    color: colors.screenAmber,
    textShadowColor: colors.screenAmberDim,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  led: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.metalDark,
  },
  ledActive: {
    backgroundColor: colors.ledGreen,
    shadowColor: colors.ledGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  ledOff: {
    backgroundColor: colors.ledOff,
  },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.screenAmber,
    opacity: 0,
  },
  receiveFlash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.ledGreen,
    opacity: 0,
  },
  highlightTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  shadowBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sublabel: {
    fontFamily: 'monospace',
    fontSize: 7,
    color: colors.textDark,
    marginTop: 4,
    letterSpacing: 1,
  },
});

// ============================================
// INDUSTRIAL SLIDING SWITCH (iOS-inspired interaction)
// ============================================
interface ToggleSwitchProps {
  label?: string;
  onToggle?: (isOn: boolean) => void;
}

function ToggleSwitch({ label = 'APPLY', onToggle }: ToggleSwitchProps) {
  const [isOn, setIsOn] = useState(false);
  const switchTranslateX = useSharedValue(0);
  
  const SWITCH_WIDTH = 54;
  const HANDLE_SIZE = 24;
  const TRAVEL = SWITCH_WIDTH - HANDLE_SIZE - 4; // 4px for padding

  const springConfig = {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  };

  // Handle tap to toggle (JS thread)
  const handleTap = () => {
    const newState = !isOn;
    setIsOn(newState);
    switchTranslateX.value = withSpring(newState ? TRAVEL : 0, springConfig);
    onToggle?.(newState);
  };

  // Callbacks to run on JS thread from worklet
  const setOn = () => {
    setIsOn(true);
    onToggle?.(true);
  };
  
  const setOff = () => {
    setIsOn(false);
    onToggle?.(false);
  };

  // Tap gesture for simple tap-to-toggle
  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      runOnJS(handleTap)();
    });

  // Pan gesture for sliding
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Clamp to travel range based on drag
      const rawValue = event.translationX;
      switchTranslateX.value = Math.max(0, Math.min(TRAVEL, rawValue));
    })
    .onEnd(() => {
      // Snap based on final position
      if (switchTranslateX.value > TRAVEL / 2) {
        switchTranslateX.value = withSpring(TRAVEL, springConfig);
        runOnJS(setOn)();
      } else {
        switchTranslateX.value = withSpring(0, springConfig);
        runOnJS(setOff)();
      }
    });

  // Compose gestures: tap OR pan
  const composedGesture = Gesture.Race(tapGesture, panGesture);

  const animatedHandleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: switchTranslateX.value }],
  }));

  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      switchTranslateX.value,
      [0, TRAVEL],
      [colors.bodyDarkest, colors.screenAmberDim]
    ),
  }));

  return (
    <View style={styles.switchContainer}>
      <View style={styles.switchLabelContainer}>
        <Text style={styles.switchLabel}>{label}</Text>
      </View>

      <GestureDetector gesture={composedGesture}>
        <View style={styles.switchFrame}>
          {/* Outer metal bezel */}
          <LinearGradient
            colors={[colors.metalLight, colors.metalDark, colors.bodyDarkest]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.switchFrameInner} />

          {/* Sliding track */}
          <Animated.View style={[styles.switchTrack, animatedTrackStyle]}>
            {/* Inner track shadow */}
            <View style={styles.switchTrackShadow} />
            
            {/* Status indicators (recessed icons) */}
            <View style={styles.switchTrackIndicators}>
              <Text style={styles.switchTrackIcon}>○</Text>
              <Text style={styles.switchTrackIcon}>|</Text>
            </View>

            {/* The sliding handle */}
            <Animated.View style={[styles.switchHandle, animatedHandleStyle]}>
              <LinearGradient
                colors={[colors.metalHighlight, colors.metalMid, colors.metalDark]}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.switchHandleHighlight} />
              {/* Grip texture (recessed lines) */}
              <View style={styles.switchHandleGrip}>
                <View style={styles.switchHandleGripLine} />
                <View style={styles.switchHandleGripLine} />
                <View style={styles.switchHandleGripLine} />
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  );
}

// ============================================
// MAIN GAME CONSOLE COMPONENT
// ============================================
interface GameConsoleProps {
  currentTicket?: Ticket | null;
  selectedTool?: string | null;
  onLeverPull?: () => void;
  onToolSelect?: (tool: string) => void;
  onNavigateToFeatureBoard?: () => void;
  installedModulesCount?: number;
  ticketsRemaining?: number;
}

export default function GameConsole({
  currentTicket,
  selectedTool: externalSelectedTool,
  onLeverPull,
  onToolSelect,
  onNavigateToFeatureBoard,
  installedModulesCount = 0,
  ticketsRemaining = 0,
}: GameConsoleProps) {
  const [internalSelectedTool, setInternalSelectedTool] = useState<string | null>(null);
  
  // Use external selectedTool if provided, otherwise use internal state
  const selectedTool = externalSelectedTool !== undefined ? externalSelectedTool : internalSelectedTool;

  // Generate texture dots
  const textureDots = Array(30).fill(null).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    dark: Math.random() > 0.5,
  }));

  // Generate scanlines for screen
  const scanlines = Array(40).fill(null);

  const handleToolPress = (tool: string) => {
    setInternalSelectedTool(tool);
    onToolSelect?.(tool);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* ============================================ */}
        {/* MAIN CONSOLE BODY */}
        {/* ============================================ */}
        <View style={styles.consoleBody}>
          {/* Base gradient layer for depth */}
          <LinearGradient
            colors={[colors.bodyLight, colors.bodyPrimary, colors.bodySecondary, colors.bodyDark]}
            locations={[0, 0.15, 0.7, 1]}
            style={localStyles.consoleBodyGradient}
          />
          
          {/* Secondary lighting layer */}
          <LinearGradient
            colors={['rgba(255,255,255,0.06)', 'transparent', 'rgba(0,0,0,0.15)']}
            locations={[0, 0.3, 1]}
            style={localStyles.consoleLightingLayer}
          />
          
          {/* Texture layer */}
          <View style={styles.textureLayer}>
            {textureDots.map((dot, i) => (
              <View
                key={`dot-${i}`}
                style={[
                  styles.textureDot,
                  dot.dark && styles.textureDotDark,
                  {
                    top: `${dot.top}%`,
                    left: `${dot.left}%`,
                    width: dot.size,
                    height: dot.size,
                  },
                ]}
              />
            ))}
          </View>

          {/* Enhanced bevels */}
          <View style={styles.bevelHighlightTop} />
          <View style={styles.bevelHighlightLeft} />
          <View style={styles.bevelShadowBottom} />
          <View style={styles.bevelShadowRight} />
          
          {/* Corner accents for depth */}
          <View style={localStyles.cornerAccentTL} />
          <View style={localStyles.cornerAccentBR} />

          {/* Panel seams for industrial look */}
          <View style={[styles.panelSeamHorizontal, { top: 68 }]} />
          <View style={[styles.panelSeamHorizontal, { bottom: 45 }]} />

          {/* Corner rivets */}
          <View style={[styles.cornerRivet, { top: 8, left: 8 }]}>
            <View style={styles.cornerRivetInner} />
          </View>
          <View style={[styles.cornerRivet, { top: 8, right: 8 }]}>
            <View style={styles.cornerRivetInner} />
          </View>
          <View style={[styles.cornerRivet, { bottom: 8, left: 8 }]}>
            <View style={styles.cornerRivetInner} />
          </View>
          <View style={[styles.cornerRivet, { bottom: 8, right: 8 }]}>
            <View style={styles.cornerRivetInner} />
          </View>

          {/* Wear marks for aged look */}
          <View style={[styles.wearMark, { top: 120, left: 20, width: 15, height: 8 }]} />
          <View style={[styles.wearMark, { top: 200, right: 25, width: 10, height: 6 }]} />
          <View style={[styles.wearMark, { bottom: 80, left: 40, width: 12, height: 5 }]} />
          
          {/* Scratch marks */}
          <View style={[styles.scratchMark, { top: 150, left: 30, width: 25 }]} />
          <View style={[styles.scratchMark, { top: 280, right: 35, width: 18 }]} />

          {/* Industrial Connectors at bottom */}
          <View style={styles.bottomConnectors}>
            {[1, 2].map((i) => (
              <View key={i} style={styles.connectorCable}>
                <LinearGradient
                  colors={['#1a1a1a', '#0a0a0a', '#1a1a1a']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={StyleSheet.absoluteFill}
                />
                {/* Plug part */}
                <View style={styles.connectorPlug}>
                  <LinearGradient
                    colors={[colors.metalMid, colors.metalDark, colors.bodyDarkest]}
                    style={StyleSheet.absoluteFill}
                  />
                  {/* Threads */}
                  <View style={{ marginTop: 2, alignItems: 'center' }}>
                    {Array(3).fill(null).map((_, j) => (
                      <View key={j} style={styles.connectorThread} />
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* ============================================ */}
          {/* TOP SECTION - HEADER / STATUS */}
          {/* ============================================ */}
          <View style={styles.topSection}>
            {/* Header plate with depth layers */}
            <View style={styles.headerPlate}>
              <LinearGradient
                colors={[colors.bodyDark, colors.bodyDarker, colors.bodyDarkest]}
                locations={[0, 0.5, 1]}
                style={localStyles.headerPlateGradient}
              />
              <View style={styles.headerPlateHighlight} />
              <View style={localStyles.headerPlateInnerShadow} />
              <Text style={styles.headerText}>AMBER SUPPORT OS</Text>
              <Text style={styles.headerSubtext}>v3.2 • OP-7734</Text>
            </View>

            {/* Status LEDs with enhanced glow */}
            <View style={styles.statusLeds}>
              <View style={styles.ledContainer}>
                <View style={localStyles.ledSocket}>
                  <View style={[styles.led, styles.ledGreen]} />
                  <View style={localStyles.ledGlowGreen} />
                </View>
                <Text style={styles.ledLabel}>SYS</Text>
              </View>
              <View style={styles.ledContainer}>
                <View style={localStyles.ledSocket}>
                  <View style={[styles.led, styles.ledAmber]} />
                  <View style={localStyles.ledGlowAmber} />
                </View>
                <Text style={styles.ledLabel}>TKT</Text>
              </View>
              <View style={styles.ledContainer}>
                <View style={localStyles.ledSocket}>
                  <View style={[styles.led, selectedTool ? styles.ledGreen : styles.ledOff]} />
                  {selectedTool && <View style={localStyles.ledGlowGreen} />}
                </View>
                <Text style={styles.ledLabel}>TOOL</Text>
              </View>
            </View>
          </View>

          {/* ============================================ */}
          {/* MAIN SCREEN SECTION */}
          {/* ============================================ */}
          <View style={styles.screenSection}>
            {/* Outer frame with gradient depth */}
            <View style={styles.screenFrame}>
              <LinearGradient
                colors={[colors.bodyDark, colors.bodyDarker, colors.bodyDarkest]}
                locations={[0, 0.3, 1]}
                style={localStyles.screenFrameGradient}
              />
              <View style={styles.screenFrameHighlight} />
              <View style={styles.screenFrameShadow} />
              
              {/* Bezel with additional depth layers */}
              <View style={styles.screenBezel}>
                <View style={styles.screenBezelInner} />
                <View style={localStyles.bezelOuterRim} />
                
                {/* The CRT screen */}
                <View style={styles.screen}>
                  {/* Screen depth gradient */}
                  <LinearGradient
                    colors={['rgba(26,20,8,0.8)', 'rgba(10,8,4,0.4)', 'rgba(26,20,8,0.6)']}
                    locations={[0, 0.5, 1]}
                    style={localStyles.screenDepthGradient}
                  />
                  
                  {/* Screen effects */}
                  <View style={styles.screenGlow} />
                  
                  {/* Enhanced vignette */}
                  <LinearGradient
                    colors={['rgba(0,0,0,0.4)', 'transparent']}
                    style={localStyles.vignetteTop}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)']}
                    style={localStyles.vignetteBottom}
                  />
                  <LinearGradient
                    colors={['rgba(0,0,0,0.3)', 'transparent']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={localStyles.vignetteLeft}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.3)']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={localStyles.vignetteRight}
                  />
                  
                  {/* Scanlines */}
                  <View style={styles.scanlinesOverlay}>
                    {scanlines.map((_, i) => (
                      <View key={i} style={styles.scanline} />
                    ))}
                  </View>
                  
                  {/* Screen reflection / glare */}
                  <View style={styles.screenReflection} />
                  <View style={localStyles.screenGlareSecondary} />
                  
                  {/* Content area - where tickets will display */}
                  <View style={styles.screenContent}>
                    {currentTicket ? (
                      <>
                        {/* Ticket Header */}
                        <View style={localStyles.ticketHeader}>
                          <Text style={localStyles.ticketId}>{currentTicket.id}</Text>
                          <Text style={localStyles.ticketCategory}>{currentTicket.category}</Text>
                        </View>
                        
                        {/* Ticket Description */}
                        <Text style={styles.screenPlaceholder}>
                          {'>'} {currentTicket.description}
                        </Text>
                        
                        {/* Ticket Detail */}
                        {currentTicket.detail && (
                          <Text style={localStyles.ticketDetail}>
                            {currentTicket.detail}
                          </Text>
                        )}
                        
                        {/* Tool Status */}
                        {selectedTool ? (
                          <Text style={styles.screenToolSelected}>
                            TOOL READY: {selectedTool}
                          </Text>
                        ) : (
                          <Text style={styles.screenPlaceholderDim}>
                            Select a tool to process ticket
                          </Text>
                        )}
                      </>
                    ) : (
                      <>
                        <Text style={styles.screenPlaceholder}>
                          {'>'} {ticketsRemaining > 0 ? 'LOADING TICKET...' : 'QUEUE EMPTY'}
                        </Text>
                        <Text style={styles.screenPlaceholderDim}>
                          {ticketsRemaining > 0 
                            ? `${ticketsRemaining} ticket${ticketsRemaining !== 1 ? 's' : ''} remaining`
                            : 'All tickets processed'}
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
            </View>

            {/* Screen label */}
            <View style={styles.screenLabelRow}>
              <Text style={styles.screenLabel}>TICKET DISPLAY</Text>
              <Text style={styles.screenLabelRight}>Q67.709E</Text>
            </View>
          </View>

          {/* ============================================ */}
          {/* CONTROL PANEL SECTION */}
          {/* ============================================ */}
          <View style={styles.controlSection}>
            
            {/* Left side - Feature Board Latch + Toggle Switch */}
            <View style={styles.switchSection}>
              <FeatureBoardLatch
                onPress={onNavigateToFeatureBoard}
                moduleCount={installedModulesCount}
              />
              <ToggleSwitch 
                label="APPLY"
                onToggle={(isOn) => isOn && onLeverPull?.()}
              />
            </View>

            {/* Right side - Tool Buttons (directly visible) */}
            <View style={styles.panelSection}>
              <View style={styles.toolPanelContainer}>
                {/* Header */}
                <View style={styles.toolPanelHeader}>
                  <Text style={styles.toolPanelTitle}>SELECT TOOL</Text>
                </View>
                
                {/* Tool buttons grid */}
                <View style={styles.toolGrid}>
                  {['ROUTE', 'DEFER', 'FIX', 'ESCALATE'].map((tool) => (
                    <View
                      key={tool}
                      style={[
                        styles.toolButton,
                        selectedTool === tool && styles.toolButtonSelected,
                      ]}
                      onTouchEnd={() => handleToolPress(tool)}
                    >
                      {/* Button gradient */}
                      <LinearGradient
                        colors={
                          selectedTool === tool
                            ? [colors.screenAmberBright, colors.screenAmber, colors.screenAmberDim]
                            : [colors.bodySecondary, colors.bodyDark, colors.bodyDarker]
                        }
                        locations={[0, 0.5, 1]}
                        style={localStyles.toolButtonGradient}
                      />
                      {/* Top highlight */}
                      <View style={localStyles.toolButtonHighlight} />
                      {/* Button text */}
                      <Text style={[
                        styles.toolButtonText,
                        selectedTool === tool && styles.toolButtonTextSelected,
                      ]}>
                        {tool}
                      </Text>
                      {/* Bottom shadow */}
                      <View style={localStyles.toolButtonShadow} />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* ============================================ */}
          {/* BOTTOM SECTION - DECORATIVE DETAILS */}
          {/* ============================================ */}
          <View style={styles.bottomSection}>
            {/* Ventilation grille */}
            <View style={styles.ventGrille}>
              {Array(6).fill(null).map((_, i) => (
                <View key={i} style={styles.ventSlot}>
                  <LinearGradient
                    colors={[colors.bodyDarkest, colors.shadowDark, colors.bodyDarkest]}
                    style={StyleSheet.absoluteFill}
                  />
                </View>
              ))}
            </View>

            {/* Decorative rivets row */}
            <View style={styles.rivetRow}>
              {Array(5).fill(null).map((_, i) => (
                <View key={i} style={styles.decorativeRivet}>
                  <LinearGradient
                    colors={[colors.metalHighlight, colors.metalMid, colors.metalDark]}
                    locations={[0, 0.4, 1]}
                    style={StyleSheet.absoluteFill}
                  />
                  <View style={styles.rivetHighlight} />
                </View>
              ))}
            </View>
          </View>

        </View>
      </View>
    </GestureHandlerRootView>
  );
}

// ============================================
// LOCAL STYLES - Enhanced depth layers
// ============================================
const localStyles = StyleSheet.create({

  // Panel cavity enhancements
  cavityDepthGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
  },
  headerGlow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.screenAmber,
    shadowColor: colors.screenAmber,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  cavityAmbientLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: colors.screenAmber,
    opacity: 0.05,
  },

  // Sliding panel enhancements
  panelGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
  },
  panelEdgeGlow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.screenAmber,
    shadowColor: colors.screenAmber,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  panelInnerBevel: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 4,
  },
  labelShadow: {
    position: 'absolute',
    top: 1,
    left: 1,
  },
  enhancedGripBar: {
    position: 'relative',
  },
  gripBarHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 1,
  },
  rivetHighlight: {
    position: 'absolute',
    top: 1,
    left: 1,
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  panelBottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },


  // Header plate enhancements
  headerPlateGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 3,
  },
  headerPlateInnerShadow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 2,
  },

  // LED enhancements
  ledSocket: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.bodyDarkest,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.metalDark,
  },
  ledGlowGreen: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.ledGreen,
    opacity: 0.3,
  },
  ledGlowAmber: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.ledAmber,
    opacity: 0.25,
  },

  // Screen enhancements
  screenFrameGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
  },
  bezelOuterRim: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
  },
  screenDepthGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 2,
  },
  vignetteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  vignetteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  vignetteLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 30,
  },
  vignetteRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 30,
  },
  screenGlareSecondary: {
    position: 'absolute',
    bottom: -30,
    right: -30,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.015)',
    transform: [{ rotate: '45deg' }],
  },

  // Console body enhancements
  consoleBodyGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
  consoleLightingLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    zIndex: 1,
    pointerEvents: 'none',
  },
  cornerAccentTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderTopLeftRadius: 8,
    zIndex: 2,
    pointerEvents: 'none',
  },
  cornerAccentBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderBottomRightRadius: 8,
    zIndex: 2,
    pointerEvents: 'none',
  },

  // Tool button enhancements
  toolButtonGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 4,
  },
  toolButtonHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  toolButtonShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  // Ticket display styles
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.screenAmberDim,
  },
  ticketId: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    color: colors.screenAmberDim,
    letterSpacing: 1,
  },
  ticketCategory: {
    fontFamily: 'monospace',
    fontSize: 8,
    fontWeight: '700',
    color: colors.screenAmber,
    letterSpacing: 1,
    backgroundColor: colors.screenBackground,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.screenAmberDim,
  },
  ticketDetail: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.screenAmberDim,
    marginTop: 8,
    lineHeight: 14,
    opacity: 0.8,
  },
});
