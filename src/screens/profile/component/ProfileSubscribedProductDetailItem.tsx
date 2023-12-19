import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import { Product } from '@/domain/product';
import { Colors } from '@/constants/color';
import {
  ProfileNavigations,
  ProfileStackParamProps,
} from '@/navigations/stack/profile';
import CustomImage from '@/components/CustomImage';
import SizedBox from '@/components/SizedBox';
import { StoreDetailNavigations } from '@/navigations/stack/store';
import { HAS_REVIEW } from '@/operations/review/query/HasReview';
import Conditional from '@/hocs/Conditional';
import SubscribeItemMenuModal from '@/screens/profile/component/modal/SubscribeItemMenuModal';

type navigationProp =
  ProfileStackParamProps<ProfileNavigations.Home>['navigation'];

interface ProfileSubscribedProductDetailItemProps {
  product: Product;
}

const ProfileSubscribedProductDetailItem: React.FC<
  ProfileSubscribedProductDetailItemProps
> = ({ product }) => {
  const navigation = useNavigation<navigationProp>();

  const [hasReview, { data }] = HAS_REVIEW({
    variables: { productId: product.id },
    fetchPolicy: 'cache-first',
  });

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    hasReview();
  }, []);

  const handleMenu = useCallback(() => {
    setOpen(true);
  }, []);

  const handleReview = useCallback(() => {
    navigation.dispatch(
      CommonActions.navigate(ProfileNavigations.Store, {
        initial: true,
        screen: StoreDetailNavigations.CreateReview,
        params: {
          productId: product.id,
        },
      })
    );
  }, [navigation, product.id]);

  return (
    <View style={styles.container}>
      <CustomImage
        style={styles.image}
        imageUrl={product.image?.url}
        width={80}
        height={80}
      />

      <SizedBox width={10} />

      <View style={styles.flexContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.store}>{product.store.name}</Text>

          <TouchableOpacity onPress={handleMenu} activeOpacity={0.8}>
            <Entypo name="dots-three-vertical" size={13} color="black" />
          </TouchableOpacity>
        </View>

        <SizedBox height={6} />

        <Text style={styles.product}>{product.name}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.price}>{product.price.toLocaleString()} 원</Text>

          <Conditional condition={data?.hasReview === false}>
            <TouchableOpacity
              style={styles.reviewContainer}
              onPress={handleReview}
              activeOpacity={0.8}
            >
              <Text style={styles.review}>리뷰 작성</Text>

              <Entypo
                name="chevron-small-right"
                size={24}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </Conditional>
        </View>
      </View>

      <SubscribeItemMenuModal open={open} setOpen={setOpen} product={product} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  image: {
    borderRadius: 5,
  },
  flexContainer: {
    flex: 1,
  },
  store: {
    fontWeight: '600',
    fontSize: 15,
    color: Colors.black,
  },
  product: {
    fontWeight: '400',
    fontSize: 13,
    color: Colors.darkGray,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: '400',
    fontSize: 13,
    color: Colors.black,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  review: {
    fontWeight: '600',
    fontSize: 13,
    color: Colors.primary,
  },
});

export default ProfileSubscribedProductDetailItem;
