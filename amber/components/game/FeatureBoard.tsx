import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { featureBoardStyles as styles, featureBoardColors } from '../../styles/feature-board.styles';
import { colors } from '../../styles/game-console.styles';

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
  systemLoad?: number; // 0-100
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
// MAIN FEATURE BOARD COMPONENT
// ============================================
export default function FeatureBoard({
  modules,
  onBack,
  systemLoad = 42,
  ticketsProcessed = 0,
}: FeatureBoardProps) {
  const scanlineAnim = useSharedValue(0);

  // CRT flicker effect
  useEffect(() => {
    scanlineAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 100 }),
        withTiming(0.95, { duration: 50 }),
        withTiming(1, { duration: 100 })
      ),
      -1,
      false
    );
  }, []);

  const animatedCrtStyle = useAnimatedStyle(() => ({
    opacity: scanlineAnim.value,
  }));

  // Count modules by type
  const moduleCounts = {
    feature: modules.filter(m => m.type === 'feature').length,
    routed: modules.filter(m => m.type === 'routed').length,
    archived: modules.filter(m => m.type === 'archived').length,
    critical: modules.filter(m => m.type === 'critical').length,
  };

  // Generate scanlines
  const scanlines = Array(30).fill(null);

  // Generate module slots (8 slots max for MVP)
  const MAX_SLOTS = 8;
  const slots = Array(MAX_SLOTS).fill(null).map((_, i) => modules[i] || null);

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
            <Text style={styles.headerTitle}>FEATURE REGISTRY</Text>
            <Text style={styles.headerSubtitle}>INSTALLED MODULES</Text>
          </View>
          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
            <Text style={styles.backButtonText}>◀ CONSOLE</Text>
          </TouchableOpacity>
        </View>

        {/* ============================================ */}
        {/* MAIN LAYOUT */}
        {/* ============================================ */}
        <View style={styles.mainLayout}>
          {/* ============================================ */}
          {/* LEFT PANEL - Category Buttons */}
          {/* ============================================ */}
          <View style={styles.leftPanel}>
            <View style={styles.categoryButtonsContainer}>
              <CategoryButton
                label="FEATURE"
                count={moduleCounts.feature}
                active={moduleCounts.feature > 0}
              />
              <CategoryButton
                label="ROUTED"
                count={moduleCounts.routed}
                active={moduleCounts.routed > 0}
              />
              <CategoryButton
                label="ARCHIVE"
                count={moduleCounts.archived}
                active={moduleCounts.archived > 0}
              />
              <CategoryButton
                label="CRITICAL"
                count={moduleCounts.critical}
                active={moduleCounts.critical > 0}
              />
            </View>

            {/* Dial at bottom */}
            <Dial value={systemLoad} label="LOAD" />
          </View>

          {/* ============================================ */}
          {/* CENTER PANEL - CRT & Modules */}
          {/* ============================================ */}
          <View style={styles.centerPanel}>
            {/* CRT Status Display */}
            <View style={styles.crtContainer}>
              <View style={styles.crtBezel}>
                <Animated.View style={[styles.crtScreen, animatedCrtStyle]}>
                  {/* Glow */}
                  <View style={styles.crtGlow} />
                  
                  {/* Scanlines */}
                  <View style={styles.crtScanlines}>
                    {scanlines.map((_, i) => (
                      <View key={i} style={styles.crtScanline} />
                    ))}
                  </View>
                  
                  {/* Reflection */}
                  <View style={styles.crtReflection} />
                  
                  {/* Content */}
                  <View style={styles.crtContent}>
                    <Text style={styles.crtStatusText}>
                      {modules.length === 0
                        ? '> AWAITING FEATURES...'
                        : `> ${modules.length} MODULE${modules.length !== 1 ? 'S' : ''} INSTALLED`}
                    </Text>
                    <Text style={styles.crtStatusLabel}>
                      {modules.length === 0
                        ? 'PROCESS TICKETS TO INSTALL'
                        : 'SYSTEM ENHANCED'}
                    </Text>
                  </View>
                </Animated.View>
              </View>
              <Text style={styles.crtLabel}>STATUS MONITOR</Text>
            </View>

            {/* Module Slots Grid */}
            <View style={styles.moduleSlotsContainer}>
              <Text style={styles.moduleSlotsHeader}>INSTALLED MODULES</Text>
              <View style={styles.moduleSlotsGrid}>
                {slots.map((module, index) =>
                  module ? (
                    <Module key={module.id} module={module} />
                  ) : (
                    <EmptySlot key={`empty-${index}`} index={index} />
                  )
                )}
              </View>
            </View>
          </View>

          {/* ============================================ */}
          {/* RIGHT PANEL - Status Dials */}
          {/* ============================================ */}
          <View style={styles.rightPanel}>
            <View style={styles.statusDialsContainer}>
              <StatusDial value={ticketsProcessed} label="PROCESSED" />
              <StatusDial value={modules.length} label="MODULES" />
              <StatusDial value={`${systemLoad}%`} label="CAPACITY" />
            </View>

            {/* LED Indicator */}
            <View style={styles.ledIndicatorContainer}>
              <View style={[
                styles.ledIndicator,
                modules.length === 0 && styles.ledIndicatorOff
              ]} />
              <Text style={styles.ledIndicatorLabel}>ACTIVE</Text>
            </View>
          </View>
        </View>

        {/* ============================================ */}
        {/* BOTTOM BAR */}
        {/* ============================================ */}
        <View style={styles.bottomBar}>
          <Text style={styles.bottomLabel}>AMBER FEATURE REGISTRY v1.0</Text>
          <Text style={styles.bottomValue}>OP-7734</Text>
        </View>
      </View>
    </View>
  );
}

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
