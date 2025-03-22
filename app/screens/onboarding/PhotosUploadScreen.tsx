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
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenNavigationProp } from '../../navigation/types';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Button from '../../components/Button';
import { useOnboarding } from '../../context/OnboardingContext';

const MAX_PHOTOS = 4;

interface Photo {
  uri: string;
  caption?: string;
}

const PhotosUploadScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp<'PhotosUpload'>>();
  const { userData, updateUserData } = useOnboarding();
  
  const [photos, setPhotos] = useState<Photo[]>(
    userData.photos || []
  );
  const [loading, setLoading] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [currentCaption, setCurrentCaption] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddPhoto = async (index: number) => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'We need access to your photos to add them to your profile.'
        );
        return;
      }
      
      setLoading(true);
      
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });
      
      if (!result.canceled) {
        const newPhoto: Photo = { uri: result.assets[0].uri };
        
        // If we're replacing a photo, keep its caption
        if (photos[index] && photos[index].caption) {
          newPhoto.caption = photos[index].caption;
        }
        
        const newPhotos = [...photos];
        newPhotos[index] = newPhoto;
        setPhotos(newPhotos);
        
        // Select this photo for caption editing
        handleSelectPhoto(index);
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error picking your image.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePhoto = (index: number) => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to remove this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            const newPhotos = [...photos];
            newPhotos.splice(index, 1);
            setPhotos(newPhotos);
            
            if (selectedPhotoIndex === index) {
              setSelectedPhotoIndex(null);
              setCurrentCaption('');
            }
          }
        },
      ]
    );
  };

  const handleSelectPhoto = (index: number) => {
    setSelectedPhotoIndex(index);
    setCurrentCaption(photos[index]?.caption || '');
  };

  const handleSaveCaption = () => {
    if (selectedPhotoIndex === null) return;
    
    const newPhotos = [...photos];
    newPhotos[selectedPhotoIndex] = {
      ...newPhotos[selectedPhotoIndex],
      caption: currentCaption,
    };
    
    setPhotos(newPhotos);
    setSelectedPhotoIndex(null);
    setCurrentCaption('');
  };

  const handleContinue = () => {
    // Validate
    if (photos.length === 0) {
      Alert.alert(
        'Photos Required',
        'Please add at least one photo to continue.'
      );
      return;
    }

    // Save data
    updateUserData({
      photos,
    });

    // Navigate to next screen
    navigation.navigate('SocialConnect');
  };

  const renderPhotoSlot = (index: number) => {
    const photo = photos[index];
    
    if (photo) {
      return (
        <View style={styles.photoContainer} key={index}>
          <Image source={{ uri: photo.uri }} style={styles.photo} />
          
          <View style={styles.photoOverlay}>
            <TouchableOpacity 
              style={styles.photoAction}
              onPress={() => handleSelectPhoto(index)}
            >
              <MaterialIcons name="edit" size={24} color={COLORS.white} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.photoAction}
              onPress={() => handleRemovePhoto(index)}
            >
              <MaterialIcons name="delete" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          
          {photo.caption && (
            <View style={styles.captionContainer}>
              <Text style={styles.captionText} numberOfLines={1}>
                {photo.caption}
              </Text>
            </View>
          )}
        </View>
      );
    }
    
    return (
      <TouchableOpacity 
        style={styles.addPhotoContainer}
        onPress={() => handleAddPhoto(index)}
        key={index}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          <>
            <MaterialIcons name="add-photo-alternate" size={32} color={COLORS.gray} />
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Photos</Text>
        <View style={styles.placeholderView} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.instruction}>
          Add photos to showcase your personality (minimum 1)
        </Text>

        <View style={styles.photosGrid}>
          {Array.from({ length: MAX_PHOTOS }).map((_, index) => renderPhotoSlot(index))}
        </View>

        {selectedPhotoIndex !== null && (
          <View style={styles.captionEditor}>
            <Text style={styles.captionLabel}>Add a caption to your photo:</Text>
            <TextInput
              style={styles.captionInput}
              value={currentCaption}
              onChangeText={setCurrentCaption}
              placeholder="Write something about this photo..."
              placeholderTextColor={COLORS.gray}
              maxLength={50}
            />
            
            <View style={styles.captionActions}>
              <Button
                label="Cancel"
                onPress={() => {
                  setSelectedPhotoIndex(null);
                  setCurrentCaption('');
                }}
                type="outline"
                containerStyle={{ flex: 1, marginRight: 10 }}
              />
              
              <Button
                label="Save Caption"
                onPress={handleSaveCaption}
                containerStyle={{ flex: 1 }}
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          label="Continue"
          onPress={handleContinue}
          disabled={photos.length === 0}
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
  },
  instruction: {
    ...FONTS.body1,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2,
  },
  photoContainer: {
    width: '48%',
    height: 150,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: SIZES.radius,
  },
  photoAction: {
    marginLeft: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
  },
  captionText: {
    ...FONTS.body3,
    color: COLORS.white,
  },
  addPhotoContainer: {
    width: '48%',
    height: 150,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  addPhotoText: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginTop: SIZES.base,
  },
  captionEditor: {
    backgroundColor: COLORS.lightGray,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding * 2,
  },
  captionLabel: {
    ...FONTS.body2,
    color: COLORS.black,
    marginBottom: SIZES.base,
  },
  captionInput: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    ...FONTS.body2,
    color: COLORS.black,
    marginBottom: SIZES.padding,
  },
  captionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
});

export default PhotosUploadScreen; 