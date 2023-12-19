import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

import {
  ProductTopTabNavigation,
  ProductTopTabParamProps,
} from '@/navigations/tab/product';
import { GET_REVIEWS } from '@/operations/review/query/GetReviews';
import { productDetailHeaderHeightVar } from '@/stores/product';
import { Colors } from '@/constants/color';
import { Review } from '@/domain/review';

import StoreProductReviewItem from '@/screens/store/product/components/StoreProductReviewItem';
import { GET_PRODUCT } from '@/operations/product/query/GetProduct';
import StoreProductReviewHeader from '@/screens/store/product/components/StoreProductReviewHeader';

export const StoreProductReviewScreenOptions: MaterialTopTabNavigationOptions =
  {
    title: '리뷰',
  };

interface StoreProductReviewScreenProps {
  route: ProductTopTabParamProps<ProductTopTabNavigation.Review>['route'];
}

const StoreProductReviewScreen: React.FC<StoreProductReviewScreenProps> = ({
  route,
}) => {
  const [getProduct, { data }] = GET_PRODUCT({
    fetchPolicy: 'cache-only',
    variables: {
      productId: route.params.productId,
    },
  });
  const [getReviews, { data: reviewData }] = GET_REVIEWS({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    getProduct();
    getReviews({
      variables: {
        productId: route.params.productId,
        page: 1,
        take: 10,
      },
    });
  }, [route.params.productId]);

  const keyExtractor = useCallback((item: Review) => item.id, []);

  const renderItem = useCallback<ListRenderItem<Review>>(
    ({ item }) => <StoreProductReviewItem review={item} />,
    []
  );

  const listHeaderComponent = useCallback(
    () => (
      <StoreProductReviewHeader
        score={data?.product?.score}
        total={reviewData?.reviews?.totalElement}
      />
    ),
    [data?.product?.score, reviewData?.reviews?.totalElement]
  );

  const handleOnScrollEndDrag = useCallback((event) => {
    if (event.nativeEvent.contentOffset.y <= 0) {
      productDetailHeaderHeightVar(1);
    }
  }, []);

  const handleOnScrollBeginDrag = useCallback((event) => {
    if (event.nativeEvent.contentOffset.y >= 0) {
      productDetailHeaderHeightVar(0);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList<Review>
        style={styles.container}
        data={reviewData?.reviews?.content ?? []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        onScrollEndDrag={handleOnScrollEndDrag}
        onScrollBeginDrag={handleOnScrollBeginDrag}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default StoreProductReviewScreen;
