import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';

// Keep splash screen visible
SplashScreen.preventAutoHideAsync();

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreenComponent: React.FC<SplashScreenProps> = ({ onFinish }) => {
  
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load assets
        await Asset.loadAsync([require('../../assets/vivik_logo.png')]);
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