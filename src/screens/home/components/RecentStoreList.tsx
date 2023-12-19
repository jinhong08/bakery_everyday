import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HomeNavigations, HomeStackParamProps } from '@/navigations/stack/home';
import { Colors } from '@/constants/color';
import { Store } from '@/domain/store';
import { GET_STORES } from '@/operations/store/query/GetStores';
import StoreItem from '@/components/store/StoreItem';

type navigationProp = HomeStackParamProps<HomeNavigations.Home>['navigation'];

const RecentStoreList: React.FC = () => {
  const navigation = useNavigation<navigationProp>();

  const [getStores, { data }] = GET_STORES({ variables: { page: 1, take: 3 } });

  useEffect(() => {
    getStores();
  }, []);

  const handleMore = useCallback(() => {
    navigation.push(HomeNavigations.RecentStore);
  }, [navigation]);

  const handleOnPress = useCallback(
    (store: Store) => {
      return () =>
        navigation.push(HomeNavigations.Store, { storeId: store.id });
    },
    [navigation]
  );

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>최신 베이커리</Text>

        <TouchableOpacity onPress={handleMore} activeOpacity={0.8}>
          <Text style={styles.more}>더보기</Text>
        </TouchableOpacity>
      </View>

      {(data?.stores ?? []).map((item) => (
        <StoreItem key={item.id} store={item} onPress={handleOnPress(item)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.black,
  },
  more: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.gray,
  },
});

export default RecentStoreList;
