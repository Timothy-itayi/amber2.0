import React from 'react';
import { View, StyleSheet } from 'react-native';

// Pixelated eye pattern based on the reference image
// This creates a simplified pixel art representation of an eye
// Colors extracted from the image: blues, teals, oranges, yellows

const EYE_PATTERN = [
  // Row 0 - top edge (orange/yellow)
  '..OOOOYYOO..',
  // Row 1
  '.OOYYBBBYYOO',
  // Row 2
  'OYYBBCCBBYYOO',
  // Row 3
  'YYBCCCCCCBBYY',
  // Row 4 - iris top
  'YBCCIIIIIICBY',
  // Row 5
  'BCIIIIPPIIICB',
  // Row 6 - pupil
  'CIIPPPPPPIIC',
  // Row 7 - pupil center
  'CIPPXXXXPPIC',
  // Row 8 - pupil
  'CIIPPPPPPIIC',
  // Row 9
  'BCIIIIPPIIICB',
  // Row 10 - iris bottom
  'YBCCIIIIIICBY',
  // Row 11
  'YYBCCCCCCBBYY',
  // Row 12
  'OYYBBCCBBYYOO',
  // Row 13
  '.OOYYBBBYYOO',
  // Row 14 - bottom edge
  '..OOOOYYOO..',
];

// Color map for pixel values
const PIXEL_COLORS: Record<string, string> = {
  '.': 'transparent',
  'O': '#e07020', // Orange outer
  'Y': '#d0a020', // Yellow
  'B': '#3060a0', // Blue outer
  'C': '#40a0c0', // Cyan/teal
  'I': '#2050a0', // Iris blue
  'P': '#1030c0', // Pupil blue dark
  'X': '#080818', // Pupil center (near black)
};

interface PixelatedEyeProps {
  size?: number;
  opacity?: number;
}

export default function PixelatedEye({ size = 150, opacity = 1 }: PixelatedEyeProps) {
  const pixelSize = size / 14; // 14 columns max

  return (
    <View style={[styles.container, { width: size, height: size, opacity }]}>  
      {EYE_PATTERN.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.split('').map((pixel, colIndex) => (
            <View
              key={`${rowIndex}-${colIndex}`}
              style={[
                styles.pixel,
                {
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor: PIXEL_COLORS[pixel] || 'transparent',
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  pixel: {
    // Each pixel is a small square
  },
});
