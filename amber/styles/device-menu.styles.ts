import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Device dimensions - scaled to fit iOS screen
const DEVICE_WIDTH = SCREEN_WIDTH * 0.88;
const DEVICE_HEIGHT = SCREEN_HEIGHT * 0.95;

// Color palette - Military tactical device
const colors = {
  // Primary body colors (dark teal/military green)
  bodyPrimary: '#3d4f4a',
  bodySecondary: '#354542',
  bodyDark: '#2a3835',
  bodyDarker: '#1e2a27',
  bodyDarkest: '#141c1a',
  bodyLight: '#4a5f59',
  bodyLighter: '#5a6f68',
  bodyHighlight: '#6a7f78',
  
  // Accent colors
  accentTeal: '#4a6560',
  accentDark: '#263330',
  
  // Edge/bevel colors
  bevelLight: '#5a7068',
  bevelLighter: '#6a8078',
  bevelDark: '#1a2422',
  bevelDarker: '#101816',
  bevelMid: '#3a4a46',
  
  // Screen colors
  screenBackground: '#0a0c0a',
  screenGlow: '#1a2a20',
  screenBorder: '#080a08',
  
  // Metal/industrial elements
  metalDark: '#2a3230',
  metalMid: '#3a4240',
  metalLight: '#4a5250',
  metalHighlight: '#5a6260',
  metalShine: '#6a7270',
  
  // Buttons
  buttonDark: '#1a2220',
  buttonMid: '#2a3230',
  buttonLight: '#3a4240',
  buttonHighlight: '#4a5250',
  
  // Rubber/grip textures
  rubberDark: '#1e2624',
  rubberMid: '#283230',
  rubberLight: '#323c3a',
  
  // Vent/grille
  ventDark: '#080c0a',
  ventMid: '#141a18',
  ventLight: '#1c2220',
  
  // Text/labels
  textLight: '#8a9a96',
  textMid: '#6a7a76',
  textDark: '#4a5a56',
  textBrand: '#c4d0cc',
  
  // Shadows and highlights
  shadowDark: 'rgba(0,0,0,0.7)',
  shadowMid: 'rgba(0,0,0,0.4)',
  shadowLight: 'rgba(0,0,0,0.2)',
  shadowSubtle: 'rgba(0,0,0,0.1)',
  highlightStrong: 'rgba(255,255,255,0.18)',
  highlightMid: 'rgba(255,255,255,0.10)',
  highlightSubtle: 'rgba(255,255,255,0.05)',
  highlightFaint: 'rgba(255,255,255,0.02)',
  
  // Wear/patina
  wearDark: 'rgba(0,0,0,0.15)',
  wearLight: 'rgba(255,255,255,0.08)',
  scratchLight: 'rgba(255,255,255,0.12)',
  scratchDark: 'rgba(0,0,0,0.2)',
  
  // Indicator/LED
  ledRed: '#ff4444',
  ledGreen: '#44ff66',
  ledAmber: '#ffaa22',
};

