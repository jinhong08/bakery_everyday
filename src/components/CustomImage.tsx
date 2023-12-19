import React, { useMemo } from 'react';
import {
  Image,
  ImageResizeMode,
  ImageStyle,
  StyleSheet,
  View,
} from 'react-native';
import Conditional from '@/hocs/Conditional';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/color';

interface CustomImageProps {
  imageUrl: string | null | undefined;
  width: number | string;
  height: number | string;
  resizeMode?: ImageResizeMode;
  style?: ImageStyle;
}

const CustomImage: React.FC<CustomImageProps> = ({
  imageUrl,
  width,
  height,
  resizeMode = 'cover',
  style,
}) => {
  const imageStyle = useMemo<ImageStyle>(
    () => ({
      width,
      height,
    }),
    [width, height]
  );

  return (
    <>
      <Conditional condition={imageUrl === null || imageUrl === undefined}>
        <View style={[styles.empty, imageStyle, style]}>
          <Feather name="image" size={30} color="rgba(0,0,0,0.15)" />
        </View>
      </Conditional>

      <Conditional condition={imageUrl !== null && imageUrl !== undefined}>
        <Image
          style={[imageStyle, style]}
          source={{ uri: imageUrl as string }}
          resizeMode={resizeMode}
        />
      </Conditional>
    </>
  );
};

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
  },
});

export default CustomImage;
