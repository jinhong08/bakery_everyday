import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface SizedBoxProps {
  width?: number;
  height?: number;
}

const SizedBox: React.FC<SizedBoxProps> = ({ width = 0, height = 0 }) => {
  const style = useMemo<StyleProp<ViewStyle>>(
    () => ({
      width,
      height,
    }),
    [width, height]
  );

  return <View style={style} />;
};

export default SizedBox;
