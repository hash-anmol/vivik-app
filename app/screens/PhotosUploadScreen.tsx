import React, { useState } from 'react';
import { Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateUserData } from '../context/UserDataContext';
import { ScreenNavigationProp } from '../navigation/types';

const PhotosUploadScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp<'PhotosUpload'>>();
  const [photos, setPhotos] = useState<string[]>([]);

  const handleContinue = () => {
    if (photos.length === 0) {
      Alert.alert(
        "No Photos Added", 
        "Please add at least one photo to continue.",
        [{ text: "OK" }]
      );
      return;
    }

    // Save photos to context
    updateUserData({ photos });

    // Navigate to next screen
    navigation.navigate('SocialConnect');
  };

  return (
    <Button title="Continue" onPress={handleContinue} />
  );
};

export default PhotosUploadScreen; 