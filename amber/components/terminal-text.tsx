import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TerminalTextProps {
  text?: string;
  typingSpeed?: number;
  cursorBlinkSpeed?: number;
  onComplete?: () => void;
  showSystemReady?: boolean;
  instantDisplay?: boolean; // Skip typing animation, show text immediately
}

export default function TerminalText({
  text = 'WELCOME TO AMBER',
  typingSpeed = 100,
  cursorBlinkSpeed = 530,
  onComplete,
  showSystemReady = true,
  instantDisplay = false,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState(instantDisplay ? text : '');
  const [isTypingComplete, setIsTypingComplete] = useState(instantDisplay);
  const [cursorVisible, setCursorVisible] = useState(true);
  const charIndexRef = useRef(instantDisplay ? text.length : 0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevTextRef = useRef(text);

  // Cursor blink using simple state toggle (more reliable)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, cursorBlinkSpeed / 2);

    return () => clearInterval(blinkInterval);
  }, [cursorBlinkSpeed]);

  // Typewriter effect
  useEffect(() => {
    // If text changed and instantDisplay is true, just show it
    if (instantDisplay) {
      setDisplayedText(text);
      setIsTypingComplete(true);
      charIndexRef.current = text.length;
      onComplete?.();
      return;
    }

    // Reset for new text (typing animation)
    charIndexRef.current = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const typeNextChar = () => {
      if (charIndexRef.current < text.length) {
        setDisplayedText(text.substring(0, charIndexRef.current + 1));
        charIndexRef.current += 1;
      } else {
        setIsTypingComplete(true);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        onComplete?.();
      }
    };

    // Initial delay before typing starts (shorter if text changed mid-session)
    const isTextChange = prevTextRef.current !== text && prevTextRef.current !== '';
    prevTextRef.current = text;
    
    const startDelay = setTimeout(() => {
      typeNextChar();
      
      intervalRef.current = setInterval(() => {
        typeNextChar();
      }, typingSpeed);
    }, isTextChange ? 100 : 500);

    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, typingSpeed, onComplete, instantDisplay]);

  return (
    <View style={terminalStyles.container}>
      {/* Terminal prompt */}
      <View style={terminalStyles.promptLine}>
        <Text style={terminalStyles.promptSymbol}>{'>'}</Text>
        <Text style={terminalStyles.promptText}>_</Text>
      </View>
      
      {/* Main text with cursor */}
      <View style={terminalStyles.textLine}>
        <Text style={terminalStyles.mainText}>{displayedText}</Text>
        <Text style={[terminalStyles.cursor, { opacity: cursorVisible ? 1 : 0 }]}>
          _
        </Text>
      </View>
      
      {/* Secondary info line (appears after typing) */}
      {isTypingComplete && showSystemReady && (
        <View style={terminalStyles.infoLine}>
          <Text style={terminalStyles.infoText}>SYSTEM READY</Text>
        </View>
      )}
    </View>
  );
}

const terminalStyles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  promptLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  promptSymbol: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4a8a5a',
    fontFamily: 'monospace',
    marginRight: 4,
  },
  promptText: {
    fontSize: 12,
    color: '#3a6a4a',
    fontFamily: 'monospace',
    opacity: 0.6,
  },
  textLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5aba6a',
    fontFamily: 'monospace',
    letterSpacing: 2,
    textShadowColor: '#3a8a4a',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  cursor: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5aba6a',
    fontFamily: 'monospace',
    marginLeft: 2,
    textShadowColor: '#3a8a4a',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  infoLine: {
    marginTop: 12,
  },
  infoText: {
    fontSize: 10,
    color: '#3a6a4a',
    fontFamily: 'monospace',
    letterSpacing: 1,
    opacity: 0.7,
  },
});
