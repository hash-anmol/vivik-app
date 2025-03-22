import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { ScreenNavigationProp } from '../../navigation/types';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Button from '../../components/Button';
import { useOnboarding } from '../../context/OnboardingContext';

const ProfileDetailsScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp<'ProfileDetails'>>();
  const { userData, updateUserData } = useOnboarding();
  
  const [bio, setBio] = useState(userData.bio || '');
  const [isLocationEnabled, setIsLocationEnabled] = useState(!!userData.location);
  const [location, setLocation] = useState(userData.location);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [characterCount, setCharacterCount] = useState(bio.length);
  const maxBioLength = 150;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleBioChange = (text: string) => {
    if (text.length <= maxBioLength) {
      setBio(text);
      setCharacterCount(text.length);
    }
  };

  const handleLocationToggle = async (value: boolean) => {
    setIsLocationEnabled(value);
    
    if (value && !location) {
      requestLocationPermission();
    } else if (!value) {
      setLocation(null);
    }
  };

  const requestLocationPermission = async () => {
    try {
      setIsLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'We need location access to help you find people nearby.'
        );
        setIsLocationEnabled(false);
        setIsLoadingLocation(false);
        return;
      }
      
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      setIsLoadingLocation(false);
    } catch (error) {
      console.error('Error requesting location:', error);
      Alert.alert('Error', 'Could not access your location');
      setIsLocationEnabled(false);
      setIsLoadingLocation(false);
    }
  };

  const handleContinue = () => {
    // Validate
    if (!bio.trim()) {
      Alert.alert(
        'Bio Required',
        'Please add a short bio about yourself to continue.'
      );
      return;
    }

    // Save data
    updateUserData({
      bio,
      location: isLocationEnabled ? location : null,
    });

    // Navigate to next screen
    navigation.navigate('PhotosUpload');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Details</Text>
        <View style={styles.placeholderView} />
      </View>

      <View style={styles.content}>
        <View style={styles.bioContainer}>
          <Text style={styles.label}>About You (Bio)</Text>
          <TextInput
            style={styles.bioInput}
            multiline
            placeholder="Share a bit about yourself, your interests, and what kind of people you'd like to meet..."
            placeholderTextColor={COLORS.gray}
            value={bio}
            onChangeText={handleBioChange}
            maxLength={maxBioLength}
          />
          <Text style={styles.characterCount}>
            {characterCount}/{maxBioLength}
          </Text>
        </View>

        <View style={styles.locationContainer}>
          <View style={styles.locationHeader}>
            <Text style={styles.label}>Enable Location</Text>
            <Switch
              value={isLocationEnabled}
              onValueChange={handleLocationToggle}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
          
          <Text style={styles.locationDescription}>
            Enabling location helps you find people with similar interests nearby
          </Text>
          
          {isLoadingLocation && (
            <View style={styles.locationStatus}>
              <ActivityIndicator color={COLORS.primary} size="small" />
              <Text style={styles.locationStatusText}>Getting your location...</Text>
            </View>
          )}
          
          {location && isLocationEnabled && (
            <View style={styles.locationStatus}>
              <Text style={[styles.locationStatusText, { color: COLORS.success }]}>
                Location successfully added
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Button 
          label="Continue"
          onPress={handleContinue}
          disabled={!bio.trim()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: {
    padding: SIZES.base,
  },
  backButtonText: {
    ...FONTS.body2,
    color: COLORS.primary,
  },
  placeholderView: {
    width: 50,
  },
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  content: {
    flex: 1,
    padding: SIZES.padding,
  },
  bioContainer: {
    marginBottom: SIZES.padding * 2,
  },
  label: {
    ...FONTS.body2,
    color: COLORS.black,
    marginBottom: SIZES.base,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    minHeight: 120,
    textAlignVertical: 'top',
    ...FONTS.body2,
    color: COLORS.black,
  },
  characterCount: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'right',
    marginTop: 4,
  },
  locationContainer: {
    marginBottom: SIZES.padding,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  locationDescription: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  locationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.base,
  },
  locationStatusText: {
    ...FONTS.body3,
    color: COLORS.black,
    marginLeft: SIZES.base,
  },
  footer: {
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
});

export default ProfileDetailsScreen; 