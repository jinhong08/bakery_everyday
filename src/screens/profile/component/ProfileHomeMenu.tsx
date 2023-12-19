import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '@/constants/color';
import {
  ProfileNavigations,
  ProfileStackParamProps,
} from '@/navigations/stack/profile';
import ProfileSubscribedProductList from '@/screens/profile/component/ProfileSubscribedProductList';

type navigationProp =
  ProfileStackParamProps<ProfileNavigations.Home>['navigation'];

interface ProfileHomeMenuProps {}

const ProfileHomeMenu: React.FC<ProfileHomeMenuProps> = ({}) => {
  const navigation = useNavigation<navigationProp>();

  const handleMenu = useCallback(
    (navigate: ProfileNavigations) => {
      return () => {
        navigation.push(navigate);
      };
    },
    [navigation]
  );

  return (
    <View>
      <View style={styles.menuContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>구독 중인 패키지</Text>

          <TouchableOpacity
            onPress={handleMenu(ProfileNavigations.SubscribedProduct)}
            activeOpacity={0.65}
          >
            <Text style={styles.more}>더보기</Text>
          </TouchableOpacity>
        </View>

        <ProfileSubscribedProductList />
      </View>

      <TouchableOpacity
        style={styles.menuContainer}
        onPress={handleMenu(ProfileNavigations.CreateStore)}
        activeOpacity={0.65}
      >
        <Text style={styles.title}>가게 등록</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    padding: 16,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.lightGray,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.black,
  },
  more: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.darkGray,
  },
});

export default ProfileHomeMenu;
