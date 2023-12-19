import React, { useMemo } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Colors } from '@/constants/color';

interface CustomButtonProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onPress = () => {},
  disabled = false,
  style,
  labelStyle,
}) => {
  const buttonColor = useMemo<StyleProp<ViewStyle>>(
    () => ({
      backgroundColor: disabled ? Colors.darkGray : Colors.primary,
    }),
    [disabled]
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={disabled ? 1 : 0.65}>
      <View style={[styles.container, buttonColor, style]}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.white,
  },
});

export default CustomButton;
