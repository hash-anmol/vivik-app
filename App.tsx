import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import navigation
import AppNavigator from './app/navigation/AppNavigator';

// Import context
import { OnboardingProvider } from './app/context/OnboardingContext';
import { UserDataProvider } from './app/context/UserDataContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // No assets to preload for now
      } catch (e) {
        console.warn('Error loading assets:', e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OnboardingProvider>
        <UserDataProvider>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <AppNavigator />
          </View>
        </UserDataProvider>
      </OnboardingProvider>
    </GestureHandlerRootView>
  );
}
