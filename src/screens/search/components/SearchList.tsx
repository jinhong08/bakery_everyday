import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Store } from '@/domain/store';
import { GET_STORES } from '@/operations/store/query/GetStores';
import {
  SearchNavigations,
  SearchStackParamProps,
} from '@/navigations/stack/search';
import StoreItem from '@/components/store/StoreItem';
import _ from 'lodash';

type navigationProp =
  SearchStackParamProps<SearchNavigations.Home>['navigation'];

interface SearchListProps {
  search: string;
}

const SearchList: React.FC<SearchListProps> = ({ search }) => {
  const navigation = useNavigation<navigationProp>();

  const [getStores, { data, fetchMore }] = GET_STORES();

  useEffect(() => {
    getStores({
      variables: {
        search,
        page: 1,
        take: 10,
      },
    });
  }, [search]);

  const handleOnPress = useCallback(
    (store: Store) => {
      return () =>
        navigation.push(SearchNavigations.Store, { storeId: store.id });
    },
    [navigation]
  );

  const keyExtractor = useCallback((item: Store) => item.id, []);

  const renderItem = useCallback<ListRenderItem<Store>>(
    ({ item }) => <StoreItem store={item} onPress={handleOnPress(item)} />,
    [handleOnPress]
  );

  const onEndReached = useCallback(() => {
    if (data?.stores?.length % 10 === 0) {
      fetchMore({
        variables: {
          search,
          page: Math.floor(data?.stores?.length / 10) + 1,
          take: 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => ({
          stores: _(prev?.stores ?? [])
            .unionBy(fetchMoreResult?.stores, 'id')
            .orderBy((item) => item.createdAt, ['desc'])
            .value(),
        }),
      });
    }
  }, [data?.stores?.length]);

  return (
    <FlatList<Store>
      data={data?.stores ?? []}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReachedThreshold={10}
      onEndReached={onEndReached}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SearchList;
