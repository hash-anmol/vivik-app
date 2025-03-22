import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenNavigationProp } from '../../navigation/types';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { INTEREST_CATEGORIES } from '../../constants/data';
import Button from '../../components/Button';
import { useOnboarding } from '../../context/OnboardingContext';

const InterestsScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp<'Interests'>>();
  const { userData, updateUserData } = useOnboarding();
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    userData.interests || []
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleContinue = () => {
    // Validate
    if (selectedInterests.length < 3) {
      Alert.alert(
        'Select More Interests',
        'Please select at least 3 interests to continue.'
      );
      return;
    }

    // Save data
    updateUserData({
      interests: selectedInterests,
    });

    // Navigate to next screen
    navigation.navigate('ProfileDetails');
  };

  const renderInterestItem = ({ item }: { item: typeof INTEREST_CATEGORIES[0] }) => {
    const isSelected = selectedInterests.includes(item.id);
    
    return (
      <TouchableOpacity
        style={[
          styles.interestItem,
          isSelected && styles.selectedInterestItem
        ]}
        onPress={() => toggleInterest(item.id)}
      >
        <MaterialIcons 
          name={item.icon as any} 
          size={24} 
          color={isSelected ? COLORS.white : COLORS.gray} 
        />
        <Text style={[
          styles.interestText,
          isSelected && styles.selectedInterestText
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const countTextColor = selectedInterests.length >= 3 ? COLORS.success : COLORS.gray;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Interests</Text>
        <View style={styles.placeholderView} />
      </View>

      <View style={styles.content}>
        <Text style={styles.instruction}>
          Select at least 3 interests to help us find people with similar activities
        </Text>

        <View style={styles.selectedCount}>
          <Text style={[styles.selectedCountText, { color: countTextColor }]}>
            Selected: {selectedInterests.length}/3 (minimum)
          </Text>
        </View>

        <FlatList
          data={INTEREST_CATEGORIES}
          renderItem={renderInterestItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.interestsList}
        />
      </View>

      <View style={styles.footer}>
        <Button 
          label="Continue"
          onPress={handleContinue}
          disabled={selectedInterests.length < 3}
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
    marginBottom: SIZES.padding,
  },
  selectedCount: {
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  selectedCountText: {
    ...FONTS.body3,
  },
  interestsList: {
    paddingVertical: SIZES.padding,
  },
  interestItem: {
    flex: 1,
    margin: SIZES.base,
    height: 100,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.base,
  },
  selectedInterestItem: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  interestText: {
    ...FONTS.body3,
    color: COLORS.black,
    marginTop: SIZES.base,
    textAlign: 'center',
  },
  selectedInterestText: {
    color: COLORS.white,
  },
  footer: {
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
});

export default InterestsScreen; 