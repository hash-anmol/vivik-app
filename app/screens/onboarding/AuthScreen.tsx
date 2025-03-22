import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../navigation/types';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useOnboarding } from '../../context/OnboardingContext';

const AuthScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp<'Auth'>>();
  const { userData, completeOnboarding } = useOnboarding();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateInputs = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleCreateAccount = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate account creation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add email to user data
      completeOnboarding({
        ...userData,
        email,
      });
      
      // Navigate to home or success screen
      Alert.alert(
        "Account Created",
        "Your account has been created successfully!",
        [
          { 
            text: "Continue to app", 
            onPress: () => {
              // In a real app, this would navigate to the main app screens
              // For now, we'll just reset to the welcome screen
              navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
              });
            } 
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error", "There was an error creating your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={styles.placeholderView} />
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.instruction}>
            Almost done! Set up your login details to create your account
          </Text>
          
          <TextInput
            label="Email"
            placeholder="your.email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            containerStyle={styles.inputContainer}
          />
          
          <TextInput
            label="Password"
            placeholder="Create a secure password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
            containerStyle={styles.inputContainer}
          />
          
          <TextInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
            containerStyle={styles.inputContainer}
          />
          
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </ScrollView>

        <View style={styles.footer}>
          <Button 
            label={isLoading ? "Creating Account..." : "Create Account"}
            onPress={handleCreateAccount}
            disabled={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
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
  inputContainer: {
    marginBottom: SIZES.padding,
  },
  termsText: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding * 2,
  },
  termsLink: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  footer: {
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
});

export default AuthScreen; 