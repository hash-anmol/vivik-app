import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenNavigationProp } from '../../navigation/types';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useOnboarding } from '../../context/OnboardingContext';

const SocialConnectScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp<'SocialConnect'>>();
  const { userData, updateUserData } = useOnboarding();
  
  const [instagram, setInstagram] = useState(userData.socialMedia?.instagram || '');
  const [twitter, setTwitter] = useState(userData.socialMedia?.twitter || '');
  const [linkedin, setLinkedin] = useState(userData.socialMedia?.linkedin || '');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    // Save data
    updateUserData({
      socialMedia: {
        instagram: instagram.trim(),
        twitter: twitter.trim(),
        linkedin: linkedin.trim(),
      },
    });

    // Navigate to next screen
    navigation.navigate('Auth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Social Media</Text>
        <View style={styles.placeholderView} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.instruction}>
          Connect your social media accounts (optional)
        </Text>

        <View style={styles.socialInputContainer}>
          <View style={styles.socialIconContainer}>
            <MaterialIcons name="camera-alt" size={24} color="#E1306C" />
          </View>
          <TextInput
            label="Instagram Username"
            placeholder="@yourusername"
            value={instagram}
            onChangeText={setInstagram}
            containerStyle={styles.inputContainer}
          />
        </View>

        <View style={styles.socialInputContainer}>
          <View style={styles.socialIconContainer}>
            <MaterialIcons name="alternate-email" size={24} color="#1DA1F2" />
          </View>
          <TextInput
            label="X (Twitter) Handle"
            placeholder="@yourusername"
            value={twitter}
            onChangeText={setTwitter}
            containerStyle={styles.inputContainer}
          />
        </View>

        <View style={styles.socialInputContainer}>
          <View style={styles.socialIconContainer}>
            <MaterialIcons name="business-center" size={24} color="#0A66C2" />
          </View>
          <TextInput
            label="LinkedIn URL"
            placeholder="linkedin.com/in/yourprofile"
            value={linkedin}
            onChangeText={setLinkedin}
            containerStyle={styles.inputContainer}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          label="Continue"
          onPress={handleContinue}
        />
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleContinue}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
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
  instruction: {
    ...FONTS.body1,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
  },
  socialInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SIZES.padding,
  },
  socialIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.base,
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
  },
  footer: {
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: SIZES.padding,
  },
  skipButtonText: {
    ...FONTS.body3,
    color: COLORS.gray,
    textDecorationLine: 'underline',
  },
});

export default SocialConnectScreen; 