import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/color';
import {
  SearchNavigations,
  SearchStackParamProps,
} from '@/navigations/stack/search';
import SizedBox from '@/components/SizedBox';
import Conditional from '@/hocs/Conditional';

type navigationProp =
  SearchStackParamProps<SearchNavigations.Home>['navigation'];

const SearchHomeHeader: React.FC = () => {
  const navigation = useNavigation<navigationProp>();

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    navigation.setParams({
      search,
    });
  }, [search]);

  const handleOnChangeText = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const handleReset = useCallback(() => {
    setSearch('');
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="ios-search-outline" size={20} color={Colors.black} />

          <SizedBox width={12} />

          <TextInput
            style={styles.search}
            value={search}
            onChangeText={handleOnChangeText}
            placeholder="베이커리 이름으로 검색해보세요."
            selectionColor={Colors.primary}
          />

          <SizedBox width={6} />

          <Conditional condition={search.trim().length !== 0}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
              activeOpacity={0.65}
            >
              <AntDesign name="closecircle" size={12} color={Colors.darkGray} />
            </TouchableOpacity>
          </Conditional>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
  },
  search: {
    flex: 1,
  },
  resetButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchHomeHeader;
