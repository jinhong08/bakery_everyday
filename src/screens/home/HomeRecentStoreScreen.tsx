import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

import { mainBottomNavigationVisibleVar } from '@/stores/common';
import { HomeNavigations, HomeStackParamProps } from '@/navigations/stack/home';
import { GET_STORES } from '@/operations/store/query/GetStores';
import { Store } from '@/domain/store';
import StoreItem from '@/components/store/StoreItem';
import _ from 'lodash';

export const HomeRecentStoreScreenOptions: StackNavigationOptions = {
  title: '최신 베이커리',
  headerTitleAlign: 'left',
};

interface HomeRecentStoreScreenProps {
  navigation: HomeStackParamProps<HomeNavigations.RecentStore>['navigation'];
}

const HomeRecentStoreScreen: React.FC<HomeRecentStoreScreenProps> = ({
  navigation,
}) => {
  useFocusEffect(() => {
    mainBottomNavigationVisibleVar(false);
  });

  const [getStores, { data, fetchMore, refetch }] = GET_STORES();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    getStores({
      variables: {
        page: 1,
        take: 10,
      },
    });
  }, []);

  const handleOnPress = useCallback(
    (store: Store) => {
      return () =>
        navigation.push(HomeNavigations.Store, { storeId: store.id });
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch({
      page: 1,
      take: 10,
    });
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <FlatList
        data={data?.stores ?? []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={10}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
});

export default HomeRecentStoreScreen;
