import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  interpolate,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import Svg, { Circle, Line, G } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { InstalledModule, ModuleType } from './FeatureBoard';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================
// COLORS
// ============================================
const mapColors = {
  background: '#0a0c08',
  scanLine: '#d4a84b',
  scanGlow: 'rgba(212, 168, 75, 0.15)',
  
  // Node colors by type
  nodeFeature: '#4ade80',      // Green
  nodeRouted: '#60a5fa',       // Blue
  nodeArchived: '#a78bfa',     // Purple
  nodeCritical: '#f87171',     // Red
  
  // Line colors
  lineDefault: 'rgba(212, 168, 75, 0.4)',
  lineActive: '#d4a84b',
  
  // Core node
  coreNode: '#d4a84b',
  
  // Text
  labelText: '#d4a84b',
  labelTextDim: 'rgba(212, 168, 75, 0.6)',
  
  // Grid
  gridLine: 'rgba(212, 168, 75, 0.08)',
};

// ============================================
// TYPES
// ============================================
interface NodePosition {
  x: number;
  y: number;
  angle: number;
}

interface SystemMapVisualizationProps {
  /** All previously installed modules (for existing nodes) */
  existingModules: InstalledModule[];
  /** The new module being installed (triggers animation) */
  newModule: InstalledModule;
  /** Called when animation completes */
  onComplete: () => void;
  /** Animation duration in ms */
  duration?: number;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate a deterministic position for a node based on its index
 * Nodes are placed in a spiral pattern around the center
 */
function getNodePosition(index: number): NodePosition {
  const centerX = SCREEN_WIDTH / 2;
  const centerY = SCREEN_HEIGHT / 2;
  
  // Spiral parameters
  const baseRadius = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.22;
  const radiusGrowth = 18;
  const angleStep = (Math.PI * 2) / 5; // 72 degrees between nodes
  const angleOffset = -Math.PI / 2; // Start at top
  
  const ringIndex = Math.floor(index / 5);
  const posInRing = index % 5;
  
  const angle = angleOffset + (posInRing * angleStep) + (ringIndex * 0.3);
  const radius = baseRadius + (ringIndex * radiusGrowth * 3);
  
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
    angle,
  };
}

/**
 * Get color for module type
 */
function getNodeColor(type: ModuleType): string {
  switch (type) {
    case 'feature': return mapColors.nodeFeature;
    case 'routed': return mapColors.nodeRouted;
    case 'archived': return mapColors.nodeArchived;
    case 'critical': return mapColors.nodeCritical;
  }
}

// ============================================
// SCAN SWEEP COMPONENT
// ============================================
function ScanSweep({ progress }: { progress: Animated.SharedValue<number> }) {
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      progress.value,
      [0, 1],
      [-SCREEN_HEIGHT, SCREEN_HEIGHT]
    );
    const opacity = interpolate(
      progress.value,
      [0, 0.1, 0.9, 1],
      [0, 1, 1, 0]
    );
    
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.scanSweep, animatedStyle]}>
      <LinearGradient
        colors={['transparent', mapColors.scanGlow, mapColors.scanLine, mapColors.scanGlow, 'transparent']}
        locations={[0, 0.3, 0.5, 0.7, 1]}
        style={styles.scanGradient}
      />
    </Animated.View>
  );
}

// ============================================
// GRID BACKGROUND
// ============================================
function GridBackground() {
  const gridLines = useMemo(() => {
    const lines: JSX.Element[] = [];
    const spacing = 40;
    
    // Vertical lines
    for (let x = 0; x < SCREEN_WIDTH; x += spacing) {
      lines.push(
        <Line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={SCREEN_HEIGHT}
          stroke={mapColors.gridLine}
          strokeWidth={1}
        />
      );
    }
    
    // Horizontal lines
    for (let y = 0; y < SCREEN_HEIGHT; y += spacing) {
      lines.push(
        <Line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={SCREEN_WIDTH}
          y2={y}
          stroke={mapColors.gridLine}
          strokeWidth={1}
        />
      );
    }
    
    return lines;
  }, []);

  return <G>{gridLines}</G>;
}

// ============================================
// STATIC NETWORK (existing modules)
// ============================================
interface StaticNetworkProps {
  modules: InstalledModule[];
  opacity: Animated.SharedValue<number>;
}

function StaticNetwork({ modules, opacity }: StaticNetworkProps) {
  const centerX = SCREEN_WIDTH / 2;
  const centerY = SCREEN_HEIGHT / 2;
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacity.value, [0, 1], [0, 0.6]),
  }));

  const positions = useMemo(() => 
    modules.map((_, i) => getNodePosition(i)),
    [modules.length]
  );

  return (
    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
        {/* Connection lines */}
        {positions.map((pos, i) => (
          <Line
            key={`line-${i}`}
            x1={centerX}
            y1={centerY}
            x2={pos.x}
            y2={pos.y}
            stroke={mapColors.lineDefault}
            strokeWidth={1}
          />
        ))}
        {/* Nodes */}
        {modules.map((module, i) => (
          <Circle
            key={`node-${i}`}
            cx={positions[i].x}
            cy={positions[i].y}
            r={6}
            fill={getNodeColor(module.type)}
          />
        ))}
      </Svg>
    </Animated.View>
  );
}

