import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './game-console.styles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Feature Board dimensions - matches GameConsole
const BOARD_WIDTH = SCREEN_WIDTH * 0.92;
const BOARD_HEIGHT = SCREEN_HEIGHT * 0.92;

// Module slot dimensions
const MODULE_SLOT_WIDTH = BOARD_WIDTH * 0.42;
const MODULE_SLOT_HEIGHT = 56;

// Extended colors for Feature Board
export const featureBoardColors = {
  ...colors,
  // Module status colors
  moduleActive: '#44ff66',
  moduleRouted: '#4488ff',
  moduleArchived: '#8866aa',
  moduleCritical: '#ff4444',
  moduleCriticalGlow: '#ff2222',
  
  // CRT specific
  crtGlass: 'rgba(20, 35, 30, 0.4)',
  crtReflection: 'rgba(255, 255, 255, 0.03)',
  
  // Dial colors
  dialFace: '#2a3035',
  dialRing: '#1a2025',
  dialMarker: '#ffcc00',
  dialMarkerDim: '#665500',
};

export const featureBoardStyles = StyleSheet.create({
  // ============================================
  // CONTAINER
  // ============================================
  container: {
    flex: 1,
    backgroundColor: '#0c0e10',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ============================================
  // MAIN BOARD BODY
  // ============================================
  boardBody: {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    backgroundColor: colors.bodyPrimary,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 20,
  },

  // ============================================
  // MAIN LAYOUT - THREE COLUMN
  // ============================================
  mainLayout: {
    flex: 1,
    flexDirection: 'row',
  },

  // Left panel - module indicators
  leftPanel: {
    width: 80,
    backgroundColor: colors.bodyDarker,
    borderRightWidth: 2,
    borderRightColor: colors.bodyDarkest,
    paddingVertical: 12,
    paddingHorizontal: 6,
    justifyContent: 'space-between',
  },

  // Center panel - CRT and modules
  centerPanel: {
    flex: 1,
    padding: 12,
  },

  // Right panel - dials and status
  rightPanel: {
    width: 90,
    backgroundColor: colors.bodyDarker,
    borderLeftWidth: 2,
    borderLeftColor: colors.bodyDarkest,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },

  // ============================================
  // HEADER BAR
  // ============================================
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: colors.bodyDark,
    borderBottomWidth: 2,
    borderBottomColor: colors.bodyDarkest,
  },

  headerTitle: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: colors.screenAmber,
    letterSpacing: 3,
  },

  headerSubtitle: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: colors.textDark,
    letterSpacing: 1,
    marginTop: 2,
  },

  backButton: {
    backgroundColor: colors.bodyDarker,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.metalDark,
  },

  backButtonText: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: 1,
  },

  // ============================================
  // CRT SCREEN (Center)
  // ============================================
  crtContainer: {
    backgroundColor: colors.bodyDarkest,
    borderRadius: 6,
    padding: 6,
    marginBottom: 12,
  },

  crtBezel: {
    backgroundColor: '#0a0c0a',
    borderRadius: 4,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.metalDark,
  },

  crtScreen: {
    height: BOARD_HEIGHT * 0.22,
    backgroundColor: '#050805',
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },

  crtContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  crtGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: featureBoardColors.crtGlass,
    opacity: 0.3,
  },

  crtScanlines: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },

  crtScanline: {
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.12)',
    marginBottom: 2,
  },

  crtReflection: {
    position: 'absolute',
    top: -30,
    left: -30,
    width: 120,
    height: 120,
    backgroundColor: featureBoardColors.crtReflection,
    transform: [{ rotate: '45deg' }],
    zIndex: 10,
  },

  crtStatusText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.screenAmber,
    textShadowColor: colors.screenAmberDim,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    textAlign: 'center',
  },

  crtStatusLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: colors.screenAmberDim,
    marginTop: 4,
    letterSpacing: 2,
  },

  crtLabel: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: colors.textDark,
    letterSpacing: 2,
    marginTop: 6,
    textAlign: 'center',
  },

  // ============================================
  // MODULE SLOTS GRID
  // ============================================
  moduleSlotsContainer: {
    flex: 1,
  },

  moduleSlotsHeader: {
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '700',
    color: colors.textMid,
    letterSpacing: 2,
    marginBottom: 8,
  },

  moduleSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },

  // ============================================
  // MODULE SLOT (Empty)
  // ============================================
  moduleSlot: {
    width: MODULE_SLOT_WIDTH,
    height: MODULE_SLOT_HEIGHT,
    backgroundColor: colors.bodyDarkest,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.bodyDarker,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  moduleSlotEmpty: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: colors.textDark,
    letterSpacing: 1,
  },

  // ============================================
  // MODULE (Installed)
  // ============================================
  module: {
    width: MODULE_SLOT_WIDTH,
    height: MODULE_SLOT_HEIGHT,
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    position: 'relative',
    overflow: 'hidden',
  },

  moduleFeature: {
    backgroundColor: colors.bodyDark,
    borderColor: featureBoardColors.moduleActive,
  },

  moduleRouted: {
    backgroundColor: colors.bodyDark,
    borderColor: featureBoardColors.moduleRouted,
  },

  moduleArchived: {
    backgroundColor: colors.bodyDark,
    borderColor: featureBoardColors.moduleArchived,
  },

  moduleCritical: {
    backgroundColor: '#1a1012',
    borderColor: featureBoardColors.moduleCritical,
    shadowColor: featureBoardColors.moduleCriticalGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },

  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  moduleLed: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  moduleLedActive: {
    backgroundColor: featureBoardColors.moduleActive,
    shadowColor: featureBoardColors.moduleActive,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },

  moduleLedRouted: {
    backgroundColor: featureBoardColors.moduleRouted,
    shadowColor: featureBoardColors.moduleRouted,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },

  moduleLedArchived: {
    backgroundColor: featureBoardColors.moduleArchived,
    shadowColor: featureBoardColors.moduleArchived,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },

  moduleLedCritical: {
    backgroundColor: featureBoardColors.moduleCritical,
    shadowColor: featureBoardColors.moduleCritical,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },

  moduleType: {
    fontFamily: 'monospace',
    fontSize: 7,
    fontWeight: '700',
    letterSpacing: 1,
  },

  moduleTypeFeature: {
    color: featureBoardColors.moduleActive,
  },

  moduleTypeRouted: {
    color: featureBoardColors.moduleRouted,
  },

  moduleTypeArchived: {
    color: featureBoardColors.moduleArchived,
  },

  moduleTypeCritical: {
    color: featureBoardColors.moduleCritical,
  },

  moduleName: {
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: 0.5,
  },

  moduleStatus: {
    fontFamily: 'monospace',
    fontSize: 7,
    color: colors.textDark,
    marginTop: 2,
  },

  // ============================================
  // LEFT PANEL - CATEGORY BUTTONS
  // ============================================
  categoryButtonsContainer: {
    gap: 8,
  },

  categoryButton: {
    backgroundColor: colors.bodyDark,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.metalDark,
    alignItems: 'center',
  },

  categoryButtonActive: {
    borderColor: colors.screenAmber,
    shadowColor: colors.screenAmber,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  categoryButtonText: {
    fontFamily: 'monospace',
    fontSize: 7,
    fontWeight: '700',
    color: colors.textMid,
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  categoryButtonTextActive: {
    color: colors.screenAmber,
  },

  categoryCount: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    color: colors.textLight,
    marginTop: 4,
  },

  // ============================================
  // LEFT PANEL - DIAL
  // ============================================
  dialContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 8,
  },

  dial: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: featureBoardColors.dialFace,
    borderWidth: 3,
    borderColor: featureBoardColors.dialRing,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  dialMarker: {
    width: 2,
    height: 14,
    backgroundColor: featureBoardColors.dialMarker,
    position: 'absolute',
    top: 6,
    borderRadius: 1,
  },

  dialCenter: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.metalMid,
    borderWidth: 1,
    borderColor: colors.metalDark,
  },

  dialLabel: {
    fontFamily: 'monospace',
    fontSize: 6,
    color: colors.textDark,
    marginTop: 4,
    letterSpacing: 1,
  },

  // ============================================
  // RIGHT PANEL - STATUS DIALS
  // ============================================
  statusDialsContainer: {
    gap: 16,
    alignItems: 'center',
  },

  statusDial: {
    alignItems: 'center',
  },

  statusDialFace: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: featureBoardColors.dialFace,
    borderWidth: 3,
    borderColor: featureBoardColors.dialRing,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  statusDialValue: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    color: colors.screenAmber,
  },

  statusDialUnit: {
    fontFamily: 'monospace',
    fontSize: 6,
    color: colors.screenAmberDim,
  },

  statusDialLabel: {
    fontFamily: 'monospace',
    fontSize: 7,
    color: colors.textDark,
    marginTop: 4,
    letterSpacing: 1,
  },

  // ============================================
  // RIGHT PANEL - LED INDICATOR
  // ============================================
  ledIndicatorContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 12,
  },

  ledIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.ledGreen,
    borderWidth: 1,
    borderColor: colors.metalDark,
    shadowColor: colors.ledGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },

  ledIndicatorOff: {
    backgroundColor: colors.ledOff,
    shadowOpacity: 0,
  },

  ledIndicatorLabel: {
    fontFamily: 'monospace',
    fontSize: 6,
    color: colors.textDark,
    marginTop: 4,
    letterSpacing: 1,
  },

  // ============================================
  // BOTTOM BAR
  // ============================================
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.bodyDark,
    borderTopWidth: 2,
    borderTopColor: colors.bodyDarkest,
  },

  bottomLabel: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: colors.textDark,
    letterSpacing: 1,
  },

  bottomValue: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.screenAmber,
    letterSpacing: 1,
  },

  // ============================================
  // DECORATIVE ELEMENTS
  // ============================================
  screwHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.metalMid,
    borderWidth: 1,
    borderColor: colors.metalDark,
    position: 'absolute',
  },

  ventSlot: {
    width: 4,
    height: 20,
    backgroundColor: colors.bodyDarkest,
    borderRadius: 1,
  },

  panelSeam: {
    position: 'absolute',
    backgroundColor: colors.bodyDarkest,
    height: 1,
    left: 0,
    right: 0,
  },
});
