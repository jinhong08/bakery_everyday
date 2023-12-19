import React, { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import _ from 'lodash';

import { Colors } from '@/constants/color';
import { mainBottomNavigationVisibleVar } from '@/stores/common';
import { HomeNavigations, HomeStackParamProps } from '@/navigations/stack/home';
import { BreadType, getBreadTypeName } from '@/domain/product';

import BreadIcon from '@/components/icons/BreadIcon';
import CookiesIcon from '@/components/icons/CookiesIcon';
import DonutsIcon from '@/components/icons/DonutsIcon';
import CakesIcon from '@/components/icons/CakesIcon';
import TartsIcon from '@/components/icons/TartsIcon';
import CroissantsIcon from '@/components/icons/CroissantsIcon';
import PastriesIcon from '@/components/icons/PastriesIcon';
import SandwichesIcon from '@/components/icons/SandwichesIcon';
import PetitFourIcon from '@/components/icons/PetitFourIcon';
import SizedBox from '@/components/SizedBox';

import RecommendedProductList from '@/screens/home/components/RecommandedProductList';
import RecentStoreList from '@/screens/home/components/RecentStoreList';

export const HomeScreenOptions: StackNavigationOptions = {
  title: '오늘의 빵',
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 20,
    color: Colors.primary,
  },
  headerStyle: {
    elevation: 1,
  },
};

const categoryList: { key: BreadType; icon: JSX.Element }[] = [
  {
    key: BreadType.BREAD,
    icon: <BreadIcon size={48} />,
  },
  {
    key: BreadType.COOKIES,
    icon: <CookiesIcon size={48} />,
  },
  {
    key: BreadType.DONUTS,
    icon: <DonutsIcon size={48} />,
  },
  {
    key: BreadType.CAKES,
    icon: <CakesIcon size={48} />,
  },
  {
    key: BreadType.TARTS,
    icon: <TartsIcon size={48} />,
  },
  {
    key: BreadType.CROISSANTS,
    icon: <CroissantsIcon size={48} />,
  },
  {
    key: BreadType.PASTRIES,
    icon: <PastriesIcon size={48} />,
  },
  {
    key: BreadType.SANDWICHES,
    icon: <SandwichesIcon size={48} />,
  },
  {
    key: BreadType.PETIT_FOUR,
    icon: <PetitFourIcon size={48} />,
  },
  {
    key: BreadType.ETC,
    icon: (
      <Entypo name="dots-three-horizontal" size={48} color={Colors.primary} />
    ),
  },
  {
    key: null,
    icon: null,
  },
  {
    key: null,
    icon: null,
  },
];

interface HomeScreenProps {
  navigation: HomeStackParamProps<HomeNavigations.Home>['navigation'];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  useFocusEffect(() => {
    mainBottomNavigationVisibleVar(true);
  });

  const handleCategory = useCallback(
    (breadType: BreadType) => {
      return () => navigation.push(HomeNavigations.Category, { breadType });
    },
    [navigation]
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.categoryContainer}>
        {_(categoryList)
          .chunk(4)
          .value()
          .map((row, rowIndex) => (
            <View key={rowIndex.toString()} style={styles.categoryRowContainer}>
              {row.map((category, index) => (
                <TouchableOpacity
                  key={category.key ?? index.toString()}
                  style={styles.categoryItemContainer}
                  onPress={handleCategory(category.key)}
                  activeOpacity={0.8}
                  disabled={category.key === null}
                >
                  {category.icon ?? <SizedBox width={48} height={48} />}

                  <SizedBox height={12} />

                  <Text style={styles.category}>
                    {getBreadTypeName(category.key)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
      </View>

      <SizedBox height={20} />

      <RecommendedProductList />

      <SizedBox height={20} />

      <RecentStoreList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    paddingHorizontal: 20,
  },
  categoryRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItemContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.black,
  },
});

export default HomeScreen;
