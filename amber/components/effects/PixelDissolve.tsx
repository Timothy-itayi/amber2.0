import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

interface PixelDissolveOverlayProps {
  active: boolean;
  duration?: number;
  pixelSize?: number;
  onComplete?: () => void;
}

/**
 * PixelDissolveOverlay - Pure overlay mask for pixel dissolve effect
 * 
 * This component ONLY renders the pixel mask overlay.
 * It does NOT wrap or affect children in any way.
 * Place this as a sibling ON TOP of the content you want to dissolve.
 * 
 * Usage:
 *   <View style={{ flex: 1 }}>
 *     <YourContent />
 *     <PixelDissolveOverlay active={isDissolving} onComplete={handleComplete} />
 *   </View>
 */
export default function PixelDissolveOverlay({
  active,
  duration = 2500,
  pixelSize = 16,  // Smaller pixels = denser effect (~1000 pixels on screen)
  onComplete,
}: PixelDissolveOverlayProps) {
  const { width, height } = Dimensions.get('window');
  const cols = Math.ceil(width / pixelSize);
  const rows = Math.ceil(height / pixelSize);
  
  const progress = useSharedValue(0);
  const blackOverlayOpacity = useSharedValue(0);
  const isCompleteRef = useSharedValue(false);

  // Pre-calculate pixel thresholds (only once, stable reference)
  const pixelData = useMemo(() => {
    const centerX = cols / 2;
    const centerY = rows / 2;
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
    
    const pixels: Array<{
      id: number;
      col: number;
      row: number;
      threshold: number;
    }> = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const dx = col - centerX;
        const dy = row - centerY;
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);
        const normalizedDist = distFromCenter / maxDist;
        
        // Add organic noise
        const noise = (Math.random() - 0.5) * 0.18;
        const threshold = Math.max(0, Math.min(0.98, normalizedDist + noise));
        
        pixels.push({
          id: row * cols + col,
          col,
          row,
          threshold,
        });
      }
    }

    return pixels;
  }, [cols, rows]);

  const handleComplete = () => {
    onComplete?.();
  };

  useEffect(() => {
    if (active) {
      isCompleteRef.value = false;
      progress.value = 0;
      blackOverlayOpacity.value = 0;
      
      // Animate progress from 0 to 1
      progress.value = withTiming(1, {
        duration,
        easing: Easing.inOut(Easing.cubic),
      }, (finished) => {
        if (finished && !isCompleteRef.value) {
          // Fade to solid black
          blackOverlayOpacity.value = withTiming(1, {
            duration: 300,
          }, (fadeFinished) => {
            if (fadeFinished) {
              isCompleteRef.value = true;
              runOnJS(handleComplete)();
            }
          });
        }
      });
    } else {
      progress.value = 0;
      blackOverlayOpacity.value = 0;
    }
  }, [active, duration]);

  const blackOverlayStyle = useAnimatedStyle(() => ({
    opacity: blackOverlayOpacity.value,
  }));

  // Don't render anything when not active
  if (!active) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents="none">
      {/* Individual pixel blocks */}
      {pixelData.map((pixel) => (
        <PixelBlock
          key={pixel.id}
          col={pixel.col}
          row={pixel.row}
          threshold={pixel.threshold}
          pixelSize={pixelSize}
          progress={progress}
        />
      ))}

      {/* Final solid black overlay */}
      <Animated.View
        style={[styles.blackOverlay, blackOverlayStyle]}
      />
    </View>
  );
}

interface PixelBlockProps {
  col: number;
  row: number;
  threshold: number;
  pixelSize: number;
  progress: Animated.SharedValue<number>;
}

/**
 * Individual pixel block - opacity driven by shared value on UI thread
 */
const PixelBlock = React.memo(function PixelBlock({ 
  col, 
  row, 
  threshold, 
  pixelSize, 
  progress 
}: PixelBlockProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = progress.value > threshold ? 1 : 0;
    return { opacity };
  });

  return (
    <Animated.View
      style={[
        styles.pixelBlock,
        {
          width: pixelSize,
          height: pixelSize,
          left: col * pixelSize,
          top: row * pixelSize,
        },
        animatedStyle,
      ]}
    />
  );
});

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  pixelBlock: {
    position: 'absolute',
    backgroundColor: '#000000',
  },
  blackOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
});
