import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import Svg, { Circle, Line, G } from 'react-native-svg';
import { InstalledModule, ModuleType } from './FeatureBoard';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================
// COLORS (shared with SystemMapVisualization)
// ============================================
export const mapColors = {
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

interface SystemMapProps {
  modules: InstalledModule[];
  /** Width of the map container */
  width?: number;
  /** Height of the map container */
  height?: number;
  /** Show grid background */
  showGrid?: boolean;
  /** Show labels on nodes */
  showLabels?: boolean;
  /** Callback when a node is tapped */
  onNodePress?: (module: InstalledModule) => void;
  /** Currently selected module (for highlighting) */
  selectedModuleId?: string | null;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate a deterministic position for a node based on its index
 */
export function getNodePosition(index: number, containerWidth: number, containerHeight: number): NodePosition {
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  
  // Spiral parameters - adjusted for container size
  const baseRadius = Math.min(containerWidth, containerHeight) * 0.22;
  const radiusGrowth = Math.min(containerWidth, containerHeight) * 0.04;
  const angleStep = (Math.PI * 2) / 5;
  const angleOffset = -Math.PI / 2;
  
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
export function getNodeColor(type: ModuleType): string {
  switch (type) {
    case 'feature': return mapColors.nodeFeature;
    case 'routed': return mapColors.nodeRouted;
    case 'archived': return mapColors.nodeArchived;
    case 'critical': return mapColors.nodeCritical;
  }
}

// ============================================
// GRID BACKGROUND
// ============================================
function GridBackground({ width, height }: { width: number; height: number }) {
  const gridLines = useMemo(() => {
    const lines: JSX.Element[] = [];
    const spacing = 30;
    
    for (let x = 0; x < width; x += spacing) {
      lines.push(
        <Line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke={mapColors.gridLine}
          strokeWidth={1}
        />
      );
    }
    
    for (let y = 0; y < height; y += spacing) {
      lines.push(
        <Line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke={mapColors.gridLine}
          strokeWidth={1}
        />
      );
    }
    
    return lines;
  }, [width, height]);

  return <G>{gridLines}</G>;
}

// ============================================
// CORE NODE (center of the system)
// ============================================
function CoreNode({ centerX, centerY }: { centerX: number; centerY: number }) {
  const pulse = useSharedValue(0);
  
  React.useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);
  
  const coreStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulse.value, [0, 1], [1, 1.1]);
    return { transform: [{ scale }] };
  });
  
  const ringStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulse.value, [0, 1], [1, 1.3]);
    const opacity = interpolate(pulse.value, [0, 1], [0.5, 0.2]);
    return { transform: [{ scale }], opacity };
  });

  return (
    <View style={[styles.coreContainer, { left: centerX - 20, top: centerY - 20 }]}>
      <Animated.View style={[styles.coreRing, ringStyle]} />
      <Animated.View style={[styles.coreNode, coreStyle]} />
      <View style={styles.coreHighlight} />
    </View>
  );
}

// ============================================
// NODE COMPONENT
// ============================================
interface NodeComponentProps {
  module: InstalledModule;
  position: NodePosition;
  isSelected?: boolean;
  onPress?: () => void;
}

