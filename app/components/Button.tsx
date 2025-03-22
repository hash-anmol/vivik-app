import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  containerStyle,
  textStyle,
  loading = false,
  disabled = false,
  type = 'primary',
  ...rest
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'secondary':
        return {
          backgroundColor: COLORS.secondary,
          borderColor: COLORS.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: COLORS.primary,
          borderWidth: 1,
        };
      case 'primary':
      default:
        return {
          backgroundColor: COLORS.primary,
          borderColor: COLORS.primary,
        };
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'outline':
        return { color: COLORS.primary };
      default:
        return { color: COLORS.white };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getButtonStyle(),
        disabled && styles.disabledContainer,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <Text style={[styles.text, getTextStyle(), textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...FONTS.body1,
    fontWeight: '600',
  },
  disabledContainer: {
    opacity: 0.6,
  },
});

export default Button; 