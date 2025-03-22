import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/vivik_logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Hello World</Text>
      <StatusBar style="dark" />
    </View>
  );
};

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

export default HomeScreen; 