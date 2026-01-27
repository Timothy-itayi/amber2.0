import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TerminalTextProps {
  text?: string;
  typingSpeed?: number;
  cursorBlinkSpeed?: number;
  onComplete?: () => void;
}

export default function TerminalText({
  text = 'WELCOME TO AMBER',
  typingSpeed = 100,
  cursorBlinkSpeed = 530,
  onComplete,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const charIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cursor blink using simple state toggle (more reliable)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, cursorBlinkSpeed / 2);

    return () => clearInterval(blinkInterval);
  }, [cursorBlinkSpeed]);

  // Typewriter effect
  useEffect(() => {
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

    // Initial delay before typing starts
    const startDelay = setTimeout(() => {
      typeNextChar();
      
      intervalRef.current = setInterval(() => {
        typeNextChar();
      }, typingSpeed);
    }, 500);

    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, typingSpeed, onComplete]);

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
      {isTypingComplete && (
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
