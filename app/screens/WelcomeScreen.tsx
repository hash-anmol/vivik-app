import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../navigation/types';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Button from '../components/Button';

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp<'Welcome'>>();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('BasicInfo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.contentContainer, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>V</Text>
        </View>
        
        <Text style={styles.appName}>Vivik</Text>
        
        <Text style={styles.tagline}>
          Find and connect with people who share your interests
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button 
            label="Get Started"
            onPress={handleGetStarted}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  logoPlaceholder: {
    width: SIZES.width * 0.6,
    height: SIZES.width * 0.6,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.padding,
  },
  logoText: {
    fontSize: SIZES.width * 0.3,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  appName: {
    ...FONTS.h1,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SIZES.base,
  },
  tagline: {
    ...FONTS.body1,
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: SIZES.padding * 2,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: SIZES.padding,
  },
});

export default WelcomeScreen; 