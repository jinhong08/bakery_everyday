import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Store } from '@/domain/store';
import CustomImage from '@/components/CustomImage';
import SizedBox from '@/components/SizedBox';
import { Colors } from '@/constants/color';

interface StoreItemProps {
  store: Store;
  onPress?: () => void;
}

const StoreItem: React.FC<StoreItemProps> = ({ store, onPress = () => {} }) => {
  const handleOnPress = useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <TouchableOpacity
      style={[styles.container, styles.rowContainer]}
      onPress={handleOnPress}
      activeOpacity={0.8}
    >
      <CustomImage
        style={styles.image}
        imageUrl={store.image?.url}
        width={78}
        height={78}
      />

      <SizedBox width={20} />

      <View style={styles.infoContainer}>
        <Text style={styles.product}>{store.name}</Text>

        <SizedBox height={8} />

        <Text style={styles.store}>{store.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  image: {
    borderRadius: 6,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  product: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.darkGray,
  },
  score: {
    fontWeight: '300',
    fontSize: 16,
    color: Colors.black,
  },
  store: {
    fontWeight: '500',
    fontSize: 16,
    color: Colors.black,
  },
});

export default StoreItem;
