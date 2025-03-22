import { ImageSourcePropType } from 'react-native';

export interface InterestCategory {
  id: string;
  name: string;
  icon: string; // Icon name (we'll use material icons)
}

export const INTEREST_CATEGORIES: InterestCategory[] = [
  { id: 'food', name: 'Food', icon: 'restaurant' },
  { id: 'cafes', name: 'Cafes', icon: 'local-cafe' },
  { id: 'movie', name: 'Movie', icon: 'movie' },
  { id: 'sports', name: 'Sports', icon: 'sports-basketball' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping-bag' },
  { id: 'photography', name: 'Photography', icon: 'camera-alt' },
  { id: 'startups', name: 'Startups', icon: 'lightbulb' },
  { id: 'concerts', name: 'Concerts', icon: 'music-note' },
  { id: 'travelling', name: 'Travelling', icon: 'flight' },
  { id: 'coding', name: 'Coding', icon: 'code' },
  { id: 'gym', name: 'Gym', icon: 'fitness-center' },
]; 