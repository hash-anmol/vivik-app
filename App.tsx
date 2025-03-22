import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, images, etc.
        await Asset.loadAsync([require('./assets/vivik_logo.png')]);
        // Remove artificial delay
      } catch (e) {
        console.warn(e);
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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Image 
        source={require('./assets/vivik_logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Hello World</Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '70%',
    height: '30%',
    marginBottom: 20,
  },
  text: {
    color: 'black',
    fontSize: 24,
  },
});