export const deviceStyles = StyleSheet.create({
  // ============================================
  // CONTAINER & BACKGROUND
  // ============================================
  container: {
    flex: 1,
    backgroundColor: '#0c100e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // ============================================
  // MAIN DEVICE BODY
  // ============================================
  deviceBody: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: colors.bodyPrimary,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    // Main body shadow
    shadowColor: '#000',
    shadowOffset: { width: 12, height: 18 },
    shadowOpacity: 0.7,
    shadowRadius: 30,
    elevation: 25,
  },
  
  // ============================================
  // TEXTURE OVERLAYS - Creates realistic surface
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
  
  // Noise/grain texture dots
  textureDot: {
    position: 'absolute',
    borderRadius: 1,
    backgroundColor: colors.wearLight,
  },
  
  textureDotDark: {
    backgroundColor: colors.wearDark,
  },
  
  // Scratch marks
  scratchMark: {
    position: 'absolute',
    height: 1,
    backgroundColor: colors.scratchLight,
    opacity: 0.5,
  },
  
  scratchMarkDark: {
    backgroundColor: colors.scratchDark,
    opacity: 0.3,
  },
  
  // Wear spots (areas of use)
  wearSpot: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: colors.wearDark,
  },
  
  // Depth shadow overlay (inner shadow effect)
  depthShadowTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 20,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: colors.shadowSubtle,
  },
  
  depthShadowLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 15,
    backgroundColor: colors.shadowSubtle,
  },
  
  depthShadowRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: colors.shadowLight,
  },
  
  depthShadowBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 25,
    backgroundColor: colors.shadowMid,
  },
  
  // ============================================
  // OUTER BEVELS - 3D edge effect
  // ============================================
  bevelHighlightTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 3,
    backgroundColor: colors.bevelLighter,
    zIndex: 10,
  },
  
  bevelHighlightTopInner: {
    position: 'absolute',
    left: 3,
    right: 3,
    top: 3,
    height: 1,
    backgroundColor: colors.highlightSubtle,
    zIndex: 10,
  },
  
  bevelHighlightLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.bevelLight,
    zIndex: 10,
  },
  
  bevelHighlightLeftInner: {
    position: 'absolute',
    left: 3,
    top: 3,
    bottom: 3,
    width: 1,
    backgroundColor: colors.highlightFaint,
    zIndex: 10,
  },
  
  bevelShadowBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    backgroundColor: colors.bevelDarker,
    zIndex: 10,
  },
  
  bevelShadowBottomInner: {
    position: 'absolute',
    left: 4,
    right: 4,
    bottom: 4,
    height: 2,
    backgroundColor: colors.bevelDark,
    zIndex: 10,
  },
  
  bevelShadowRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: colors.bevelDarker,
    zIndex: 10,
  },
  
  bevelShadowRightInner: {
    position: 'absolute',
    right: 4,
    top: 4,
    bottom: 4,
    width: 2,
    backgroundColor: colors.bevelDark,
    zIndex: 10,
  },
  
  // ============================================
  // TOP SECTION - HANDLE & ANTENNA
  // ============================================
  topSection: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  
  // Carrying handle (left)
  handleContainer: {
    width: 48,
    height: 58,
    position: 'relative',
  },
  
  handleOuter: {
    position: 'absolute',
    left: 0,
    top: 10,
    width: 42,
    height: 48,
    backgroundColor: colors.bodyDark,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: colors.bodySecondary,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  
  handleOuterHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.bevelLight,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  
  handleInner: {
    position: 'absolute',
    left: 9,
    top: 21,
    width: 24,
    height: 28,
    backgroundColor: colors.bevelDarker,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  
  handleInnerDepth: {
    position: 'absolute',
    left: 1,
    top: 1,
    right: 1,
    height: 3,
    backgroundColor: colors.shadowDark,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  
  handleHighlight: {
    position: 'absolute',
    left: 3,
    top: 4,
    width: 36,
    height: 2,
    backgroundColor: colors.highlightMid,
    borderRadius: 1,
  },
  
  // Center top clip/mount
  topClipContainer: {
    alignItems: 'center',
    marginTop: 6,
  },
  
  topClip: {
    width: 32,
    height: 22,
    backgroundColor: colors.accentTeal,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.bodyDark,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  
  topClipHighlight: {
    position: 'absolute',
    top: 2,
    left: 4,
    right: 4,
    height: 4,
    backgroundColor: colors.highlightMid,
    borderRadius: 2,
  },
  
  topClipShadow: {
    position: 'absolute',
    bottom: 2,
    left: 4,
    right: 4,
    height: 3,
    backgroundColor: colors.shadowLight,
    borderRadius: 2,
  },
  
  // Antenna section (right)
  antennaSection: {
    alignItems: 'flex-end',
  },
  
  antennaBase: {
    width: 30,
    height: 38,
    backgroundColor: colors.metalDark,
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  
  antennaBaseHighlight: {
    position: 'absolute',
    top: 2,
    left: 3,
    right: 3,
    height: 4,
    backgroundColor: colors.metalHighlight,
    borderRadius: 2,
  },
  
  antennaBaseShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: colors.shadowMid,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  
  antennaStalk: {
    width: 12,
    height: 65,
    backgroundColor: colors.metalDark,
    borderRadius: 4,
    marginTop: -3,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  
  antennaStalkHighlight: {
    position: 'absolute',
    left: 1,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.metalLight,
    borderRadius: 2,
  },
  
  antennaStalkShadow: {
    position: 'absolute',
    right: 1,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: colors.shadowMid,
    borderRadius: 1,
  },
  
  antennaStalkRing: {
    position: 'absolute',
    left: -1,
    right: -1,
    height: 4,
    backgroundColor: colors.metalMid,
    borderRadius: 2,
  },
  
  antennaTip: {
    width: 10,
    height: 10,
    backgroundColor: colors.metalMid,
    borderRadius: 5,
    marginTop: -2,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  
  antennaTipHighlight: {
    position: 'absolute',
    top: 1,
    left: 2,
    width: 4,
    height: 3,
    backgroundColor: colors.metalShine,
    borderRadius: 2,
  },
  
  // Frequency label
  frequencyLabel: {
    backgroundColor: colors.bodyDarker,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 3,
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.bodyDark,
  },
  
  frequencyText: {
    fontSize: 6,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: 0.5,
  },
  
  // ============================================
  // VENT GRILLE (Right side)
  // ============================================
  ventGrilleContainer: {
    position: 'absolute',
    right: 10,
    top: 80,
    width: 22,
    height: 130,
    backgroundColor: colors.bodyDark,
    borderRadius: 4,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  
  ventGrilleInner: {
    flex: 1,
    gap: 2,
  },
  
  ventSlot: {
    height: 4,
    backgroundColor: colors.ventDark,
    borderRadius: 1,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  
  ventSlotHighlight: {
    position: 'absolute',
    bottom: 0,
    left: 1,
    right: 1,
    height: 1,
    backgroundColor: colors.ventLight,
  },
  
  ventSlotDepth: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.shadowDark,
  },
  
  // ============================================
  // MAIN LCD SCREEN
  // ============================================
  screenSection: {
    marginHorizontal: 18,
    marginTop: 8,
  },
  
  screenOuterFrame: {
    backgroundColor: colors.bodyDark,
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  
  screenOuterFrameHighlight: {
    position: 'absolute',
    top: 1,
    left: 10,
    right: 10,
    height: 2,
    backgroundColor: colors.highlightSubtle,
    borderRadius: 1,
  },
  
  screenOuterFrameShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: colors.shadowMid,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  
  screenInnerFrame: {
    backgroundColor: colors.metalDark,
    borderRadius: 8,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  
  screenInnerFrameHighlight: {
    position: 'absolute',
    top: 1,
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: colors.metalHighlight,
    borderRadius: 1,
  },
  
  screenBezel: {
    backgroundColor: colors.screenBorder,
    borderRadius: 5,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  
  screenBezelInnerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: colors.shadowDark,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  
  lcdScreen: {
    backgroundColor: colors.screenBackground,
    borderRadius: 3,
    height: 200,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Screen glow effect
  screenGlow: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    right: '20%',
    bottom: '20%',
    backgroundColor: colors.screenGlow,
    borderRadius: 100,
    opacity: 0.3,
  },
  
  // Screen vignette (darkened edges)
  screenVignetteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: colors.shadowDark,
    opacity: 0.4,
  },
  
  screenVignetteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: colors.shadowDark,
    opacity: 0.5,
  },
  
  screenVignetteLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: colors.shadowMid,
    opacity: 0.4,
  },
  
  screenVignetteRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: colors.shadowMid,
    opacity: 0.4,
  },
  
  // Scanlines overlay
  scanlinesOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.15,
    zIndex: 5,
  },
  
  scanline: {
    height: 2,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.5)',
  },
  
  // Screen reflection glare
  screenReflection: {
    position: 'absolute',
    top: 10,
    left: 20,
    width: 60,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    transform: [{ rotate: '-20deg' }],
  },
  
  // Terminal text container
  terminalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  // Screen labels below
  screenLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 6,
  },
  
  screenLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.textBrand,
    letterSpacing: 0.5,
  },
  
  screenLabelLeft: {
    color: '#a44',
  },
  
  // ============================================
  // LED INDICATOR (on screen frame)
  // ============================================
  ledContainer: {
    position: 'absolute',
    top: 6,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  
  ledMount: {
    width: 12,
    height: 12,
    backgroundColor: colors.metalDark,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  
  ledLight: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.ledGreen,
    shadowColor: colors.ledGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  
  ledOff: {
    backgroundColor: '#0a1a0a',
    shadowOpacity: 0,
  },
  
  // ============================================
  // BRAND SECTION
  // ============================================
  brandSection: {
    marginTop: 18,
    marginHorizontal: 22,
    alignItems: 'flex-start',
  },
  
  brandText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: 3,
    textShadowColor: colors.shadowMid,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  
  // ============================================
  // BOTTOM SECTION - SLIDING PANEL
  // ============================================
  bottomSection: {
    flex: 1,
    marginTop: 18,
    paddingHorizontal: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  
  // Hidden buttons container - vintage control panel style
  hiddenButtonsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 140,
    backgroundColor: '#141614',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 10,
    zIndex: 1,
    overflow: 'hidden',
  },
  
  // Inner cavity effect - recessed panel
  hiddenButtonsCavity: {
    position: 'absolute',
    top: 4,
    left: 8,
    right: 8,
    bottom: 8,
    backgroundColor: '#0c0e0c',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#080a08',
  },
  
  // Top inner shadow of the cavity
  hiddenButtonsCavityShadow: {
    position: 'absolute',
    top: 4,
    left: 8,
    right: 8,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  
  // Metal plate texture lines (horizontal)
  hiddenButtonsPlateLineH: {
    position: 'absolute',
    height: 1,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  
  // Metal plate texture lines (vertical)
  hiddenButtonsPlateLineV: {
    position: 'absolute',
    width: 1,
    top: 12,
    bottom: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  
  // Rivet/screw mounts
  hiddenButtonsRivet: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1a1c1a',
    borderWidth: 1,
    borderColor: '#0a0c0a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  
  hiddenButtonsRivetInner: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  
  // Engraved label strip
  hiddenButtonsLabel: {
    position: 'absolute',
    top: 6,
    left: '50%',
    transform: [{ translateX: -30 }],
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#0a0c0a',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#181a18',
  },
  
  hiddenButtonsLabelText: {
    fontSize: 5,
    fontWeight: '700',
    color: '#3a3c3a',
    letterSpacing: 1.5,
  },
  
  // Texture dots for cavity
  hiddenButtonsTextureDot: {
    position: 'absolute',
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  
  // Warning stripes (industrial hazard pattern)
  hiddenButtonsWarningStripe: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#1a1a0a',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  
  // Side channel grooves
  hiddenButtonsChannelLeft: {
    position: 'absolute',
    left: 4,
    top: 20,
    bottom: 20,
    width: 4,
    backgroundColor: '#080a08',
    borderRadius: 2,
  },
  
  hiddenButtonsChannelRight: {
    position: 'absolute',
    right: 4,
    top: 20,
    bottom: 20,
    width: 4,
    backgroundColor: '#080a08',
    borderRadius: 2,
  },
  
  hiddenButtonsChannelHighlight: {
    position: 'absolute',
    left: 1,
    top: 2,
    bottom: 2,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 1,
  },
  
  // Button outer bezel (dark recessed frame)
  hiddenButtonBezel: {
    backgroundColor: '#0a0c0a',
    borderRadius: 6,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  
  hiddenButtonBezelInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  
  // Button body (cream/off-white like reference)
  hiddenButton: {
    height: 46,
    backgroundColor: '#e8e4dc',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    position: 'relative',
    // 3D raised effect
    borderTopWidth: 2,
    borderTopColor: '#f5f2ec',
    borderLeftWidth: 1,
    borderLeftColor: '#f0ede6',
    borderRightWidth: 1,
    borderRightColor: '#c8c4bc',
    borderBottomWidth: 3,
    borderBottomColor: '#a8a49c',
  },
  
  // Pressed state (inset)
  hiddenButtonPressed: {
    backgroundColor: '#dcd8d0',
    borderTopWidth: 3,
    borderTopColor: '#a8a49c',
    borderLeftWidth: 1,
    borderLeftColor: '#b8b4ac',
    borderRightWidth: 1,
    borderRightColor: '#e8e4dc',
    borderBottomWidth: 1,
    borderBottomColor: '#f0ede6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  
  // Top highlight stripe
  hiddenButtonHighlight: {
    position: 'absolute',
    top: 3,
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 1,
  },
  
  // Bottom shadow edge
  hiddenButtonShadow: {
    position: 'absolute',
    bottom: 3,
    left: 6,
    right: 6,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 1,
  },
  
  // Inner recessed area (like the reference buttons)
  hiddenButtonInset: {
    position: 'absolute',
    top: 8,
    left: 10,
    right: 10,
    bottom: 8,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  
  // Button label
  hiddenButtonLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2a2a2a',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  
  // Small indicator dot (like in reference)
  hiddenButtonIndicator: {
    position: 'absolute',
    bottom: 6,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1a6a4a',
  },
  
  hiddenButtonIndicatorActive: {
    backgroundColor: '#2a9a6a',
    shadowColor: '#2a9a6a',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  
  // Sliding panel
  slidingPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: -140,
    backgroundColor: colors.accentTeal,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    overflow: 'hidden',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  
  slidingPanelHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.bevelLight,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  
  // Panel surface texture - horizontal machined lines
  slidingPanelTextureLine: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  
  slidingPanelTextureLineLight: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  
  // Grip texture strips on sides
  slidingPanelGripLeft: {
    position: 'absolute',
    left: 6,
    top: 8,
    width: 8,
    height: 55,
    backgroundColor: colors.bodyDarker,
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  slidingPanelGripRight: {
    position: 'absolute',
    right: 6,
    top: 8,
    width: 8,
    height: 55,
    backgroundColor: colors.bodyDarker,
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  slidingPanelGripLine: {
    height: 3,
    backgroundColor: colors.bodyDarkest,
    marginBottom: 3,
  },
  
  slidingPanelGripHighlight: {
    position: 'absolute',
    left: 1,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  
  // Corner accents
  slidingPanelCornerTL: {
    position: 'absolute',
    top: 6,
    left: 18,
    width: 12,
    height: 12,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: colors.bodyDark,
    borderTopLeftRadius: 4,
  },
  
  slidingPanelCornerTR: {
    position: 'absolute',
    top: 6,
    right: 18,
    width: 12,
    height: 12,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: colors.bodyDark,
    borderTopRightRadius: 4,
  },
  
  // Engraved panel border
  slidingPanelBorderInset: {
    position: 'absolute',
    top: 4,
    left: 16,
    right: 16,
    height: 62,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
  },
  
  slidingPanelBorderInsetHighlight: {
    position: 'absolute',
    bottom: 0,
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 1,
  },
  
  // Small rivets on panel
  slidingPanelRivet: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.bodyDark,
    borderWidth: 1,
    borderColor: colors.bodyDarkest,
  },
  
  slidingPanelRivetShine: {
    position: 'absolute',
    top: 1,
    left: 1,
    width: 2,
    height: 1,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  
  // Wear marks on panel surface
  slidingPanelWear: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
  },
  
  // Panel label emboss
  slidingPanelLabelEmboss: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    left: '50%',
    transform: [{ translateX: -25 }],
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  
  slidingPanelLabelText: {
    fontSize: 6,
    fontWeight: '600',
    color: colors.textDark,
    letterSpacing: 2,
  },
  
  // Slide handle
  slideHandle: {
    alignItems: 'center',
    paddingVertical: 10,
    zIndex: 5,
  },
  
  slideHandleBar: {
    width: 55,
    height: 6,
    backgroundColor: colors.bodyDarker,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  
  slideHandleBarHighlight: {
    position: 'absolute',
    top: 1,
    left: 6,
    right: 6,
    height: 1,
    backgroundColor: colors.highlightSubtle,
    borderRadius: 1,
  },
  
  slideHint: {
    fontSize: 7,
    color: colors.textMid,
    marginTop: 4,
    letterSpacing: 1,
  },
  
  // Rugged base content
  ruggedBase: {
    flex: 1,
    backgroundColor: colors.accentTeal,
    position: 'relative',
    overflow: 'hidden',
  },
  
  ruggedBaseHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.bevelLight,
  },
  
  ruggedBaseShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: colors.bevelDarker,
  },
  
  ruggedBaseTexture: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 50,
    backgroundColor: colors.bodyDark,
    opacity: 0.3,
    borderRadius: 8,
  },
  
  // ============================================
  // WEATHERED SURFACE - Scratches, dents, stickers
  // ============================================
  
  // Scratch lines - light surface scratches
  scratchLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  
  // Deep scratches - more visible
  scratchLineDeep: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 1,
  },
  
  // Dent - circular depression
  dent: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  
  dentInner: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  
  dentHighlight: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 6,
    height: 4,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  
  dentSmall: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  
  dentSmallInner: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  
  // Paint chips - exposed undercoat
  paintChip: {
    position: 'absolute',
    backgroundColor: '#2a3230',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  
  paintChipLarge: {
    position: 'absolute',
    backgroundColor: '#252d2b',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
  },
  
  // ============================================
  // STICKERS - Torn, worn, peeling
  // ============================================
  
  stickerBase: {
    position: 'absolute',
    borderRadius: 3,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  
  stickerOrange: {
    backgroundColor: '#e07030',
    borderWidth: 2,
    borderColor: '#c05820',
  },
  
  stickerDark: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#0a0a0a',
  },
  
  stickerYellow: {
    backgroundColor: '#e8c830',
    borderWidth: 2,
    borderColor: '#c8a820',
  },
  
  stickerWhite: {
    backgroundColor: '#f0f0e8',
    borderWidth: 2,
    borderColor: '#d0d0c8',
  },
  
  stickerBlue: {
    backgroundColor: '#3080d0',
    borderWidth: 2,
    borderColor: '#2060a0',
  },
  
  stickerGreen: {
    backgroundColor: '#40a050',
    borderWidth: 2,
    borderColor: '#308040',
  },
  
  stickerRed: {
    backgroundColor: '#d04040',
    borderWidth: 2,
    borderColor: '#a03030',
  },
  
  stickerPurple: {
    backgroundColor: '#8050c0',
    borderWidth: 2,
    borderColor: '#6040a0',
  },
  
  stickerCyan: {
    backgroundColor: '#40c8d0',
    borderWidth: 2,
    borderColor: '#30a0a8',
  },
  
  stickerCream: {
    backgroundColor: '#f0e8d8',
    borderWidth: 2,
    borderColor: '#d0c8b8',
  },
  
  stickerPink: {
    backgroundColor: '#e870a0',
    borderWidth: 2,
    borderColor: '#c85080',
  },
  
  stickerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  
  stickerTornEdge: {
    position: 'absolute',
    height: 5,
    backgroundColor: '#e8e4dc',
    borderRadius: 2,
    transform: [{ rotate: '2deg' }],
  },
  
  stickerPeelCorner: {
    position: 'absolute',
    width: 18,
    height: 18,
    backgroundColor: '#d8d4cc',
    borderRadius: 3,
    transform: [{ rotate: '25deg' }],
    shadowColor: '#000',
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  
  stickerTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  
  stickerTextHuge: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  
  stickerTextLarge: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  
  stickerTextMedium: {
    fontSize: 12,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 1,
  },
  
  stickerTextSmall: {
    fontSize: 8,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 0.5,
  },
  
  stickerTextWhite: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },
  
  stickerTextWhiteLarge: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  
  stickerTextGray: {
    fontSize: 8,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1,
  },
  
  stickerTextPink: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffaaaa',
    letterSpacing: 1,
  },
  
  stickerTextTiny: {
    fontSize: 6,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 0.5,
  },
  
  stickerTextDark: {
    fontSize: 12,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  
  stickerTextDarkLarge: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  
  stickerTextDarkSmall: {
    fontSize: 7,
    fontWeight: '700',
    color: '#2a2a2a',
    letterSpacing: 0.5,
  },
  
  stickerIconText: {
    fontSize: 20,
    color: '#1a1a1a',
  },
  
  stickerJapanese: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  
  stickerJapaneseSmall: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fff',
  },
  
  stickerEmoji: {
    fontSize: 24,
  },
  
  // Scratches on stickers
  stickerScratch: {
    position: 'absolute',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 1,
  },
  
  stickerScratchDeep: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 1,
  },
  
  // ============================================
  // IMAGE STICKERS
  // ============================================
  
  imageStickerContainer: {
    position: 'absolute',
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  
  imageStickerImage: {
    width: '100%',
    height: '100%',
  },
  
  // Texture overlay for worn look
  imageStickerTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 4,
  },
  
  stickerWear: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
  },
  
  // Sticker residue (removed sticker)
  stickerResidue: {
    position: 'absolute',
    backgroundColor: 'rgba(200,190,170,0.15)',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(150,140,120,0.1)',
  },
  
  stickerResidueInner: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    backgroundColor: 'rgba(180,170,150,0.08)',
    borderRadius: 2,
  },
  
  // Round sticker
  stickerRound: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2a8a5a',
    borderWidth: 2,
    borderColor: '#1a6a4a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  
  stickerRoundLarge: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2a9a5a',
    borderWidth: 3,
    borderColor: '#1a7a4a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  
  stickerRoundText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#fff',
  },
  
  stickerRoundTextLarge: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  
  stickerRoundWear: {
    position: 'absolute',
    top: 5,
    left: 8,
    width: 18,
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 5,
  },
  
  // Barcode sticker
  stickerBarcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    flex: 1,
  },
  
  stickerBarcodeLine: {
    height: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 0.5,
  },
  
  // ============================================
  // ADDITIONAL WEAR EFFECTS
  // ============================================
  
  scuffMark: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 8,
  },
  
  grimeMark: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  
  edgeWear: {
    position: 'absolute',
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 2,
  },
  
  // ============================================
  // SPRAY PAINT / GRAFFITI
  // ============================================
  
  sprayPaint: {
    position: 'absolute',
    zIndex: 15,
  },
  
  sprayPaintText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#e02020',
    letterSpacing: 3,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 4,
    opacity: 0.85,
  },
  
  sprayDrip: {
    position: 'absolute',
    width: 4,
    height: 15,
    backgroundColor: '#e02020',
    borderRadius: 2,
    opacity: 0.7,
  },
  
  sprayMark: {
    position: 'absolute',
    backgroundColor: 'rgba(220,30,30,0.15)',
    borderRadius: 10,
  },
  
  // ============================================
  // SURFACE SCRATCHES (on panel, not stickers)
  // ============================================
  
  surfaceScratchLong: {
    position: 'absolute',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    zIndex: 20,
  },
  
  surfaceScratchShort: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 1,
    zIndex: 20,
  },
  
  // Angular cutouts
  baseCutoutLeft: {
    position: 'absolute',
    left: 18,
    bottom: 25,
    width: 55,
    height: 40,
    backgroundColor: colors.bodyDarker,
    borderRadius: 8,
    transform: [{ skewX: '-10deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  
  baseCutoutRight: {
    position: 'absolute',
    right: 18,
    bottom: 25,
    width: 55,
    height: 40,
    backgroundColor: colors.bodyDarker,
    borderRadius: 8,
    transform: [{ skewX: '10deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  
  baseCutoutCenter: {
    position: 'absolute',
    left: '28%',
    right: '28%',
    bottom: 30,
    height: 28,
    backgroundColor: colors.bodyDark,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  
  // Brand logo on base
  baseLogoContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  
  baseLogoText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMid,
    letterSpacing: 3,
  },
  
  // Side grip rails
  sideRailLeft: {
    position: 'absolute',
    left: 0,
    top: 12,
    bottom: 65,
    width: 10,
    backgroundColor: colors.bodyDarker,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  
  sideRailRight: {
    position: 'absolute',
    right: 0,
    top: 12,
    bottom: 65,
    width: 10,
    backgroundColor: colors.bodyDarker,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: -1, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  
  // Protective feet
  footLeft: {
    position: 'absolute',
    left: 28,
    bottom: 6,
    width: 45,
    height: 14,
    backgroundColor: colors.rubberDark,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  
  footRight: {
    position: 'absolute',
    right: 28,
    bottom: 6,
    width: 45,
    height: 14,
    backgroundColor: colors.rubberDark,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  
  footHighlight: {
    position: 'absolute',
    top: 1,
    left: 5,
    right: 5,
    height: 2,
    backgroundColor: colors.rubberLight,
    borderRadius: 1,
  },
});

export default deviceStyles;
