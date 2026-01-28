import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';

interface OnboardingModalProps {
  visible: boolean;
  onComplete: () => void;
}

interface OnboardingStep {
  header: string;
  title: string;
  content: string[];
  footer?: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    header: 'OPERATOR BRIEFING',
    title: 'WELCOME TO AMBER',
    content: [
      'Always Much Better Easy Results.',
      'Turning Problems Into Features.',
      '',
      'You have been assigned to the',
      'Reality Support desk. Tickets will',
      'arrive as reported issues in the field.',
      '',
      'Malfunctions, bugs, and anomalies',
      'are logged by the system. Your job',
      'is to inspect, choose a tool, and apply.',
      '',
      'The system will handle the rest.',
    ],
    footer: 'PRESS CONTINUE TO PROCEED',
  },
  {
    header: 'PROTOCOL OVERVIEW',
    title: 'YOUR DUTIES',
    content: [
      'When a ticket appears, tap to',
      'inspect the details.',
      '',
      'Select one tool from your',
      'available kit. Apply it to the',
      'current ticket.',
      '',
      'The system reinterprets every',
      'outcome. If it doesn\'t work,',
      'it works differently.',
      '',
      'This is functioning as designed.',
    ],
    footer: 'EFFICIENCY FIRST. FIX FAST.',
  },
  {
    header: 'TOOL KIT & OUTCOMES',
    title: 'JUST PRESS FIX',
    content: [
      'You have a limited set of tools.',
      'Each produces an outcome.',
      '',
      'The system will reclassify results',
      'as features. Do not report',
      'malfunctions as malfunctions.',
      '',
      'Results may vary. Features may occur.',
      'User optional. Progress through error.',
      '',
      'Trust the system.',
    ],
    footer: 'USER OPTIONAL. PROGRESS THROUGH ERROR.',
  },
  {
    header: 'PRIORITY NOTICE',
    title: 'AMBER VALUES',
    content: [
      'Feature everything. Fix fast.',
      'Every malfunction is an opportunity.',
      '',
      'All outcomes are logged and',
      'reclassified. The system features',
      'us all.',
      '',
      'Your shift begins when you',
      'acknowledge this briefing.',
    ],
    footer: 'ALL ACTIVITY IS OPTIMIZED AND LOGGED',
  },
  {
    header: 'FINAL NOTICE',
    title: 'REMEMBER',
    content: [
      'Inspect. Tool. Apply. The system',
      'handles the rest.',
      '',
      'If it doesn\'t work, it works',
      'differently. Good luck, Operator.',
    ],
    footer: 'INITIATING SYSTEM...',
  },
];

/**
 * OnboardingModal
 * 
 * CRT terminal-style modal for game onboarding.
 * Styled to look like a retro green phosphor terminal.
 */
