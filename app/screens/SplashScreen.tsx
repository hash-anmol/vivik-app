import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Keep splash screen visible
SplashScreen.preventAutoHideAsync();

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreenComponent: React.FC<SplashScreenProps> = ({ onFinish }) => {
  
  useEffect(() => {
    async function prepare() {
      try {
        // No assets to pre-load for now
      } catch (e) {
        console.warn('Error loading assets:', e);
      } finally {
        // Finish loading
        onFinish();
      }
    }

    prepare();
  }, [onFinish]);

  return null;
};

export default SplashScreenComponent; 