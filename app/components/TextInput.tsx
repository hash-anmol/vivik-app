import React, { useState } from 'react';
import { 
  View, 
  TextInput as RNTextInput, 
  Text, 
  StyleSheet,
  TextInputProps as RNTextInputProps,
  ViewStyle,
  TextStyle
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

interface TextInputProps extends RNTextInputProps {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  required = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, labelStyle]}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      </View>
      <RNTextInput
        style={[
          styles.input,
          isFocused && styles.focusedInput,
          error && styles.errorInput,
          inputStyle
        ]}
        placeholderTextColor={COLORS.gray}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {error && (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: SIZES.padding,
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    ...FONTS.body2,
    color: COLORS.black,
  },
  required: {
    color: COLORS.error,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    color: COLORS.black,
    fontSize: SIZES.body2,
    fontFamily: 'System',
  },
  focusedInput: {
    borderColor: COLORS.primary,
  },
  errorInput: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    marginTop: 4,
    fontSize: SIZES.body3,
    fontFamily: 'System',
  }
});

export default TextInput; 