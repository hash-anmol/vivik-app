import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScreenNavigationProp } from '../../navigation/types';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { useOnboarding } from '../../context/OnboardingContext';

const BasicInfoScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp<'BasicInfo'>>();
  const { userData, updateUserData } = useOnboarding();
  
  const [fullName, setFullName] = useState(userData.fullName);
  const [date, setDate] = useState(userData.birthDate || new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState<'Male' | 'Female' | null>(userData.gender);
  const [errors, setErrors] = useState({
    fullName: '',
  });

  const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleDateChange = (_: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    // Validate
    if (!fullName.trim()) {
      setErrors({
        fullName: 'Full name is required'
      });
      return;
    }

    // Save data
    updateUserData({
      fullName,
      birthDate: date,
      gender
    });

    // Navigate to next screen
    navigation.navigate('ProfilePicture');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Basic Information</Text>
        <View style={styles.placeholderView} />
      </View>

      <View style={styles.content}>
        <TextInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
          required={true}
          placeholder="Enter your full name"
          autoCapitalize="words"
        />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Birth Date</Text>
          <TouchableOpacity 
            style={styles.datePicker}
            onPress={showDatepicker}
          >
            <Text style={styles.dateText}>{date ? formatDate(date) : 'Select birth date'}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderOptions}>
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === 'Male' && styles.selectedGender
              ]}
              onPress={() => setGender('Male')}
            >
              <Text style={[
                styles.genderText,
                gender === 'Male' && styles.selectedGenderText
              ]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === 'Female' && styles.selectedGender
              ]}
              onPress={() => setGender('Female')}
            >
              <Text style={[
                styles.genderText,
                gender === 'Female' && styles.selectedGenderText
              ]}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button 
          label="Continue"
          onPress={handleContinue}
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
  inputContainer: {
    marginBottom: SIZES.padding,
  },
  label: {
    ...FONTS.body2,
    color: COLORS.black,
    marginBottom: 8,
  },
  datePicker: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding,
  },
  dateText: {
    ...FONTS.body2,
    color: COLORS.black,
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedGender: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderText: {
    ...FONTS.body2,
    color: COLORS.black,
  },
  selectedGenderText: {
    color: COLORS.white,
  },
  footer: {
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
});

export default BasicInfoScreen; 