import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { featureBoardStyles as styles, featureBoardColors } from '../../styles/feature-board.styles';
import { colors } from '../../styles/game-console.styles';
import SystemMap from './SystemMap';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================
// TYPES
// ============================================
export type ModuleType = 'feature' | 'routed' | 'archived' | 'critical';

export interface InstalledModule {
  id: string;
  type: ModuleType;
  name: string;
  status: string;
  ticketId: string;
}

export interface FeatureBoardProps {
  modules: InstalledModule[];
  onBack: () => void;
  ticketsProcessed?: number;
}

// ============================================
// MODULE COMPONENT
// ============================================
interface ModuleProps {
  module: InstalledModule;
}

function Module({ module }: ModuleProps) {
  const pulseAnim = useSharedValue(0);

  // Critical modules pulse
  useEffect(() => {
    if (module.type === 'critical') {
      pulseAnim.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    }
  }, [module.type]);

  const animatedLedStyle = useAnimatedStyle(() => {
    if (module.type !== 'critical') return {};
    return {
      opacity: interpolate(pulseAnim.value, [0, 1], [0.6, 1]),
      transform: [{ scale: interpolate(pulseAnim.value, [0, 1], [1, 1.2]) }],
    };
  });

  const getModuleStyle = () => {
    switch (module.type) {
      case 'feature': return styles.moduleFeature;
      case 'routed': return styles.moduleRouted;
      case 'archived': return styles.moduleArchived;
      case 'critical': return styles.moduleCritical;
    }
  };

  const getLedStyle = () => {
    switch (module.type) {
      case 'feature': return styles.moduleLedActive;
      case 'routed': return styles.moduleLedRouted;
      case 'archived': return styles.moduleLedArchived;
      case 'critical': return styles.moduleLedCritical;
    }
  };

  const getTypeStyle = () => {
    switch (module.type) {
      case 'feature': return styles.moduleTypeFeature;
      case 'routed': return styles.moduleTypeRouted;
      case 'archived': return styles.moduleTypeArchived;
      case 'critical': return styles.moduleTypeCritical;
    }
  };

  const getTypeLabel = () => {
    switch (module.type) {
      case 'feature': return 'FEATURE';
      case 'routed': return 'ROUTED';
      case 'archived': return 'ARCHIVED';
      case 'critical': return 'CRITICAL';
    }
  };

  return (
    <View style={[styles.module, getModuleStyle()]}>
      {/* Top highlight */}
      <View style={localStyles.moduleHighlight} />
      
      {/* Header with LED and type */}
      <View style={styles.moduleHeader}>
        <Animated.View style={[styles.moduleLed, getLedStyle(), animatedLedStyle]} />
        <Text style={[styles.moduleType, getTypeStyle()]}>{getTypeLabel()}</Text>
      </View>
      
      {/* Module name */}
      <Text style={styles.moduleName} numberOfLines={1}>
        {module.name}
      </Text>
      
      {/* Status */}
      <Text style={styles.moduleStatus}>
        {module.status}
      </Text>

      {/* Bottom shadow */}
      <View style={localStyles.moduleShadow} />
    </View>
  );
}

// ============================================
// EMPTY SLOT COMPONENT
// ============================================
function EmptySlot({ index }: { index: number }) {
  return (
    <View style={styles.moduleSlot}>
      <Text style={styles.moduleSlotEmpty}>SLOT {index + 1}</Text>
    </View>
  );
}

// ============================================
// DIAL COMPONENT
// ============================================
interface DialProps {
  value: number; // 0-100
  label: string;
}

function Dial({ value, label }: DialProps) {
  // Convert value to rotation (-135 to 135 degrees)
  const rotation = interpolate(value, [0, 100], [-135, 135]);

  return (
    <View style={styles.dialContainer}>
      <View style={styles.dial}>
        <View style={[styles.dialMarker, { transform: [{ rotate: `${rotation}deg` }] }]} />
        <View style={styles.dialCenter} />
      </View>
      <Text style={styles.dialLabel}>{label}</Text>
    </View>
  );
}

// ============================================
// STATUS DIAL COMPONENT
// ============================================
interface StatusDialProps {
  value: number | string;
  unit?: string;
  label: string;
}

