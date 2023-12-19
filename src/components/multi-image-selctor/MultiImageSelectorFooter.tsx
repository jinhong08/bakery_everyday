import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { AntDesign } from '@expo/vector-icons';

import { Colors } from '@/constants/color';

import MultiImageSelectorModal from '@/components/modal/multi-image-selector/MultiImageSelectorModal';

interface MultiImageSelectorFooterProps {
  assets: MediaLibrary.Asset[];
  setAssets: React.Dispatch<React.SetStateAction<MediaLibrary.Asset[]>>;
  size: number;
}

const MultiImageSelectorFooter: React.FC<MultiImageSelectorFooterProps> = ({
  assets,
  setAssets,
  size,
}) => {
  const sizeStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      width: size,
      height: size,
      margin: 5,
    }),
    [size]
  );

  return (
    <MultiImageSelectorModal assets={assets} setAssets={setAssets}>
      <View style={[styles.container, sizeStyle]}>
        <AntDesign name="plus" size={30} color="rgba(0,0,0,0.15)" />
      </View>
    </MultiImageSelectorModal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
  },
});

export default MultiImageSelectorFooter;
