import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#FF6B6B', // coral/red
  secondary: '#4ECDC4', // teal
  
  white: '#FFFFFF',
  black: '#000000',
  gray: '#868686',
  lightGray: '#F5F5F5',
  
  success: '#4BB543',
  error: '#FF0000',
};

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  
  // Font sizes
  h1: 30,
  h2: 22,
  h3: 18,
  h4: 16,
  body1: 16,
  body2: 14,
  body3: 12,
  
  // App dimensions
  width,
  height,
};

export const FONTS = {
  h1: { fontFamily: 'System', fontSize: SIZES.h1, fontWeight: '700' as const },
  h2: { fontFamily: 'System', fontSize: SIZES.h2, fontWeight: '600' as const },
  h3: { fontFamily: 'System', fontSize: SIZES.h3, fontWeight: '600' as const },
  h4: { fontFamily: 'System', fontSize: SIZES.h4, fontWeight: '600' as const },
  body1: { fontFamily: 'System', fontSize: SIZES.body1, fontWeight: '400' as const },
  body2: { fontFamily: 'System', fontSize: SIZES.body2, fontWeight: '400' as const },
  body3: { fontFamily: 'System', fontSize: SIZES.body3, fontWeight: '400' as const },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme; 