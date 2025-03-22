import React, { createContext, useState, useContext } from 'react';
import { ImageSourcePropType } from 'react-native';
import { INTEREST_CATEGORIES } from '../constants/data';

// Define types for our onboarding data
interface UserData {
  fullName: string;
  birthDate: Date | null;
  gender: 'Male' | 'Female' | null;
  profilePicture: string | null;
  verificationPhoto: string | null;
  interests: string[];
  bio: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  photos: {
    uri: string;
    caption?: string;
  }[];
  socialMedia: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  email?: string;
}

// Initial state for onboarding
const initialState: UserData = {
  fullName: '',
  birthDate: null,
  gender: null,
  profilePicture: null,
  verificationPhoto: null,
  interests: [],
  bio: '',
  location: null,
  photos: [],
  socialMedia: {},
};

// Create context
interface OnboardingContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  resetUserData: () => void;
  completeOnboarding: (finalData: UserData) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Create provider component
export const OnboardingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(initialState);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prevState => ({
      ...prevState,
      ...data,
    }));
  };

  const resetUserData = () => {
    setUserData(initialState);
  };

  const completeOnboarding = (finalData: UserData) => {
    // Here we would typically send the data to an API
    // For now, we'll just store it locally and reset for demo purposes
    console.log('Onboarding completed with data:', finalData);
    
    // In a real app, you would store the user data in a more persistent storage
    // For example: AsyncStorage.setItem('userData', JSON.stringify(finalData));
    
    // For this demo, we'll just reset the state
    setUserData(initialState);
  };

  return (
    <OnboardingContext.Provider value={{ 
      userData, 
      updateUserData, 
      resetUserData,
      completeOnboarding 
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Create custom hook to use the context
export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  
  return context;
}; 