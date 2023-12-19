import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { Product } from '@/domain/product';
import { GET_ORDERS_WITH_MEMBER } from '@/operations/order/query/GetOrdersWithMember';
import ProfileSubscribedProductItem from '@/screens/profile/component/ProfileSubscribedProductItem';

interface ProfileSubscribedProductListProps {}

const ProfileSubscribedProductList: React.FC<
  ProfileSubscribedProductListProps
> = ({}) => {
  const [getOrdersWithMember, { data }] = GET_ORDERS_WITH_MEMBER({
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
        take: 5,
      },
    });
  }, []);

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const renderItem = useCallback<ListRenderItem<Product>>(
    ({ item }) => <ProfileSubscribedProductItem product={item} />,
    []
  );

  return (
    <FlatList<Product>
      data={products}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  );
};

export default ProfileSubscribedProductList;
