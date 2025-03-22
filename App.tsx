import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time for the splash screen
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show splash screen for 2 seconds
  }, []);

  // Splash Screen
  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Image 
          source={require('./assets/vivik_logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <StatusBar style="light" />
      </View>
    );
  }

  // Main Screen (after splash)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#0047AB', // Rich blue color
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '70%',
    height: '70%',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});
