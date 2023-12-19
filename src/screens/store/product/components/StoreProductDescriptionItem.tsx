import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';

import { File } from '@/domain/file';

const { width: WIDTH } = Dimensions.get('screen');

interface StoreProductDescriptionItemProps {
  description: File;
}

const StoreProductDescriptionItem: React.FC<
  StoreProductDescriptionItemProps
> = ({ description }) => {
  return (
    <Image
      style={styles.image}
      source={{ uri: description.url }}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: WIDTH as number,
  },
});

export default StoreProductDescriptionItem;
