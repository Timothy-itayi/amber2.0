import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { deviceStyles as styles } from '../styles/device-menu.styles';
import TerminalText from './terminal-text';

// Tactile button component with press animation
interface TactileButtonProps {
  label: string;
  onPress: () => void;
  isActive?: boolean;
}

function TactileButton({ label, onPress, isActive = false }: TactileButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    setIsPressed(true);
    translateY.value = withTiming(2, { duration: 50, easing: Easing.out(Easing.quad) });
    scale.value = withTiming(0.98, { duration: 50, easing: Easing.out(Easing.quad) });
  };

  const handlePressOut = () => {
    setIsPressed(false);
    translateY.value = withTiming(0, { duration: 80, easing: Easing.out(Easing.bounce) });
    scale.value = withTiming(1, { duration: 80, easing: Easing.out(Easing.bounce) });
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <View style={styles.hiddenButtonBezel}>
        <View style={styles.hiddenButtonBezelInner} />
        <Animated.View 
          style={[
            styles.hiddenButton,
            isPressed && styles.hiddenButtonPressed,
            animatedButtonStyle,
          ]}
        >
          {!isPressed && <View style={styles.hiddenButtonHighlight} />}
          {!isPressed && <View style={styles.hiddenButtonShadow} />}
          <View style={styles.hiddenButtonInset} />
          <Text style={styles.hiddenButtonLabel}>{label}</Text>
          <View style={[
            styles.hiddenButtonIndicator,
            isActive && styles.hiddenButtonIndicatorActive,
          ]} />
        </Animated.View>
      </View>
    </Pressable>
  );
}

const SLIDE_THRESHOLD = 140;

interface HiddenButton {
  id: string;
  label: string;
  onPress?: () => void;
}

interface DeviceMainMenuProps {
  title?: string;
  hiddenButtons?: HiddenButton[];
  onNewGame?: () => void;
  onSettings?: () => void;
  terminalText?: string;
  showSystemReady?: boolean;
}

