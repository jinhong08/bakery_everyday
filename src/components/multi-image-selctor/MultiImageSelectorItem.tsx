import React, { useCallback, useMemo } from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/color';

interface MultiImageSelectorItemProps {
  asset: MediaLibrary.Asset;
  setAssets: React.Dispatch<React.SetStateAction<MediaLibrary.Asset[]>>;
  size: number;
}

const MultiImageSelectorItem: React.FC<MultiImageSelectorItemProps> = ({
  asset,
  setAssets,
  size,
}) => {
  const containerSizeStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      width: size + 10,
      height: size + 10,
    }),
    [size]
  );

  const sizeStyle = useMemo<StyleProp<ImageStyle>>(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  const handleOnCancel = useCallback(() => {
    setAssets((assets) => assets.filter((it) => it.id !== asset.id));
  }, [asset.id]);

  return (
    <View style={[styles.container, containerSizeStyle]}>
      <Image style={[styles.image, sizeStyle]} source={{ uri: asset.uri }} />

      <TouchableNativeFeedback onPress={handleOnCancel}>
        <View style={styles.cancelButton}>
          <Feather name="x" size={12} color={Colors.black} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 6,
  },
  cancelButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
  },
});

export default MultiImageSelectorItem;
