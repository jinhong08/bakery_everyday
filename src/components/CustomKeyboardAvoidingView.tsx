import React, { FC, ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

interface CustomKeyboardAvoidingViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CustomKeyboardAvoidingView: FC<CustomKeyboardAvoidingViewProps> = ({
  children,
  style,
}) => {
  const headerHeight = useHeaderHeight() || 0;

  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : -1000}
      enabled
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomKeyboardAvoidingView;
