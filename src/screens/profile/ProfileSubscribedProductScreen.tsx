import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import _ from 'lodash';

import { mainBottomNavigationVisibleVar } from '@/stores/common';
import { Product } from '@/domain/product';
import ProfileSubscribedProductDetailItem from '@/screens/profile/component/ProfileSubscribedProductDetailItem';
import { GET_ORDERS_WITH_MEMBER } from '@/operations/order/query/GetOrdersWithMember';

export const ProfileSubscribedProductScreenOptions: StackNavigationOptions = {
  title: '구독 중인 패키지',
  headerTitleAlign: 'left',
};

interface ProfileSubscribedProductScreenProps {}

const ProfileSubscribedProductScreen: React.FC<
  ProfileSubscribedProductScreenProps
> = ({}) => {
  useFocusEffect(() => {
    mainBottomNavigationVisibleVar(false);
  });

  const [getOrdersWithMember, { data, fetchMore }] = GET_ORDERS_WITH_MEMBER({
    fetchPolicy: 'cache-and-network',
  });

  const products = useMemo<Product[]>(
    () => (data?.ordersWithMember ?? []).map((it) => it.product),
    [data?.ordersWithMember]
  );

  useEffect(() => {
    getOrdersWithMember({
      variables: {
        page: 1,
        take: 10,
      },
    });
  }, []);

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const renderItem = useCallback<ListRenderItem<Product>>(
    ({ item }) => <ProfileSubscribedProductDetailItem product={item} />,
    []
  );

  const onEndReached = useCallback(() => {
    if (data?.ordersWithMember.length % 10 === 0) {
      fetchMore({
        variables: {
          page: Math.floor(data?.ordersWithMember.length / 10) + 1,
          take: 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => ({
          ordersWithMember: _(prev?.ordersWithMember ?? [])
            .unionBy(fetchMoreResult.ordersWithMember, 'id')
            .orderBy((order) => order.createdAt, ['desc'])
            .value(),
        }),
      });
    }
  }, [data?.ordersWithMember.length]);

  return (
    <FlatList<Product>
      data={products}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReachedThreshold={10}
      onEndReached={onEndReached}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProfileSubscribedProductScreen;
