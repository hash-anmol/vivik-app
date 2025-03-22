import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Import screens
import SplashScreenComponent from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Handle splash screen finish
  const onSplashFinish = useCallback(() => {
    setAppIsReady(true);
  }, []);

  // Handle layout for hiding splash screen
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Render splash screen component
  if (!appIsReady) {
    return <SplashScreenComponent onFinish={onSplashFinish} />;
  }

  // Render main app once ready
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <HomeScreen />
    </View>
  );
}
