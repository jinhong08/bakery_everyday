import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StarIcon } from 'react-native-heroicons/mini';

import { Colors } from '@/constants/color';
import { Product } from '@/domain/product';
import CustomImage from '@/components/CustomImage';
import SizedBox from '@/components/SizedBox';

interface ProductItemProps {
  product: Product;
  onPress?: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onPress = () => {},
}) => {
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
        imageUrl={product.image?.url}
        width={78}
        height={78}
      />

      <SizedBox width={20} />

      <View style={styles.infoContainer}>
        <View style={[styles.rowContainer, styles.infoTopContainer]}>
          <Text style={styles.product}>{product.name} 패키지</Text>

          <View style={styles.rowContainer}>
            <StarIcon size={16} color={Colors.primary} />

            <SizedBox width={4} />

            <Text style={styles.score}>{product.score.toFixed(1)}</Text>
          </View>
        </View>

        <SizedBox height={8} />

        <Text style={styles.store}>{product.store.name}</Text>
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
  infoTopContainer: {
    justifyContent: 'space-between',
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

export default ProductItem;