// ============================================
// NEW CONNECTION LINE (animated with clip)
// ============================================
interface NewConnectionProps {
  position: NodePosition;
  progress: Animated.SharedValue<number>;
  moduleType: ModuleType;
}

function NewConnection({ position, progress, moduleType }: NewConnectionProps) {
  const centerX = SCREEN_WIDTH / 2;
  const centerY = SCREEN_HEIGHT / 2;
  const lineColor = getNodeColor(moduleType);
  
  // Calculate line length for stroke dash
  const dx = position.x - centerX;
  const dy = position.y - centerY;
  const lineLength = Math.sqrt(dx * dx + dy * dy);
  
  const animatedStyle = useAnimatedStyle(() => {
    const clipWidth = interpolate(progress.value, [0, 1], [0, lineLength + 20]);
    return {
      width: clipWidth,
      opacity: progress.value > 0 ? 1 : 0,
    };
  });

  // Angle of line for rotation
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <Animated.View
      style={[
        styles.connectionClip,
        {
          left: centerX,
          top: centerY - 10,
          transform: [{ rotate: `${angle}deg` }],
          transformOrigin: 'left center',
        },
        animatedStyle,
      ]}
    >
      <Svg width={lineLength + 20} height={20}>
        <Line
          x1={0}
          y1={10}
          x2={lineLength}
          y2={10}
          stroke={lineColor}
          strokeWidth={2}
        />
      </Svg>
    </Animated.View>
  );
}

// ============================================
// NEW NODE (animated)
// ============================================
interface NewNodeProps {
  module: InstalledModule;
  position: NodePosition;
  progress: Animated.SharedValue<number>;
}

function NewNode({ module, position, progress }: NewNodeProps) {
  const color = getNodeColor(module.type);
  
  // Main node animation - bigger initial burst
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 0.3, 0.6, 1], [0, 1.8, 1.2, 1]);
    const opacity = interpolate(progress.value, [0, 0.2, 1], [0, 1, 1]);
    
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  // Inner glow ring - pulses outward
  const glowStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 0.4, 0.7, 1], [0, 2.5, 2, 1.6]);
    const opacity = interpolate(progress.value, [0, 0.3, 0.7, 1], [0, 1, 0.6, 0.4]);
    
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  // Outer burst ring - expands and fades
  const burstStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 0.5, 1], [0, 3, 4]);
    const opacity = interpolate(progress.value, [0, 0.3, 0.7, 1], [0, 0.6, 0.2, 0]);
    
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View
      style={[
        styles.nodeContainer,
        { left: position.x - 30, top: position.y - 30 },
      ]}
    >
      {/* Outer burst ring */}
      <Animated.View style={[styles.nodeBurst, { borderColor: color }, burstStyle]} />
      {/* Glow ring */}
      <Animated.View style={[styles.nodeGlow, { borderColor: color }, glowStyle]} />
      {/* Node */}
      <Animated.View style={[styles.node, { backgroundColor: color }, animatedStyle]} />
    </View>
  );
}

// ============================================
// LABEL COMPONENT
// ============================================
interface LabelProps {
  text: string;
  position: NodePosition;
  opacity: Animated.SharedValue<number>;
  type: ModuleType;
}

function Label({ text, position, opacity, type }: LabelProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: interpolate(opacity.value, [0, 1], [10, 0]) },
    ],
  }));

  const getTypeBadgeColor = () => {
    switch (type) {
      case 'feature': return mapColors.nodeFeature;
      case 'routed': return mapColors.nodeRouted;
      case 'archived': return mapColors.nodeArchived;
      case 'critical': return mapColors.nodeCritical;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'feature': return 'FEATURE';
      case 'routed': return 'ROUTED';
      case 'archived': return 'ARCHIVED';
      case 'critical': return 'CRITICAL';
    }
  };

  return (
    <Animated.View
      style={[
        styles.labelContainer,
        {
          left: position.x - 100,
          top: position.y + 25,
        },
        animatedStyle,
      ]}
    >
      <View style={[styles.typeBadge, { backgroundColor: getTypeBadgeColor() }]}>
        <Text style={styles.typeBadgeText}>{getTypeLabel()}</Text>
      </View>
      <Text style={styles.labelText}>{text}</Text>
      <Text style={styles.labelStatus}>— ACTIVE</Text>
    </Animated.View>
  );
}

