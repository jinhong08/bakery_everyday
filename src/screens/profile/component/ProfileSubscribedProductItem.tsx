import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { Product } from '@/domain/product';
import {
  ProfileNavigations,
  ProfileStackParamProps,
} from '@/navigations/stack/profile';
import { Colors } from '@/constants/color';
import { StoreDetailNavigations } from '@/navigations/stack/store';
import CustomImage from '@/components/CustomImage';
import SizedBox from '@/components/SizedBox';

type navigationProp =
  ProfileStackParamProps<ProfileNavigations.Home>['navigation'];

interface ProfileSubscribedProductItemProps {
  product: Product;
}

const ProfileSubscribedProductItem: React.FC<
  ProfileSubscribedProductItemProps
> = ({ product }) => {
  const navigation = useNavigation<navigationProp>();

  const handleOnPress = useCallback(() => {
    navigation.dispatch(
      CommonActions.navigate(ProfileNavigations.Store, {
        initial: true,
        screen: StoreDetailNavigations.Product,
        params: {
          productId: product.id,
        },
      })
    );
  }, [navigation, product.id]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOnPress}
      activeOpacity={0.8}
    >
      <CustomImage
        style={styles.image}
        imageUrl={product?.image?.url}
        width={76}
        height={76}
      />

      <SizedBox height={10} />

      <Text style={styles.text}>{product.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 5,
  },
  text: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.darkGray,
  },
});

export default ProfileSubscribedProductItem;