export default function DeviceMainMenu({ 
  title = 'AMBER',
  hiddenButtons = [
    { id: 'new-game', label: 'NEW GAME' },
    { id: 'settings', label: 'SETTINGS' },
  ],
  onNewGame,
  onSettings,
  terminalText = 'WELCOME TO AMBER',
  showSystemReady = true,
}: DeviceMainMenuProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const panelTranslateY = useSharedValue(0);

  const handleTypingComplete = useCallback(() => {
    setIsReady(true);
  }, []);

  const handleHiddenButtonPress = (button: HiddenButton) => {
    if (button.id === 'new-game') {
      onNewGame?.();
    } else if (button.id === 'settings') {
      onSettings?.();
    }
    button.onPress?.();
  };

  const updatePanelState = (isOpen: boolean) => {
    setIsPanelOpen(isOpen);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const currentOffset = isPanelOpen ? SLIDE_THRESHOLD : 0;
      const newY = Math.max(0, Math.min(SLIDE_THRESHOLD, event.translationY + currentOffset));
      panelTranslateY.value = newY;
    })
    .onEnd(() => {
      const timingConfig = { duration: 280, easing: Easing.out(Easing.cubic) };
      if (panelTranslateY.value > SLIDE_THRESHOLD / 2) {
        panelTranslateY.value = withTiming(SLIDE_THRESHOLD, timingConfig);
        runOnJS(updatePanelState)(true);
      } else {
        panelTranslateY.value = withTiming(0, timingConfig);
        runOnJS(updatePanelState)(false);
      }
    });

  const animatedPanelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: panelTranslateY.value }],
  }));

  // Generate vent slots
  const ventSlots = Array(18).fill(null);

  // Generate scanlines
  const scanlines = Array(50).fill(null);

  // Generate texture dots for realistic surface
  const textureDots = Array(40).fill(null).map((_, i) => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    dark: Math.random() > 0.5,
  }));

  // Generate scratch marks
  const scratches = [
    { top: 8, left: 15, width: 30, rotate: -5, dark: false },
    { top: 22, left: 5, width: 18, rotate: 12, dark: true },
    { top: 45, right: 20, width: 35, rotate: -8, dark: false },
    { top: 65, left: 25, width: 25, rotate: 3, dark: true },
    { top: 78, right: 30, width: 28, rotate: -15, dark: false },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* ============================================ */}
        {/* MAIN DEVICE BODY */}
        {/* ============================================ */}
        <View style={styles.deviceBody}>
          
          {/* ============================================ */}
          {/* TEXTURE LAYER - Surface details */}
          {/* ============================================ */}
          <View style={styles.textureLayer}>
            {/* Texture dots */}
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
            
            {/* Scratch marks */}
            {scratches.map((scratch, i) => (
              <View
                key={`scratch-${i}`}
                style={[
                  styles.scratchMark,
                  scratch.dark && styles.scratchMarkDark,
                  {
                    top: `${scratch.top}%`,
                    ...(scratch.left !== undefined ? { left: `${scratch.left}%` } : {}),
                    ...(scratch.right !== undefined ? { right: `${scratch.right}%` } : {}),
                    width: scratch.width,
                    transform: [{ rotate: `${scratch.rotate}deg` }],
                  },
                ]}
              />
            ))}
            
            {/* Wear spots */}
            <View style={[styles.wearSpot, { top: '12%', left: 5, width: 30, height: 45, opacity: 0.08 }]} />
            <View style={[styles.wearSpot, { top: '35%', right: 8, width: 25, height: 35, opacity: 0.06 }]} />
            <View style={[styles.wearSpot, { bottom: '25%', left: 10, width: 35, height: 30, opacity: 0.07 }]} />
          </View>

          {/* ============================================ */}
          {/* DEPTH SHADOWS - Inner shadow effect */}
          {/* ============================================ */}
          <View style={styles.depthShadowLeft} />
          <View style={styles.depthShadowRight} />
          <View style={styles.depthShadowBottom} />

          {/* ============================================ */}
          {/* OUTER BEVELS - 3D edges */}
          {/* ============================================ */}
          <View style={styles.bevelHighlightTop} />
          <View style={styles.bevelHighlightTopInner} />
          <View style={styles.bevelHighlightLeft} />
          <View style={styles.bevelHighlightLeftInner} />
          <View style={styles.bevelShadowBottom} />
          <View style={styles.bevelShadowBottomInner} />
          <View style={styles.bevelShadowRight} />
          <View style={styles.bevelShadowRightInner} />

          {/* ============================================ */}
          {/* TOP SECTION - HANDLE & ANTENNA */}
          {/* ============================================ */}
          <View style={styles.topSection}>
            
            {/* Carrying Handle (Left) */}
            <View style={styles.handleContainer}>
              <View style={styles.handleOuter}>
                <View style={styles.handleOuterHighlight} />
              </View>
              <View style={styles.handleInner}>
                <View style={styles.handleInnerDepth} />
              </View>
              <View style={styles.handleHighlight} />
            </View>

            {/* Center Top Clip */}
            <View style={styles.topClipContainer}>
              <View style={styles.topClip}>
                <View style={styles.topClipHighlight} />
                <View style={styles.topClipShadow} />
              </View>
            </View>

            {/* Antenna Section (Right) */}
            <View style={styles.antennaSection}>
              <View style={styles.antennaBase}>
                <View style={styles.antennaBaseHighlight} />
                <View style={styles.antennaBaseShadow} />
              </View>
              <View style={styles.antennaStalk}>
                <View style={styles.antennaStalkHighlight} />
                <View style={styles.antennaStalkShadow} />
                <View style={[styles.antennaStalkRing, { top: 15 }]} />
                <View style={[styles.antennaStalkRing, { top: 35 }]} />
                <View style={[styles.antennaStalkRing, { top: 55 }]} />
              </View>
              <View style={styles.antennaTip}>
                <View style={styles.antennaTipHighlight} />
              </View>
              <View style={styles.frequencyLabel}>
                <Text style={styles.frequencyText}>225-2000</Text>
                <Text style={styles.frequencyText}>MHz</Text>
              </View>
            </View>
          </View>

          {/* ============================================ */}
          {/* VENT GRILLE (Right side) */}
          {/* ============================================ */}
          <View style={styles.ventGrilleContainer}>
            <View style={styles.ventGrilleInner}>
              {ventSlots.map((_, index) => (
                <View key={index} style={styles.ventSlot}>
                  <View style={styles.ventSlotDepth} />
                  <View style={styles.ventSlotHighlight} />
                </View>
              ))}
            </View>
          </View>

          {/* ============================================ */}
          {/* MAIN LCD SCREEN */}
          {/* ============================================ */}
          <View style={styles.screenSection}>
            <View style={styles.screenOuterFrame}>
              <View style={styles.screenOuterFrameHighlight} />
              <View style={styles.screenOuterFrameShadow} />
              
              <View style={styles.screenInnerFrame}>
                <View style={styles.screenInnerFrameHighlight} />
                
                <View style={styles.screenBezel}>
                  <View style={styles.screenBezelInnerShadow} />
                  
                  <View style={styles.lcdScreen}>
                    {/* Screen glow */}
                    <View style={styles.screenGlow} />
                    
                    {/* Vignette effect */}
                    <View style={styles.screenVignetteTop} />
                    <View style={styles.screenVignetteBottom} />
                    <View style={styles.screenVignetteLeft} />
                    <View style={styles.screenVignetteRight} />
                    
                    {/* Scanlines */}
                    <View style={styles.scanlinesOverlay}>
                      {scanlines.map((_, index) => (
                        <View key={index} style={styles.scanline} />
                      ))}
                    </View>
                    
                    {/* Screen reflection glare */}
                    <View style={styles.screenReflection} />
                    
                    {/* AMBER acronym + terminal */}
                    <View style={styles.terminalContainer}>
                      <View style={styles.acronymBlock}>
                        <Text style={styles.acronymTitle}>AMBER</Text>
                        <Text style={styles.acronymPhrase} numberOfLines={2}>
                          Always Much Better{'\n'}Easy Results
                        </Text>
                      </View>
                      <View style={styles.terminalTextWrapper}>
                        <TerminalText 
                          text={terminalText}
                          typingSpeed={80}
                          onComplete={handleTypingComplete}
                          showSystemReady={showSystemReady}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              
              {/* LED Indicator */}
              <View style={styles.ledContainer}>
                <View style={styles.ledMount}>
                  <View style={[styles.ledLight, !isReady && styles.ledOff]} />
                </View>
              </View>
              
              {/* Screen Labels */}
              <View style={styles.screenLabelRow}>
                <Text style={[styles.screenLabel, styles.screenLabelLeft]}>AMBER</Text>
                <Text style={styles.screenLabel}>{title}</Text>
              </View>
            </View>
          </View>

          {/* ============================================ */}
          {/* BRAND LABEL */}
          {/* ============================================ */}
          <View style={styles.brandSection}>
            <Text style={styles.brandText}>GEBAUR</Text>
          </View>

          {/* ============================================ */}
          {/* BOTTOM SECTION - SLIDING PANEL */}
          {/* ============================================ */}
          <View style={styles.bottomSection}>
            
            {/* Hidden Buttons - Vintage Control Panel Style */}
            <View style={styles.hiddenButtonsContainer}>
              {/* Recessed cavity effect */}
              <View style={styles.hiddenButtonsCavity} />
              <View style={styles.hiddenButtonsCavityShadow} />
              
              {/* Side channel grooves */}
              <View style={styles.hiddenButtonsChannelLeft}>
                <View style={styles.hiddenButtonsChannelHighlight} />
              </View>
              <View style={styles.hiddenButtonsChannelRight}>
                <View style={styles.hiddenButtonsChannelHighlight} />
              </View>
              
              {/* Horizontal plate lines */}
              <View style={[styles.hiddenButtonsPlateLineH, { top: 18 }]} />
              <View style={[styles.hiddenButtonsPlateLineH, { top: 38 }]} />
              <View style={[styles.hiddenButtonsPlateLineH, { bottom: 38 }]} />
              <View style={[styles.hiddenButtonsPlateLineH, { bottom: 18 }]} />
              
              {/* Vertical plate lines */}
              <View style={[styles.hiddenButtonsPlateLineV, { left: 45 }]} />
              <View style={[styles.hiddenButtonsPlateLineV, { right: 45 }]} />
              
              {/* Corner rivets */}
              <View style={[styles.hiddenButtonsRivet, { top: 10, left: 14 }]}>
                <View style={styles.hiddenButtonsRivetInner} />
              </View>
              <View style={[styles.hiddenButtonsRivet, { top: 10, right: 14 }]}>
                <View style={styles.hiddenButtonsRivetInner} />
              </View>
              <View style={[styles.hiddenButtonsRivet, { bottom: 10, left: 14 }]}>
                <View style={styles.hiddenButtonsRivetInner} />
              </View>
              <View style={[styles.hiddenButtonsRivet, { bottom: 10, right: 14 }]}>
                <View style={styles.hiddenButtonsRivetInner} />
              </View>
              
              {/* Engraved label */}
              <View style={styles.hiddenButtonsLabel}>
                <Text style={styles.hiddenButtonsLabelText}>MENU</Text>
              </View>
              
              {/* Texture dots */}
              {Array(12).fill(null).map((_, i) => (
                <View
                  key={`cavity-dot-${i}`}
                  style={[
                    styles.hiddenButtonsTextureDot,
                    {
                      top: 25 + Math.floor(i / 4) * 35,
                      left: 35 + (i % 4) * 75,
                      width: 2,
                      height: 2,
                    },
                  ]}
                />
              ))}
              
              {/* Warning stripe */}
              <View style={styles.hiddenButtonsWarningStripe} />
              
              {/* Actual buttons */}
              {hiddenButtons.map((button) => (
                <TactileButton
                  key={button.id}
                  label={button.label}
                  onPress={() => handleHiddenButtonPress(button)}
                  isActive={button.id === 'new-game'}
                />
              ))}
            </View>

            {/* Sliding Panel */}
            <GestureDetector gesture={panGesture}>
              <Animated.View style={[styles.slidingPanel, animatedPanelStyle]}>
                <View style={styles.slidingPanelHighlight} />
                
                {/* Panel border inset */}
                <View style={styles.slidingPanelBorderInset}>
                  <View style={styles.slidingPanelBorderInsetHighlight} />
                </View>
                
                {/* Horizontal texture lines */}
                <View style={[styles.slidingPanelTextureLine, { top: 12 }]} />
                <View style={[styles.slidingPanelTextureLineLight, { top: 13 }]} />
                <View style={[styles.slidingPanelTextureLine, { top: 24 }]} />
                <View style={[styles.slidingPanelTextureLineLight, { top: 25 }]} />
                <View style={[styles.slidingPanelTextureLine, { top: 48 }]} />
                <View style={[styles.slidingPanelTextureLineLight, { top: 49 }]} />
                <View style={[styles.slidingPanelTextureLine, { top: 58 }]} />
                <View style={[styles.slidingPanelTextureLineLight, { top: 59 }]} />
                
                {/* Corner accents */}
                <View style={styles.slidingPanelCornerTL} />
                <View style={styles.slidingPanelCornerTR} />
                
                {/* Side grip textures */}
                <View style={styles.slidingPanelGripLeft}>
                  <View style={styles.slidingPanelGripHighlight} />
                  {Array(8).fill(null).map((_, i) => (
                    <View key={`grip-l-${i}`} style={[styles.slidingPanelGripLine, { marginTop: i === 0 ? 4 : 0 }]} />
                  ))}
                </View>
                <View style={styles.slidingPanelGripRight}>
                  <View style={styles.slidingPanelGripHighlight} />
                  {Array(8).fill(null).map((_, i) => (
                    <View key={`grip-r-${i}`} style={[styles.slidingPanelGripLine, { marginTop: i === 0 ? 4 : 0 }]} />
                  ))}
                </View>
                
                {/* Panel rivets */}
                <View style={[styles.slidingPanelRivet, { top: 10, left: 32 }]}>
                  <View style={styles.slidingPanelRivetShine} />
                </View>
                <View style={[styles.slidingPanelRivet, { top: 10, right: 32 }]}>
                  <View style={styles.slidingPanelRivetShine} />
                </View>
                <View style={[styles.slidingPanelRivet, { top: 54, left: 32 }]}>
                  <View style={styles.slidingPanelRivetShine} />
                </View>
                <View style={[styles.slidingPanelRivet, { top: 54, right: 32 }]}>
                  <View style={styles.slidingPanelRivetShine} />
                </View>
                
                {/* Wear marks */}
                <View style={[styles.slidingPanelWear, { top: 15, left: 50, width: 40, height: 20 }]} />
                <View style={[styles.slidingPanelWear, { top: 35, right: 60, width: 30, height: 15 }]} />
                
                {/* Panel label */}
                <View style={styles.slidingPanelLabelEmboss}>
                  <Text style={styles.slidingPanelLabelText}>ACCESS</Text>
                </View>
                
                {/* Slide Handle */}
                <View style={styles.slideHandle}>
                  <View style={styles.slideHandleBar}>
                    <View style={styles.slideHandleBarHighlight} />
                  </View>
                  <Text style={styles.slideHint}>
                    {isPanelOpen ? 'SLIDE UP' : 'SLIDE DOWN'}
                  </Text>
                </View>

                {/* Rugged Base Content */}
                <View style={styles.ruggedBase}>
                  <View style={styles.ruggedBaseHighlight} />
                  <View style={styles.ruggedBaseShadow} />
                  
                  {/* ============================================ */}
                  {/* STICKER BOMB - Dense MacBook style coverage */}
                  {/* ============================================ */}
                  
                  {/* === LAYER 1: Base/Background stickers === */}
                  
                  {/* Duct tape - top left corner, angled */}
                  <View style={[styles.imageStickerContainer, { top: -20, left: -30, width: 160, height: 140, transform: [{ rotate: '-25deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/c6fbfaa3bc230b658e21b290c194c1c8-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Lemon with stickers - top right, sideways */}
                  <View style={[styles.imageStickerContainer, { top: -15, right: -20, width: 180, height: 160, transform: [{ rotate: '85deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/c69b66b8fcda99c175572b71ef7281f1-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Dollar bill - left side, crumpled look */}
                  <View style={[styles.imageStickerContainer, { top: 80, left: -25, width: 150, height: 180, transform: [{ rotate: '15deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/6cd6695301fc0436ae4a34091a4805cd-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Apple with stickers - right side */}
                  <View style={[styles.imageStickerContainer, { top: 100, right: -15, width: 175, height: 165, transform: [{ rotate: '-30deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/9ab2ee553cfa61797d3ea4cf4447a7ac-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* === LAYER 2: Middle stickers === */}
                  
                  {/* Dove - top left, natural flight angle */}
                  <View style={[styles.imageStickerContainer, { top: 25, left: 40, width: 150, height: 135, transform: [{ rotate: '-15deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/732b3271b2eb1fd55abd2a1bbcba2aae-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Fruit labels strip - top, readable */}
                  <View style={[styles.imageStickerContainer, { top: 5, left: 100, width: 180, height: 70, transform: [{ rotate: '8deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/bbde4f9f65564bebe23e1a10cdaa16c6-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Stop sign "KEEP ON GOING" - upright for readability */}
                  <View style={[styles.imageStickerContainer, { top: 60, right: 50, width: 130, height: 130, transform: [{ rotate: '5deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/054548353567560a61cd0f423a2e88f5-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Skeleton Lego - middle left, upside down */}
                  <View style={[styles.imageStickerContainer, { top: 180, left: -10, width: 120, height: 160, transform: [{ rotate: '175deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/338eb2c1e44354f6d26b04e7ec6da0b1-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Basquiat dino warning - upright */}
                  <View style={[styles.imageStickerContainer, { top: 155, left: 85, width: 130, height: 120, transform: [{ rotate: '-8deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/234e91857584ec3a1922292dbc363275-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Smiley face - middle, slight tilt */}
                  <View style={[styles.imageStickerContainer, { top: 130, right: 30, width: 100, height: 100, transform: [{ rotate: '22deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/7e2b976c7500e087dbd86cb872a87b4d-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* === LAYER 3: More overlapping stickers === */}
                  
                  {/* Two heads - center, sideways */}
                  <View style={[styles.imageStickerContainer, { top: 230, left: 60, width: 130, height: 120, transform: [{ rotate: '90deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/c2c0c074e132d5164a60ce70bcd08f2e-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Yellow warning sign - upright for readability */}
                  <View style={[styles.imageStickerContainer, { top: 220, right: -10, width: 140, height: 130, transform: [{ rotate: '3deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/8a358c240ecd6a960c50d532a4255842-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* PRAYING HANDS - UPRIGHT, prominent position */}
                  <View style={[styles.imageStickerContainer, { top: 280, left: 20, width: 140, height: 150, transform: [{ rotate: '0deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/340a17dc34b8ffe4b31f8492be66f634-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Skateboards - bottom right, diagonal */}
                  <View style={[styles.imageStickerContainer, { top: 310, right: 30, width: 145, height: 160, transform: [{ rotate: '-35deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/344395729aae87dbab59b1d3701eb904-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* === LAYER 4: Bottom section stickers === */}
                  
                  {/* X-ray hand - bottom left, upside down */}
                  <View style={[styles.imageStickerContainer, { bottom: 120, left: -20, width: 140, height: 160, transform: [{ rotate: '160deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/c1f9ab55e81ac371409e7690667de4d5-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Cat graffiti art - bottom center */}
                  <View style={[styles.imageStickerContainer, { bottom: 80, left: 70, width: 150, height: 145, transform: [{ rotate: '-12deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/aeb302310564f4e8a53ecaa78c5bd455-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Laptop sticker - bottom right, sideways */}
                  <View style={[styles.imageStickerContainer, { bottom: 100, right: -15, width: 130, height: 150, transform: [{ rotate: '70deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/d655d54da6b9c0883613c778d50a6966-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* BOOM! text - upright for readability */}
                  <View style={[styles.imageStickerContainer, { bottom: 180, right: 80, width: 80, height: 130, transform: [{ rotate: '5deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/fe06462da8698f0c5151f04f40de7611-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* === LAYER 5: Top layer accent stickers === */}
                  
                  {/* ESC key - small accent, upright */}
                  <View style={[styles.imageStickerContainer, { top: 95, left: 130, width: 70, height: 70, transform: [{ rotate: '-5deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/9d68187b2d8690713d5f7ad610e4ee8b-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* SMILE stickers - readable */}
                  <View style={[styles.imageStickerContainer, { bottom: 220, left: 20, width: 140, height: 80, transform: [{ rotate: '12deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/b2b47333f7707a39e3d4a976a521044b-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Givenchy guy - bottom, slight tilt */}
                  <View style={[styles.imageStickerContainer, { bottom: 30, left: 40, width: 120, height: 130, transform: [{ rotate: '18deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/d1d34f89053c8f1635cf8c66bacf4cbf-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Ghost/megaphone - accent */}
                  <View style={[styles.imageStickerContainer, { top: 200, left: 160, width: 110, height: 100, transform: [{ rotate: '-25deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/17f2f1ee72f85b2745860bf6cbde9b82-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Another smiley - bottom accent */}
                  <View style={[styles.imageStickerContainer, { bottom: 50, right: 60, width: 85, height: 85, transform: [{ rotate: '145deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/7e2b976c7500e087dbd86cb872a87b4d-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Another dove - bottom right, flipped */}
                  <View style={[styles.imageStickerContainer, { bottom: 15, right: -10, width: 130, height: 115, transform: [{ rotate: '200deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/732b3271b2eb1fd55abd2a1bbcba2aae-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Small lemon - gap filler */}
                  <View style={[styles.imageStickerContainer, { top: 340, left: 130, width: 100, height: 90, transform: [{ rotate: '-45deg' }] }]}>
                    <Image 
                      source={require('../assets/stickers/c69b66b8fcda99c175572b71ef7281f1-removebg-preview.png')}
                      style={styles.imageStickerImage}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </Animated.View>
            </GestureDetector>
          </View>

        </View>
      </View>
    </GestureHandlerRootView>
  );
}