// ============================================
// CORE NODE (center)
// ============================================
function CoreNode({ pulse }: { pulse: Animated.SharedValue<number> }) {
  const centerX = SCREEN_WIDTH / 2;
  const centerY = SCREEN_HEIGHT / 2;
  
  const coreStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulse.value, [0, 1], [1, 1.15]);
    return { transform: [{ scale }] };
  });
  
  const ringStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulse.value, [0, 1], [1, 1.4]);
    const opacity = interpolate(pulse.value, [0, 1], [0.6, 0.2]);
    return { transform: [{ scale }], opacity };
  });

  return (
    <View style={[styles.coreContainer, { left: centerX - 25, top: centerY - 25 }]}>
      <Animated.View style={[styles.coreRing, ringStyle]} />
      <Animated.View style={[styles.coreNode, coreStyle]} />
      <View style={styles.coreHighlight} />
    </View>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function SystemMapVisualization({
  existingModules,
  newModule,
  onComplete,
  duration = 3800,
}: SystemMapVisualizationProps) {
  // Animation values
  const fadeIn = useSharedValue(0);
  const scanProgress = useSharedValue(0);
  const lineProgress = useSharedValue(0);
  const nodeProgress = useSharedValue(0);
  const labelOpacity = useSharedValue(0);
  const corePulse = useSharedValue(0);
  
  // Track animation phases for SVG visibility
  const [showNewLine, setShowNewLine] = useState(false);
  const [showNewNode, setShowNewNode] = useState(false);
  
  // Calculate positions
  const newNodeIndex = existingModules.length;
  const newNodePosition = useMemo(() => getNodePosition(newNodeIndex), [newNodeIndex]);

  // Run animation sequence - extended timing for more dramatic effect
  useEffect(() => {
    // Phase 1: Fade in existing elements (0-400ms)
    fadeIn.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) });
    
    // Phase 2: Scan sweep (200-900ms) - slower, more dramatic
    scanProgress.value = withDelay(200, withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) }));
    
    // Phase 3: Show and draw connection line (900-1800ms) - longer line draw
    const lineTimer = setTimeout(() => {
      setShowNewLine(true);
      lineProgress.value = withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) });
    }, 900);
    
    // Phase 4: Node appears (1600-2200ms) - more time for node to pulse in
    const nodeTimer = setTimeout(() => {
      setShowNewNode(true);
      nodeProgress.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.back(2)) });
    }, 1600);
    
    // Phase 5: Label fades in (2100-2800ms) - gives time to see the node
    labelOpacity.value = withDelay(2100, withTiming(1, { duration: 700, easing: Easing.out(Easing.ease) }));
    
    // Core pulse throughout
    corePulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
    
    // Trigger completion - longer hold at end
    const completionTimer = setTimeout(() => {
      onComplete();
    }, duration);
    
    return () => {
      clearTimeout(lineTimer);
      clearTimeout(nodeTimer);
      clearTimeout(completionTimer);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.background} />
      
      {/* Grid layer */}
      <View style={styles.svgContainer}>
        <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
          <GridBackground />
        </Svg>
      </View>
      
      {/* Existing network */}
      <StaticNetwork modules={existingModules} opacity={fadeIn} />
      
      {/* Core node */}
      <CoreNode pulse={corePulse} />
      
      {/* New connection line */}
      {showNewLine && (
        <NewConnection position={newNodePosition} progress={lineProgress} moduleType={newModule.type} />
      )}
      
      {/* New node */}
      {showNewNode && (
        <NewNode module={newModule} position={newNodePosition} progress={nodeProgress} />
      )}
      
      {/* Scan sweep effect */}
      <ScanSweep progress={scanProgress} />
      
      {/* Label */}
      <Label
        text={newModule.name}
        position={newNodePosition}
        opacity={labelOpacity}
        type={newModule.type}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>SYSTEM INTEGRATION</Text>
        <Text style={styles.headerSubtext}>INSTALLING MODULE...</Text>
      </View>
      
      {/* Footer status */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          MODULE {existingModules.length + 1} • {newModule.type.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mapColors.background,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: mapColors.background,
  },
  svgContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  scanSweep: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 100,
    zIndex: 10,
  },
  scanGradient: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  headerText: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: '700',
    color: mapColors.labelText,
    letterSpacing: 4,
  },
  headerSubtext: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: mapColors.labelTextDim,
    letterSpacing: 2,
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  footerText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: mapColors.labelTextDim,
    letterSpacing: 2,
  },
  labelContainer: {
    position: 'absolute',
    width: 200,
    alignItems: 'center',
    zIndex: 20,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
    marginBottom: 4,
  },
  typeBadgeText: {
    fontFamily: 'monospace',
    fontSize: 8,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1,
  },
  labelText: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    color: mapColors.labelText,
    textAlign: 'center',
    textShadowColor: mapColors.scanGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  labelStatus: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: mapColors.labelTextDim,
    marginTop: 2,
  },
  // Connection line clip container
  connectionClip: {
    position: 'absolute',
    height: 20,
    overflow: 'hidden',
  },
  // Node styles
  nodeContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  node: {
    width: 18,
    height: 18,
    borderRadius: 9,
    position: 'absolute',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  nodeGlow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    position: 'absolute',
  },
  nodeBurst: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    position: 'absolute',
  },
  // Core node styles
  coreContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coreNode: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: mapColors.coreNode,
    position: 'absolute',
  },
  coreRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: mapColors.coreNode,
    position: 'absolute',
  },
  coreHighlight: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    position: 'absolute',
    top: 18,
    left: 18,
  },
});
