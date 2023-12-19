import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { mainBottomNavigationVisibleVar } from '@/stores/common';

import { GET_MANAGED_STORE } from '@/operations/store/query/GetManagedStore';
import { Store } from '@/domain/store';
import ProfileHomeHeader from '@/screens/profile/component/header/ProfileHomeHeader';
import ManagedStoreItem from '@/screens/profile/component/ManagedStoreItem';
import ProfileHeaderRight from '@/screens/profile/component/header/ProfileHeaderRight';
import _ from 'lodash';

export const ProfileHomeScreenOptions: StackNavigationOptions = {
  title: '내 프로필',
  headerRight: () => <ProfileHeaderRight />,
};

interface ProfileHomeScreenProps {}

const ProfileHomeScreen: React.FC<ProfileHomeScreenProps> = () => {
  useFocusEffect(() => {
    mainBottomNavigationVisibleVar(true);
  });

  const [getManagedStore, { data, fetchMore }] = GET_MANAGED_STORE({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    getManagedStore({
      variables: {
        page: 1,
        take: 10,
      },
    });
  }, []);

  const keyExtractor = useCallback((item: Store) => item.id, []);

  const renderItem = useCallback<ListRenderItem<Store>>(
    ({ item }) => <ManagedStoreItem store={item} />,
    []
  );

  const listHeaderComponent = useCallback(() => <ProfileHomeHeader />, []);

  const onEndReached = useCallback(() => {
    if (data?.managedStore.length % 10 === 0) {
      fetchMore({
        variables: {
          page: Math.floor(data?.managedStore.length / 10) + 1,
          take: 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => ({
          managedStore: _(prev?.managedStore ?? [])
            .unionBy(fetchMoreResult?.managedStore, 'id')
            .orderBy((item) => item.createdAt, ['desc'])
            .value(),
        }),
      });
    }
  }, [data?.managedStore.length]);

  return (
    <FlatList<Store>
      contentContainerStyle={styles.container}
      data={data?.managedStore ?? []}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={listHeaderComponent}
      onEndReachedThreshold={10}
      onEndReached={onEndReached}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default ProfileHomeScreen;