function StatusDial({ value, unit, label }: StatusDialProps) {
  return (
    <View style={styles.statusDial}>
      <View style={styles.statusDialFace}>
        <Text style={styles.statusDialValue}>{value}</Text>
        {unit && <Text style={styles.statusDialUnit}>{unit}</Text>}
      </View>
      <Text style={styles.statusDialLabel}>{label}</Text>
    </View>
  );
}

// ============================================
// CATEGORY BUTTON COMPONENT
// ============================================
interface CategoryButtonProps {
  label: string;
  count: number;
  active?: boolean;
  onPress?: () => void;
}

function CategoryButton({ label, count, active, onPress }: CategoryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.categoryButton, active && styles.categoryButtonActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.categoryButtonText, active && styles.categoryButtonTextActive]}>
        {label}
      </Text>
      <Text style={styles.categoryCount}>{count}</Text>
    </TouchableOpacity>
  );
}

// ============================================
// MODULE DETAIL PANEL COMPONENT
// ============================================
interface ModuleDetailPanelProps {
  module: InstalledModule | undefined;
}

function ModuleDetailPanel({ module }: ModuleDetailPanelProps) {
  if (!module) {
    return (
      <View style={hybridStyles.detailPanel}>
        <Text style={hybridStyles.detailPanelEmpty}>SELECT A NODE</Text>
        <Text style={hybridStyles.detailPanelHint}>Tap any node on the map to view module details</Text>
      </View>
    );
  }

  const getTypeColor = () => {
    switch (module.type) {
      case 'feature': return '#4ade80';
      case 'routed': return '#60a5fa';
      case 'archived': return '#a78bfa';
      case 'critical': return '#f87171';
    }
  };

  return (
    <View style={hybridStyles.detailPanel}>
      <View style={hybridStyles.detailHeader}>
        <View style={[hybridStyles.detailTypeBadge, { backgroundColor: getTypeColor() }]}>
          <Text style={hybridStyles.detailTypeBadgeText}>{module.type.toUpperCase()}</Text>
        </View>
        <Text style={hybridStyles.detailTicketId}>{module.ticketId}</Text>
      </View>
      <Text style={hybridStyles.detailModuleName}>{module.name}</Text>
      <View style={hybridStyles.detailStatusRow}>
        <View style={[hybridStyles.detailStatusDot, { backgroundColor: getTypeColor() }]} />
        <Text style={hybridStyles.detailStatusText}>{module.status}</Text>
      </View>
    </View>
  );
}

