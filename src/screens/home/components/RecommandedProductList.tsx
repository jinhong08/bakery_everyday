import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { Colors } from '@/constants/color';
import { HomeNavigations, HomeStackParamProps } from '@/navigations/stack/home';
import { GET_ME } from '@/operations/profile/query/GetMe';
import { GET_RECOMMENDED_PRODUCTS } from '@/operations/product/query/GetRecommendedProducts';
import ProductItem from '@/components/product/ProductItem';
import { StoreDetailNavigations } from '@/navigations/stack/store';
import { Product } from '@/domain/product';

type navigationProp = HomeStackParamProps<HomeNavigations.Home>['navigation'];

const RecommendedProductList: React.FC = () => {
  const navigation = useNavigation<navigationProp>();

  const [getMe, { data: meData }] = GET_ME({ fetchPolicy: 'cache-first' });
  const [getRecommendedProducts, { data: recommendedProductsData }] =
    GET_RECOMMENDED_PRODUCTS({ variables: { take: 3 } });

  useEffect(() => {
    getMe();
    getRecommendedProducts();
  }, []);

  const handleOnPress = useCallback(
    (product: Product) => {
      return () =>
        navigation.dispatch(
          CommonActions.navigate(HomeNavigations.Store, {
            initial: true,
            screen: StoreDetailNavigations.Product,
            params: {
              productId: product.id,
            },
          })
        );
    },
    [navigation]
  );

  return (
    <View>
      <Text style={styles.title}>
        {meData?.me?.name ?? ''}님을 위한 추천 패키지
      </Text>

      {(recommendedProductsData?.recommendedProducts ?? []).map((item) => (
        <ProductItem
          key={item.id}
          product={item}
          onPress={handleOnPress(item)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.black,
    paddingHorizontal: 20,
  },
});

export default RecommendedProductList;
