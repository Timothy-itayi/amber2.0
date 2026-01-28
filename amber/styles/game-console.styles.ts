import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Console dimensions
const CONSOLE_WIDTH = SCREEN_WIDTH * 0.92;
const CONSOLE_HEIGHT = SCREEN_HEIGHT * 0.92;

// Color palette - Industrial / Soviet-inspired
export const colors = {
  // Primary body (dark gray-blue)
  bodyPrimary: '#3a4248',
  bodySecondary: '#323a40',
  bodyDark: '#282e34',
  bodyDarker: '#1e2428',
  bodyDarkest: '#141618',
  bodyLight: '#4a5258',
  bodyLighter: '#5a6268',
  
  // Accent (red/orange for hazard elements)
  accentRed: '#c44',
  accentOrange: '#d84',
  accentRedDark: '#833',
  
  // Screen colors (amber terminal)
  screenBackground: '#0a0804',
  screenGlow: '#1a1408',
  screenBorder: '#080604',
  screenAmber: '#ffcc00',
  screenAmberDim: '#aa8800',
  screenAmberBright: '#ffdd44',
  
  // Metal finishes
  metalChrome: '#8a9090',
  metalDark: '#2a3030',
  metalMid: '#4a5050',
  metalLight: '#6a7070',
  metalHighlight: '#9aa0a0',
  
  // Rubber/grip
  rubberDark: '#1a1e1e',
  rubberMid: '#282c2c',
  rubberLight: '#383c3c',
  
  // Hazard striping
  hazardYellow: '#d4a800',
  hazardBlack: '#1a1a1a',
  
  // LEDs
  ledRed: '#ff4444',
  ledGreen: '#44ff66',
  ledAmber: '#ffaa22',
  ledOff: '#333',
  
  // Text
  textLight: '#9aa6a2',
  textMid: '#6a7672',
  textDark: '#4a5652',
  textBrand: '#c4d0cc',
  
  // Shadows & highlights
  shadowDark: 'rgba(0,0,0,0.7)',
  shadowMid: 'rgba(0,0,0,0.4)',
  shadowLight: 'rgba(0,0,0,0.2)',
  highlightStrong: 'rgba(255,255,255,0.15)',
  highlightMid: 'rgba(255,255,255,0.08)',
  highlightSubtle: 'rgba(255,255,255,0.04)',
  
  // Wear
  wearDark: 'rgba(0,0,0,0.12)',
  wearLight: 'rgba(255,255,255,0.06)',
};

