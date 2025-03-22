import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoPlaceholder}>
        <Text style={styles.logoText}>V</Text>
      </View>
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
  logoPlaceholder: {
    width: '70%',
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#555',
  },
  text: {
    color: 'black',
    fontSize: 24,
  },
});

export default HomeScreen; 