function NodeComponent({ module, position, isSelected, onPress }: NodeComponentProps) {
  const color = getNodeColor(module.type);
  const pulse = useSharedValue(0);
  
  // Critical nodes pulse
  React.useEffect(() => {
    if (module.type === 'critical') {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 600, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    }
  }, [module.type]);
  
  const nodeStyle = useAnimatedStyle(() => {
    if (module.type !== 'critical') return {};
    const scale = interpolate(pulse.value, [0, 1], [1, 1.15]);
    return { transform: [{ scale }] };
  });

  return (
    <TouchableOpacity
      style={[
        styles.nodeContainer,
        { left: position.x - 15, top: position.y - 15 },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isSelected && (
        <View style={[styles.nodeSelection, { borderColor: color }]} />
      )}
      <Animated.View 
        style={[
          styles.node, 
          { backgroundColor: color },
          nodeStyle,
        ]} 
      />
    </TouchableOpacity>
  );
}

// ============================================
// NODE TOOLTIP
// ============================================
interface NodeTooltipProps {
  module: InstalledModule;
  position: NodePosition;
  containerWidth: number;
}

function NodeTooltip({ module, position, containerWidth }: NodeTooltipProps) {
  const color = getNodeColor(module.type);
  
  // Position tooltip to avoid going off-screen
  const tooltipLeft = position.x > containerWidth / 2 
    ? position.x - 140 
    : position.x + 20;

  return (
    <View style={[styles.tooltip, { left: tooltipLeft, top: position.y - 30 }]}>
      <View style={[styles.tooltipBadge, { backgroundColor: color }]}>
        <Text style={styles.tooltipBadgeText}>{module.type.toUpperCase()}</Text>
      </View>
      <Text style={styles.tooltipName} numberOfLines={2}>{module.name}</Text>
      <Text style={styles.tooltipStatus}>{module.status}</Text>
    </View>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function SystemMap({
  modules,
  width = SCREEN_WIDTH,
  height,
  showGrid = true,
  showLabels = true,
  onNodePress,
  selectedModuleId,
}: SystemMapProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);
  const [containerHeight, setContainerHeight] = useState(height || 300);
  
  // Use external selection if provided, otherwise internal
  const selectedId = selectedModuleId !== undefined ? selectedModuleId : internalSelectedId;
  
  // Use measured height if height prop not provided
  const effectiveHeight = height || containerHeight;
  const centerX = width / 2;
  const centerY = effectiveHeight / 2;
  
  // Calculate positions for all nodes
  const positions = useMemo(() => 
    modules.map((_, i) => getNodePosition(i, width, effectiveHeight)),
    [modules.length, width, effectiveHeight]
  );
  
  // Find selected module for tooltip
  const selectedModule = modules.find(m => m.id === selectedId);
  const selectedPosition = selectedModule 
    ? positions[modules.indexOf(selectedModule)] 
    : null;

  const handleNodePress = (module: InstalledModule) => {
    if (onNodePress) {
      onNodePress(module);
    } else {
      // Toggle selection internally
      setInternalSelectedId(prev => prev === module.id ? null : module.id);
    }
  };

  const handleLayout = (event: { nativeEvent: { layout: { height: number } } }) => {
    if (!height) {
      setContainerHeight(event.nativeEvent.layout.height);
    }
  };

  return (
    <View 
      style={[styles.container, height ? { width, height } : { width, flex: 1 }]}
      onLayout={handleLayout}
    >
      {/* SVG Layer - Grid and Lines */}
      <View style={styles.svgContainer}>
        <Svg width={width} height={effectiveHeight}>
          {showGrid && <GridBackground width={width} height={effectiveHeight} />}
          
          {/* Connection lines */}
          {positions.map((pos, i) => (
            <Line
              key={`line-${i}`}
              x1={centerX}
              y1={centerY}
              x2={pos.x}
              y2={pos.y}
              stroke={selectedId === modules[i].id 
                ? getNodeColor(modules[i].type) 
                : mapColors.lineDefault}
              strokeWidth={selectedId === modules[i].id ? 2 : 1}
            />
          ))}
        </Svg>
      </View>
      
      {/* Core node */}
      <CoreNode centerX={centerX} centerY={centerY} />
      
      {/* Module nodes */}
      {modules.map((module, i) => (
        <NodeComponent
          key={module.id}
          module={module}
          position={positions[i]}
          isSelected={selectedId === module.id}
          onPress={() => handleNodePress(module)}
        />
      ))}
      
      {/* Tooltip for selected node - hidden since we now show details in panel */}
      {showLabels && selectedModule && selectedPosition && !onNodePress && (
        <NodeTooltip 
          module={selectedModule} 
          position={selectedPosition}
          containerWidth={width}
        />
      )}
      
      {/* Empty state */}
      {modules.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>AWAITING FEATURES</Text>
          <Text style={styles.emptySubtext}>Process tickets to populate map</Text>
        </View>
      )}
    </View>
  );
}

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  container: {
    backgroundColor: mapColors.background,
    overflow: 'hidden',
    borderRadius: 4,
  },
  svgContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  // Core node styles
  coreContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coreNode: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: mapColors.coreNode,
    position: 'absolute',
  },
  coreRing: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: mapColors.coreNode,
    position: 'absolute',
  },
  coreHighlight: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    position: 'absolute',
    top: 14,
    left: 14,
  },
  // Node styles
  nodeContainer: {
    position: 'absolute',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  node: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  nodeSelection: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  // Tooltip styles
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(10, 12, 8, 0.95)',
    borderWidth: 1,
    borderColor: mapColors.lineDefault,
    borderRadius: 4,
    padding: 8,
    width: 120,
    zIndex: 100,
  },
  tooltipBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  tooltipBadgeText: {
    fontFamily: 'monospace',
    fontSize: 8,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1,
  },
  tooltipName: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    color: mapColors.labelText,
    marginBottom: 2,
  },
  tooltipStatus: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: mapColors.labelTextDim,
  },
  // Empty state
  emptyState: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    color: mapColors.labelTextDim,
    letterSpacing: 2,
  },
  emptySubtext: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: mapColors.gridLine,
    marginTop: 4,
  },
});
