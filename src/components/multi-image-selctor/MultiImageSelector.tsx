import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import MultiImageSelectorItem from '@/components/multi-image-selctor/MultiImageSelectorItem';
import MultiImageSelectorFooter from '@/components/multi-image-selctor/MultiImageSelectorFooter';

interface MultiImageSelectorProps {
  assets: MediaLibrary.Asset[];
  setAssets: React.Dispatch<React.SetStateAction<MediaLibrary.Asset[]>>;
  size?: number;
}

const MultiImageSelector: React.FC<MultiImageSelectorProps> = ({
  assets,
  setAssets,
  size = 100,
}) => {
  const keyExtractor = useCallback((item: MediaLibrary.Asset) => item.id, []);

  const renderItem = useCallback<ListRenderItem<MediaLibrary.Asset>>(
    ({ item }) => (
      <MultiImageSelectorItem asset={item} setAssets={setAssets} size={size} />
    ),
    [setAssets, size]
  );

  const listFooterComponent = useCallback(
    () => (
      <MultiImageSelectorFooter
        assets={assets}
        setAssets={setAssets}
        size={size}
      />
    ),
    [assets, setAssets, size]
  );

  return (
    <FlatList<MediaLibrary.Asset>
      style={styles.container}
      data={assets}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListFooterComponent={listFooterComponent}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
});

export default MultiImageSelector;
