import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { Colors } from '@/constants/color';

import MultiImageSelectorModalPreviewHeaderItem from '@/components/modal/multi-image-selector/MultiImageSelectorModalPreviewHeaderItem';

interface MultiImageSelectorModalPreviewHeaderProps {
  height: Animated.SharedValue<number>;
  assets: MediaLibrary.Asset[];
  select: (image: MediaLibrary.Asset) => void;
}

const MultiImageSelectorModalPreviewHeader: React.FC<
  MultiImageSelectorModalPreviewHeaderProps
> = ({ height, assets, select }) => {
  const containerStyle = useAnimatedStyle(
    () => ({
      height: withSpring(height.value, { mass: 0.2 }),
    }),
    [height]
  );

  const keyExtractor = useCallback(
    (_, index: number) => `image_preview:${index}`,
    []
  );

  const renderItem = useCallback<ListRenderItem<MediaLibrary.Asset>>(
    ({ item }) => (
      <MultiImageSelectorModalPreviewHeaderItem asset={item} select={select} />
    ),
    []
  );

  return (
    <Animated.View style={containerStyle}>
      <FlatList<MediaLibrary.Asset>
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={assets}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  contentContainer: {
    alignItems: 'center',
  },
});

export default React.memo(MultiImageSelectorModalPreviewHeader);
