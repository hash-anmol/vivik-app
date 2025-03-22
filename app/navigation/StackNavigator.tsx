import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import BasicInfoScreen from '../screens/onboarding/BasicInfoScreen';
import ProfilePictureScreen from '../screens/onboarding/ProfilePictureScreen';
import VerificationScreen from '../screens/onboarding/VerificationScreen';
import InterestsScreen from '../screens/onboarding/InterestsScreen';
import ProfileDetailsScreen from '../screens/onboarding/ProfileDetailsScreen';
import PhotosUploadScreen from '../screens/onboarding/PhotosUploadScreen';
import SocialConnectScreen from '../screens/onboarding/SocialConnectScreen';
import AuthScreen from '../screens/onboarding/AuthScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
      <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="Interests" component={InterestsScreen} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
      <Stack.Screen name="PhotosUpload" component={PhotosUploadScreen} />
      <Stack.Screen name="SocialConnect" component={SocialConnectScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator; 