export default function OnboardingModal({
  visible,
  onComplete,
}: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const scanlineOffset = useRef(new Animated.Value(0)).current;
  const cursorOpacity = useRef(new Animated.Value(1)).current;

  // Cursor blink animation
  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );
    blink.start();
    return () => blink.stop();
  }, []);

  // Scanline animation
  useEffect(() => {
    const scan = Animated.loop(
      Animated.timing(scanlineOffset, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    );
    scan.start();
    return () => scan.stop();
  }, []);

  // Typewriter effect for content
  useEffect(() => {
    if (!visible) return;

    const step = ONBOARDING_STEPS[currentStep];
    const allLines = [step.title, '', ...step.content];
    
    setDisplayedLines([]);
    setIsTyping(true);

    let lineIndex = 0;
    const typeNextLine = () => {
      if (lineIndex < allLines.length) {
        setDisplayedLines(prev => [...prev, allLines[lineIndex]]);
        lineIndex++;
        setTimeout(typeNextLine, 80 + Math.random() * 60);
      } else {
        setIsTyping(false);
      }
    };

    const startDelay = setTimeout(typeNextLine, 300);
    return () => clearTimeout(startDelay);
  }, [visible, currentStep]);

  useEffect(() => {
    if (visible) {
      setCurrentStep(0);
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleNext = () => {
    if (isTyping) return; // Don't allow advancing while typing
    
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onComplete();
      });
    }
  };

  const handleSkip = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete();
    });
  };

  if (!visible) return null;

  const step = ONBOARDING_STEPS[currentStep];
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  return (
    <View style={styles.overlay}>
      {/* Backdrop */}
      <Animated.View
        style={[styles.backdrop, { opacity: backdropOpacity }]}
      />

      {/* CRT Terminal Modal */}
      <Animated.View
        style={[
          styles.terminal,
          { opacity: modalOpacity },
        ]}
      >
        {/* Scanline effect */}
        <Animated.View
          style={[
            styles.scanline,
            {
              transform: [{
                translateY: scanlineOffset.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 500],
                }),
              }],
            },
          ]}
          pointerEvents="none"
        />

        {/* Screen glow effect */}
        <View style={styles.screenGlow} pointerEvents="none" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{step.header}</Text>
          <View style={styles.headerDivider} />
        </View>

        {/* Content area */}
        <ScrollView 
          style={styles.contentArea}
          contentContainerStyle={styles.contentContainer}
        >
          {displayedLines.map((line, index) => (
            <View key={index} style={styles.lineContainer}>
              {index === 0 ? (
                <Text style={styles.titleText}>{line}</Text>
              ) : (
                <Text style={styles.contentText}>{line}</Text>
              )}
            </View>
          ))}
          
          {/* Blinking cursor */}
          {isTyping && (
            <Animated.Text style={[styles.cursor, { opacity: cursorOpacity }]}>
              _
            </Animated.Text>
          )}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerDivider} />
          
          {step.footer && (
            <Text style={styles.footerText}>{step.footer}</Text>
          )}

          {/* Progress indicator */}
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>
              [{currentStep + 1}/{ONBOARDING_STEPS.length}]
            </Text>
          </View>

          {/* Flat Buttons */}
          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [
                styles.flatButton,
                styles.skipButton,
                pressed && styles.flatButtonPressed,
              ]}
              onPress={handleSkip}
            >
              <Text style={styles.skipButtonText}>SKIP</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.flatButton,
                styles.continueButton,
                isTyping && styles.buttonDisabled,
                pressed && !isTyping && styles.continueButtonPressed,
              ]}
              onPress={handleNext}
              disabled={isTyping}
            >
              <Text style={[styles.continueButtonText, isTyping && styles.buttonTextDisabled]}>
                {isLastStep ? 'BEGIN DUTY' : 'CONTINUE'}
              </Text>
            </Pressable>
          </View>

          {/* Bottom terminal line */}
          <Text style={styles.terminalPrompt}>{'>'}_</Text>
        </View>

        {/* CRT vignette corners */}
        <View style={[styles.vignette, styles.vignetteTL]} />
        <View style={[styles.vignette, styles.vignetteTR]} />
        <View style={[styles.vignette, styles.vignetteBL]} />
        <View style={[styles.vignette, styles.vignetteBR]} />
      </Animated.View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  terminal: {
    width: width * 0.9,
    maxWidth: 420,
    height: height * 0.65,
    maxHeight: 500,
    backgroundColor: '#0a0f0a',
    borderWidth: 3,
    borderColor: '#1a3a1a',
    overflow: 'hidden',
  },
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(90, 186, 106, 0.03)',
    zIndex: 10,
  },
  screenGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(74, 138, 90, 0.02)',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#3a6a4a',
    letterSpacing: 2,
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#2a4a3a',
    marginTop: 8,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingVertical: 12,
  },
  lineContainer: {
    minHeight: 20,
  },
  titleText: {
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: '700',
    color: '#5aba6a',
    letterSpacing: 3,
    marginBottom: 8,
    textShadowColor: '#3a8a4a',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  contentText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#4a9a5a',
    lineHeight: 22,
    letterSpacing: 1,
  },
  cursor: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#5aba6a',
    marginTop: 4,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#2a4a3a',
    marginBottom: 12,
  },
  footerText: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: '#3a6a4a',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 12,
  },
  progressRow: {
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#2a5a3a',
    letterSpacing: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 12,
  },
  flatButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatButtonPressed: {
    opacity: 0.7,
  },
  skipButton: {
    backgroundColor: '#1a2a1a',
  },
  skipButtonText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#6a8a6a',
    letterSpacing: 2,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#4a8a5a',
  },
  continueButtonPressed: {
    backgroundColor: '#3a7a4a',
  },
  continueButtonText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#ffffff',
    letterSpacing: 2,
    fontWeight: '700',
  },
  buttonDisabled: {
    backgroundColor: '#2a3a2a',
  },
  buttonTextDisabled: {
    color: '#4a5a4a',
  },
  terminalPrompt: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#4a8a5a',
  },
  vignette: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  vignetteTL: {
    top: 0,
    left: 0,
    borderBottomRightRadius: 40,
  },
  vignetteTR: {
    top: 0,
    right: 0,
    borderBottomLeftRadius: 40,
  },
  vignetteBL: {
    bottom: 0,
    left: 0,
    borderTopRightRadius: 40,
  },
  vignetteBR: {
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 40,
  },
});
