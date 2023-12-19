import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Colors } from '@/constants/color';

import Conditional from '@/hocs/Conditional';

interface CustomInputProps {
  title?: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  props?: TextInputProps;
  editable?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  title = undefined,
  text,
  setText,
  style,
  titleStyle,
  inputStyle,
  props,
  editable = true,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const borderColorStyle = useMemo<StyleProp<TextStyle>>(
    () => ({
      borderBottomWidth: 1,
      borderBottomColor: isFocused ? Colors.primary : Colors.gray,
    }),
    [isFocused]
  );

  const handleOnChangeText = useCallback((text: string) => {
    setText(text);
  }, []);

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Conditional condition={title !== undefined}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </Conditional>

      <Conditional condition={editable}>
        <TextInput
          style={[styles.input, borderColorStyle, inputStyle]}
          value={text}
          onChangeText={handleOnChangeText}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          selectionColor={Colors.primary}
          editable={editable}
          focusable={editable}
          {...props}
        />
      </Conditional>

      <Conditional condition={!editable}>
        <View style={borderColorStyle}>
          <Text style={[styles.input, inputStyle]}>{text}</Text>
        </View>
      </Conditional>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  input: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.black,
    paddingVertical: 8,
    borderBottomWidth: 2,
  },
});

export default CustomInput;
