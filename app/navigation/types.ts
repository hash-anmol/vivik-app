import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Welcome: undefined;
  BasicInfo: undefined;
  ProfilePicture: undefined;
  Verification: undefined;
  Interests: undefined;
  ProfileDetails: undefined;
  PhotosUpload: undefined;
  SocialConnect: undefined;
  Auth: undefined;
  Home: undefined;
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> = 
  StackNavigationProp<RootStackParamList, T>;

export type ScreenRouteProp<T extends keyof RootStackParamList> = 
  RouteProp<RootStackParamList, T>; 