import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://gthvlvrtpfcixxyuvhgw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aHZsdnJ0cGZjaXh4eXV2aGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MzU1OTUsImV4cCI6MjA1NzUxMTU5NX0.1BESxKDxwrth2NxWJDNYttwvZNe3i2muaYF6wRlmZLk';

// SecureStore adapter for AsyncStorage
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

// Create Supabase client
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
); 