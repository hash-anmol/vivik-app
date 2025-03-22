import React, { useState } from 'react';
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
import * as ImagePicker from 'expo-image-picker';
import { ScreenNavigationProp } from '../../navigation/types';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Button from '../../components/Button';
import { useOnboarding } from '../../context/OnboardingContext';

const ProfilePictureScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp<'ProfilePicture'>>();
  const { userData, updateUserData } = useOnboarding();
  
  const [image, setImage] = useState<string | null>(userData.profilePicture);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleImagePick = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'We need access to your photos to set your profile picture.'
        );
        return;
      }
      
      setLoading(true);
      
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error picking your image.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    // Validate
    if (!image) {
      Alert.alert(
        'Profile Picture Required',
        'Please upload a clear photo showing your face to continue.'
      );
      return;
    }

    // Save data
    updateUserData({
      profilePicture: image,
    });

    // Navigate to next screen
    navigation.navigate('Verification');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Picture</Text>
        <View style={styles.placeholderView} />
      </View>

      <View style={styles.content}>
        <Text style={styles.instruction}>
          Please upload a clear photo showing your face
        </Text>

        <View style={styles.imageContainer}>
          {loading ? (
            <View style={styles.imagePlaceholder}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>No Image Selected</Text>
            </View>
          )}
        </View>

        <Button
          label="Choose from Gallery"
          onPress={handleImagePick}
          containerStyle={styles.galleryButton}
          type="outline"
        />
      </View>

      <View style={styles.footer}>
        <Button 
          label="Continue"
          onPress={handleContinue}
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
  galleryButton: {
    marginBottom: SIZES.padding,
  },
  footer: {
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
});

export default ProfilePictureScreen;