// ============================================
// LEGEND COMPONENT
// ============================================
function MapLegend() {
  const legendItems = [
    { color: '#4ade80', label: 'FIX' },
    { color: '#60a5fa', label: 'ROUTE' },
    { color: '#a78bfa', label: 'DEFER' },
    { color: '#f87171', label: 'ESCL' },
  ];

  return (
    <View style={hybridStyles.legend}>
      {legendItems.map((item) => (
        <View key={item.label} style={hybridStyles.legendItem}>
          <View style={[hybridStyles.legendDot, { backgroundColor: item.color }]} />
          <Text style={hybridStyles.legendLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

// ============================================
// MAIN FEATURE BOARD COMPONENT (HYBRID LAYOUT)
// ============================================
export default function FeatureBoard({
  modules,
  onBack,
  ticketsProcessed = 0,
}: FeatureBoardProps) {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  // Count modules by type
  const moduleCounts = {
    feature: modules.filter(m => m.type === 'feature').length,
    routed: modules.filter(m => m.type === 'routed').length,
    archived: modules.filter(m => m.type === 'archived').length,
    critical: modules.filter(m => m.type === 'critical').length,
  };

  // Calculate map dimensions (responsive to screen)
  const mapWidth = SCREEN_WIDTH - 40; // 20px padding on each side

  const handleNodePress = (module: InstalledModule) => {
    setSelectedModuleId(prev => prev === module.id ? null : module.id);
  };

  const selectedModule = modules.find(m => m.id === selectedModuleId);

  return (
    <View style={styles.container}>
      <View style={styles.boardBody}>
        {/* Base gradient */}
        <LinearGradient
          colors={[colors.bodyLight, colors.bodyPrimary, colors.bodySecondary, colors.bodyDark]}
          locations={[0, 0.15, 0.7, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Corner screws */}
        <View style={[styles.screwHead, { top: 8, left: 8 }]} />
        <View style={[styles.screwHead, { top: 8, right: 8 }]} />
        <View style={[styles.screwHead, { bottom: 8, left: 8 }]} />
        <View style={[styles.screwHead, { bottom: 8, right: 8 }]} />

        {/* ============================================ */}
        {/* HEADER BAR */}
        {/* ============================================ */}
        <View style={styles.headerBar}>
          <View>
            <Text style={styles.headerTitle}>SYSTEM MAP</Text>
            <Text style={styles.headerSubtitle}>FEATURE TOPOLOGY</Text>
          </View>
          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
            <Text style={styles.backButtonText}>◀ CONSOLE</Text>
          </TouchableOpacity>
        </View>

        {/* ============================================ */}
        {/* SYSTEM MAP (CENTER) - Expanded to fill space */}
        {/* ============================================ */}
        <View style={hybridStyles.mapContainer}>
          <View style={hybridStyles.mapBezel}>
            {/* Map Legend overlay */}
            <View style={hybridStyles.mapOverlayTop}>
              <MapLegend />
            </View>
            
            <SystemMap
              modules={modules}
              width={mapWidth}
              height={undefined} // Let it fill the container
              showGrid={true}
              showLabels={true}
              onNodePress={handleNodePress}
              selectedModuleId={selectedModuleId}
            />
          </View>
          
          {/* Module Detail Panel - replaces the empty gap */}
          <ModuleDetailPanel module={selectedModule} />
        </View>

        {/* ============================================ */}
        {/* STATS BAR */}
        {/* ============================================ */}
        <View style={hybridStyles.statsBar}>
          {/* Category counts */}
          <View style={hybridStyles.categoryRow}>
            <CategoryButton
              label="FIX"
              count={moduleCounts.feature}
              active={moduleCounts.feature > 0}
            />
            <CategoryButton
              label="ROUTE"
              count={moduleCounts.routed}
              active={moduleCounts.routed > 0}
            />
            <CategoryButton
              label="DEFER"
              count={moduleCounts.archived}
              active={moduleCounts.archived > 0}
            />
            <CategoryButton
              label="ESCL"
              count={moduleCounts.critical}
              active={moduleCounts.critical > 0}
            />
          </View>

          {/* Status indicators - removed LOAD dial */}
          <View style={hybridStyles.statusRow}>
            <StatusDial value={ticketsProcessed} label="PROCESSED" />
            <StatusDial value={modules.length} label="MODULES" />
          </View>
        </View>

        {/* ============================================ */}
        {/* BOTTOM BAR */}
        {/* ============================================ */}
        <View style={styles.bottomBar}>
          <Text style={styles.bottomLabel}>AMBER SYSTEM TOPOLOGY v2.0</Text>
          <Text style={styles.bottomValue}>OP-7734</Text>
        </View>
      </View>
    </View>
  );
}

// ============================================
// HYBRID LAYOUT STYLES
// ============================================
const hybridStyles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  mapBezel: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.bodyDarker,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    // Inner shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  mapOverlayTop: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  // Legend styles
  legend: {
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 12, 8, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 75, 0.2)',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendLabel: {
    fontFamily: 'monospace',
    fontSize: 7,
    color: 'rgba(212, 168, 75, 0.7)',
    letterSpacing: 1,
  },
  // Detail panel styles
  detailPanel: {
    marginTop: 8,
    backgroundColor: colors.bodyDarker,
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.bodyDarkest,
    minHeight: 70,
  },
  detailPanelEmpty: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMid,
    textAlign: 'center',
    letterSpacing: 2,
  },
  detailPanelHint: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: colors.textDark,
    textAlign: 'center',
    marginTop: 4,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailTypeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  detailTypeBadgeText: {
    fontFamily: 'monospace',
    fontSize: 8,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1,
  },
  detailTicketId: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: colors.textDark,
    letterSpacing: 1,
  },
  detailModuleName: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: colors.screenAmber,
    marginBottom: 4,
  },
  detailStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  detailStatusText: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: colors.textLight,
  },
  statsBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.bodyDarker,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
});

// ============================================
// LOCAL STYLES
// ============================================
const localStyles = StyleSheet.create({
  moduleHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  moduleShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
