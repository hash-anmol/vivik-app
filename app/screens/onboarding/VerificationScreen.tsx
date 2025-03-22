import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { ScreenNavigationProp } from '../../navigation/types';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Button from '../../components/Button';
import { useOnboarding } from '../../context/OnboardingContext';

const VerificationScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp<'Verification'>>();
  const { userData, updateUserData } = useOnboarding();
  
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, setMediaPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(userData.verificationPhoto);
  const [loading, setLoading] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  
  const cameraRef = useRef<any>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const startCamera = async () => {
    try {
      if (!cameraPermission?.granted) {
        await requestCameraPermission();
      }
      
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      setMediaPermission(mediaStatus === 'granted');
      
      if (!cameraPermission?.granted || mediaStatus !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'We need camera and media library access to verify your identity.'
        );
        return;
      }
      
      setShowCamera(true);
    } catch (error) {
      console.error('Error requesting permissions:', error);
      Alert.alert('Error', 'Could not access camera');
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      setLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
        });
        setPhoto(photo.uri);
        setShowCamera(false);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take a picture');
      } finally {
        setLoading(false);
      }
    }
  };

  const verifyFaceMatch = () => {
    // In a real app, you would send the photos to your backend/API for verification
    // For this demo, we'll simulate a match
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Verification Successful',
        'Your identity has been verified successfully.',
        [
          { 
            text: 'Continue', 
            onPress: () => {
              updateUserData({
                verificationPhoto: photo,
              });
              navigation.navigate('Interests');
            } 
          },
        ]
      );
    }, 2000);
  };

  const handleManualVerification = () => {
    // For this demo, we'll just proceed
    updateUserData({
      verificationPhoto: photo,
    });
    navigation.navigate('Interests');
  };

  const handleContinue = () => {
    // Validate
    if (!photo) {
      Alert.alert(
        'Verification Required',
        'Please take a selfie to verify your identity.'
      );
      return;
    }

    // Start verification process
    verifyFaceMatch();
  };

  if (showCamera) {
    return (
      <SafeAreaView style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          facing="front"
          style={styles.camera}
          onCameraReady={() => setIsCameraReady(true)}
        >
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraControls}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowCamera(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.captureButton}
                onPress={takePicture}
                disabled={!isCameraReady || loading}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <View style={styles.captureButtonInner} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification</Text>
        <View style={styles.placeholderView} />
      </View>

      <View style={styles.content}>
        <Text style={styles.instruction}>
          Please take a selfie to verify your identity
        </Text>

        <View style={styles.imageContainer}>
          {loading ? (
            <View style={styles.imagePlaceholder}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : photo ? (
            <Image source={{ uri: photo }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>No Photo Taken</Text>
            </View>
          )}
        </View>

        <Button
          label="Take Selfie"
          onPress={startCamera}
          containerStyle={styles.cameraButton}
          type="outline"
        />

        {photo && (
          <TouchableOpacity 
            onPress={handleManualVerification}
            style={styles.skipButton}
          >
            <Text style={styles.skipButtonText}>
              Skip verification (manual review)
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <Button 
          label="Continue"
          onPress={handleContinue}
          disabled={!photo}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  instruction: {
    ...FONTS.body1,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
  },
  imageContainer: {
    marginBottom: SIZES.padding * 2,
  },
  image: {
    width: SIZES.width * 0.7,
    height: SIZES.width * 0.7,
    borderRadius: (SIZES.width * 0.7) / 2,
  },
  imagePlaceholder: {
    width: SIZES.width * 0.7,
    height: SIZES.width * 0.7,
    borderRadius: (SIZES.width * 0.7) / 2,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    ...FONTS.body2,
    color: COLORS.gray,
  },
  cameraButton: {
    marginBottom: SIZES.padding,
  },
  skipButton: {
    padding: SIZES.base,
  },
  skipButtonText: {
    ...FONTS.body3,
    color: COLORS.gray,
    textDecorationLine: 'underline',
  },
  footer: {
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
    position: 'relative',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
  },
  cancelButton: {
    position: 'absolute',
    left: SIZES.padding,
    bottom: 15,
  },
  cancelButtonText: {
    ...FONTS.body2,
    color: COLORS.white,
  },
});

export default VerificationScreen; 