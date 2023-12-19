import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

import { Colors } from '@/constants/color';

interface MultiImageSelectorModalPreviewHeaderItemProps {
  asset: MediaLibrary.Asset;
  select: (asset: MediaLibrary.Asset) => void;
}

const MultiImageSelectorModalPreviewHeaderItem: React.FC<
  MultiImageSelectorModalPreviewHeaderItemProps
> = ({ asset, select }) => {
  const handleOnPress = useCallback(() => {
    select(asset);
  }, [select, asset]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: asset.uri }}
        resizeMode="cover"
      />

      <TouchableOpacity
        style={styles.sequenceTouchContainer}
        onPress={handleOnPress}
        activeOpacity={0.8}
      >
        <View style={styles.sequenceContainer}>
          <Feather name="x" size={12} color={Colors.black} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 66,
    height: 66,
    marginLeft: 8,
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  sequenceTouchContainer: {
    position: 'absolute',
    top: -4,
    right: 0,
  },
  sequenceContainer: {
    width: 18,
    height: 18,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
  },
});

export default React.memo(
  MultiImageSelectorModalPreviewHeaderItem,
  (prevProps, nextProps) => prevProps.asset.uri === nextProps.asset.uri
);