export const gameConsoleStyles = StyleSheet.create({
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
  // MAIN CONSOLE BODY
  // ============================================
  consoleBody: {
    width: CONSOLE_WIDTH,
    height: CONSOLE_HEIGHT,
    backgroundColor: colors.bodyPrimary,
    borderRadius: 8,
    overflow: 'visible', // Allow panel to overlap device edge when sliding
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 20,
  },

  // ============================================
  // TEXTURE LAYER
  // ============================================
  textureLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    pointerEvents: 'none',
  },
  
  textureDot: {
    position: 'absolute',
    borderRadius: 1,
    backgroundColor: colors.wearLight,
  },
  
  textureDotDark: {
    backgroundColor: colors.wearDark,
  },

  // ============================================
  // PANEL SEAMS & HARDWARE DETAILS
  // ============================================
  panelSeamHorizontal: {
    position: 'absolute',
    left: 12,
    right: 12,
    height: 2,
    backgroundColor: colors.bodyDarker,
    borderTopWidth: 1,
    borderTopColor: colors.highlightSubtle,
    zIndex: 55,
  },

  panelSeamVertical: {
    position: 'absolute',
    top: 60,
    bottom: 60,
    width: 2,
    backgroundColor: colors.bodyDarker,
    borderLeftWidth: 1,
    borderLeftColor: colors.highlightSubtle,
    zIndex: 55,
  },

  cornerRivet: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.metalMid,
    borderWidth: 1,
    borderColor: colors.metalDark,
    zIndex: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cornerRivetInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.metalDark,
  },

  wearMark: {
    position: 'absolute',
    backgroundColor: colors.wearDark,
    borderRadius: 2,
    zIndex: 52,
  },

  scratchMark: {
    position: 'absolute',
    height: 1,
    backgroundColor: colors.wearLight,
    zIndex: 52,
  },

  // ============================================
  // BEVELS
  // ============================================
  bevelHighlightTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.highlightStrong,
    zIndex: 60,
  },
  
  bevelHighlightLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 2,
    backgroundColor: colors.highlightMid,
    zIndex: 60,
  },
  
  bevelShadowBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.shadowDark,
    zIndex: 60,
  },
  
  bevelShadowRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.shadowMid,
    zIndex: 60,
  },

  // ============================================
  // TOP SECTION
  // ============================================
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    zIndex: 30,
  },

  headerPlate: {
    backgroundColor: colors.bodyDark,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.bodyDarker,
    position: 'relative',
    overflow: 'hidden',
  },

  headerPlateHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.highlightSubtle,
  },

  headerText: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    color: colors.screenAmber,
    letterSpacing: 2,
  },

  headerSubtext: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: colors.textMid,
    letterSpacing: 1,
    marginTop: 2,
  },

  statusLeds: {
    flexDirection: 'row',
    gap: 12,
  },

  ledContainer: {
    alignItems: 'center',
  },

  led: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.metalDark,
  },

  ledGreen: {
    backgroundColor: colors.ledGreen,
    shadowColor: colors.ledGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },

  ledAmber: {
    backgroundColor: colors.ledAmber,
    shadowColor: colors.ledAmber,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },

  ledOff: {
    backgroundColor: colors.ledOff,
  },

  ledLabel: {
    fontFamily: 'monospace',
    fontSize: 7,
    color: colors.textDark,
    marginTop: 3,
  },

  // ============================================
  // SCREEN SECTION
  // ============================================
  screenSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    zIndex: 20,
  },

  screenFrame: {
    backgroundColor: colors.bodyDarker,
    borderRadius: 6,
    padding: 6,
    position: 'relative',
    overflow: 'hidden',
  },

  screenFrameHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.highlightSubtle,
  },

  screenFrameShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.shadowMid,
  },

  screenBezel: {
    backgroundColor: colors.bodyDarkest,
    borderRadius: 4,
    padding: 4,
    position: 'relative',
  },

  screenBezelInner: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    borderWidth: 1,
    borderColor: colors.shadowLight,
    borderRadius: 3,
  },

  screen: {
    backgroundColor: colors.screenBackground,
    borderRadius: 2,
    height: CONSOLE_HEIGHT * 0.32,
    position: 'relative',
    overflow: 'hidden',
  },

  screenGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.screenGlow,
    opacity: 0.5,
  },

  screenVignetteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: 'transparent',
    opacity: 0.3,
  },

  screenVignetteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: 'transparent',
    opacity: 0.3,
  },

  scanlinesOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
    pointerEvents: 'none',
  },

  scanline: {
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginBottom: 2,
  },

  screenReflection: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 150,
    height: 150,
    backgroundColor: 'rgba(255,255,255,0.02)',
    transform: [{ rotate: '45deg' }],
    zIndex: 10,
    pointerEvents: 'none',
  },

  screenContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },

  screenPlaceholder: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.screenAmber,
    textShadowColor: colors.screenAmberDim,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  screenToolSelected: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.screenAmberBright,
    marginTop: 8,
    textShadowColor: colors.screenAmber,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  screenPlaceholderDim: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.screenAmberDim,
    marginTop: 8,
    opacity: 0.6,
  },

  screenLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  screenLabel: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: colors.textDark,
    letterSpacing: 1,
  },

  screenLabelRight: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: colors.textDark,
    letterSpacing: 1,
  },

  // ============================================
  // CONTROL SECTION
  // ============================================
  controlSection: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    flex: 1,
    gap: 12,
    zIndex: 100, // Higher than bottom section to allow sliding over it
    overflow: 'visible',
  },

  // ============================================
  // INDUSTRIAL SLIDING SWITCH (iOS-inspired)
  // ============================================
  switchSection: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },

  switchContainer: {
    alignItems: 'center',
  },

  switchFrame: {
    width: 62,
    height: 32,
    borderRadius: 16,
    padding: 2,
    backgroundColor: colors.metalDark,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.bodyDarkest,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  switchFrameInner: {
    ...StyleSheet.absoluteFillObject,
    margin: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.highlightMid,
  },

  switchTrack: {
    flex: 1,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    position: 'relative',
    overflow: 'hidden',
  },

  switchTrackShadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.3)',
  },

  switchTrackIndicators: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  switchTrackIcon: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.15)',
  },

  switchHandle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.metalMid,
    borderWidth: 1,
    borderColor: colors.metalDark,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    zIndex: 10,
  },

  switchHandleHighlight: {
    position: 'absolute',
    top: 1,
    left: 4,
    right: 4,
    height: 2,
    backgroundColor: colors.highlightStrong,
    borderRadius: 1,
  },

  switchHandleGrip: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },

  switchHandleGripLine: {
    width: 10,
    height: 1.5,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 1,
  },

  switchLabelContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },

  switchLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMid,
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // ============================================
  // SLIDING PANEL SECTION (Right side)
  // ============================================
  panelSection: {
    flex: 1,
    position: 'relative',
    overflow: 'visible', // Allow panel to overlap device edge
    zIndex: 500, // Higher than any other console element
  },

  slidingPanelContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'visible', // Allow panel to stick out bottom
  },

  // Cavity behind panel (tools area)
  panelCavity: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bodyDark,
    borderRadius: 6,
    overflow: 'hidden',
    zIndex: 0, // Base level
  },

  // Inner recessed area of cavity
  panelCavityRecess: {
    ...StyleSheet.absoluteFillObject,
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    backgroundColor: colors.bodyDarkest,
    borderRadius: 4,
  },

  panelCavityInner: {
    flex: 1,
    padding: 6,
    paddingTop: 6, // Flush with top - panel covers this
  },

  panelCavityHeader: {
    marginBottom: 0,
    paddingBottom: 10,
    borderBottomWidth: 0,
    borderBottomColor: colors.bodyDark,
  },

  panelCavityTitle: {
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '700',
    color: colors.screenAmber,
    letterSpacing: 10,
    textAlign: 'center',
    textShadowColor: colors.screenAmberDim,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },

  panelCavityShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: colors.shadowDark,
    zIndex: 5,
  },

  // Tool buttons inside cavity - compact
  toolGrid: {
    flex: 1,
    gap: 8,
  },

  toolButton: {
    backgroundColor: colors.bodyDark,
    paddingVertical: 10,
    
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.bodyDarker,
    alignItems: 'center',
  },

  toolButtonSelected: {
    backgroundColor: colors.screenAmber,
    borderColor: colors.screenAmberBright,
    shadowColor: colors.screenAmber,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },

  toolButtonText: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: 2,
  },

  toolButtonTextSelected: {
    color: colors.bodyDarkest,
  },

  // Tool panel container (direct visibility, no sliding)
  toolPanelContainer: {
    flex: 1,
    backgroundColor: colors.bodyDark,
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.bodyDarker,
  },

  toolPanelHeader: {
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.bodyDarker,
  },

  toolPanelTitle: {
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '700',
    color: colors.screenAmber,
    letterSpacing: 3,
    textAlign: 'center',
    textShadowColor: colors.screenAmberDim,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },

  // The sliding panel - covers entire tool area, extra height to stick out when slid
  slidingPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '115%', // Taller than container so bottom sticks out when slid down
    zIndex: 1000, // Top level within the panel section
  },

  slidingPanelFace: {
    flex: 1,
    backgroundColor: colors.bodySecondary,
    borderRadius: 6,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.bodyDark,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },

  slidingPanelHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.highlightStrong,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  // Center label
  slidingPanelCenterLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  slidingPanelLabelText: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMid,
    letterSpacing: 2,
  },

  // Bottom grip ridges - positioned lower for the taller panel
  slidingPanelBottomGrip: {
    position: 'absolute',
    bottom: 30, // Higher up since panel is taller
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },

  slidingPanelGripBar: {
    width: 50,
    height: 5,
    backgroundColor: colors.bodyDark,
    borderRadius: 2,
  },

  // Rivets
  slidingPanelRivet: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.metalDark,
    borderWidth: 1,
    borderColor: colors.metalMid,
  },

  // ============================================
  // BOTTOM SECTION
  // ============================================
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 8,
    zIndex: 10, // Lower than control section
  },

  // Ventilation grille
  ventGrille: {
    flexDirection: 'row',
    gap: 4,
    padding: 6,
    backgroundColor: colors.bodyDarker,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.bodyDarkest,
  },

  ventSlot: {
    width: 6,
    height: 24,
    backgroundColor: colors.bodyDarkest,
    borderRadius: 2,
    overflow: 'hidden',
  },

  // Decorative rivets
  rivetRow: {
    flexDirection: 'row',
    gap: 8,
  },

  decorativeRivet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.metalMid,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.metalDark,
  },

  rivetHighlight: {
    position: 'absolute',
    top: 1,
    left: 2,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  // ============================================
  // INDUSTRIAL CONNECTORS (Bottom Plugs)
  // ============================================
  bottomConnectors: {
    position: 'absolute',
    bottom: -40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    zIndex: -1,
  },

  connectorCable: {
    width: 24,
    height: 60,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    position: 'relative',
    alignItems: 'center',
  },

  connectorPlug: {
    width: 32,
    height: 20,
    backgroundColor: colors.metalDark,
    borderRadius: 2,
    marginTop: -10,
    borderWidth: 1,
    borderColor: colors.bodyDarkest,
  },

  connectorThread: {
    width: 28,
    height: 4,
    backgroundColor: colors.metalMid,
    marginVertical: 1,
    borderRadius: 1,
  },
});
