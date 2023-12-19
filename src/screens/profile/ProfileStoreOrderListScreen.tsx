import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import _ from 'lodash';

import { mainBottomNavigationVisibleVar } from '@/stores/common';
import { GET_ORDERS_WITH_STORE } from '@/operations/order/query/GetOrdersWithStore';
import { Order } from '@/domain/order';
import {
  ProfileNavigations,
  ProfileStackParamProps,
} from '@/navigations/stack/profile';
import ProfileStoreOrderItem from '@/screens/profile/component/ProfileStoreOrderItem';

export const ProfileStoreOrderListScreenOptions: StackNavigationOptions = {
  title: '주문 조회',
};

interface ProfileStoreOrderListScreenProps {
  route: ProfileStackParamProps<ProfileNavigations.StoreOrderList>['route'];
}

const ProfileStoreOrderListScreen: React.FC<
  ProfileStoreOrderListScreenProps
> = ({ route }) => {
  useFocusEffect(() => {
    mainBottomNavigationVisibleVar(false);
  });

  const [getOrdersWithStore, { data, fetchMore }] = GET_ORDERS_WITH_STORE();

  useEffect(() => {
    getOrdersWithStore({
      variables: {
        storeId: route.params.storeId,
        page: 1,
        take: 10,
      },
    });
  }, [route.params.storeId]);

  const keyExtractor = useCallback((item: Order) => item.id, []);

  const renderItem = useCallback<ListRenderItem<Order>>(
    ({ item }) => <ProfileStoreOrderItem order={item} />,
    []
  );

  const onEndReached = useCallback(() => {
    if (data?.ordersWithStore.length % 10 === 0) {
      fetchMore({
        variables: {
          storeId: route.params.storeId,
          page: Math.floor(data?.ordersWithStore.length / 10) + 1,
          take: 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => ({
          ordersWithStore: _(prev?.ordersWithStore ?? [])
            .unionBy(fetchMoreResult.ordersWithStore, 'id')
            .orderBy((order) => order.createdAt, ['desc'])
            .value(),
        }),
      });
    }
  }, [route.params.storeId]);

  return (
    <FlatList
      data={data?.ordersWithStore ?? []}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReachedThreshold={10}
      onEndReached={onEndReached}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProfileStoreOrderListScreen;
