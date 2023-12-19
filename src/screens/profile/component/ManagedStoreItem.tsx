import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { Store } from '@/domain/store';
import { Colors } from '@/constants/color';
import {
  ProfileNavigations,
  ProfileStackParamProps,
} from '@/navigations/stack/profile';
import CustomImage from '@/components/CustomImage';
import { StoreDetailNavigations } from '@/navigations/stack/store';

type navigationProp =
  ProfileStackParamProps<ProfileNavigations.Home>['navigation'];

interface ManagedStoreItemProps {
  store: Store;
}

const ManagedStoreItem: React.FC<ManagedStoreItemProps> = ({ store }) => {
  const navigation = useNavigation<navigationProp>();

  const handleStoreDetail = useCallback(async () => {
    await navigation.push(ProfileNavigations.Store, { storeId: store.id });
  }, [navigation, store.id]);

  const handlePackageRegistration = useCallback(async () => {
    navigation.dispatch(
      CommonActions.navigate(ProfileNavigations.Store, {
        storeId: store.id,
        initial: true,
        screen: StoreDetailNavigations.PackageRegistration,
      })
    );
  }, [navigation, store.id]);

  const handlePackageList = useCallback(() => {
    navigation.dispatch(
      CommonActions.navigate(ProfileNavigations.Store, {
        storeId: store.id,
        initial: true,
        screen: StoreDetailNavigations.ProductList,
      })
    );
  }, [navigation, store.id]);

  const handleOrderList = useCallback(() => {
    navigation.push(ProfileNavigations.StoreOrderList, {
      storeId: store.id,
    });
  }, [navigation, store.id]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleStoreDetail} activeOpacity={0.65}>
        <View style={styles.topContainer}>
          <CustomImage
            style={styles.storeImage}
            width={80}
            height={80}
            imageUrl={store.image.url}
          />

          <View style={styles.infoContainer}>
            <Text style={styles.storeName}>{store.name}</Text>
            <Text style={styles.mangerNickname}>{store.manager.nickname}</Text>
          </View>

          <AntDesign name="right" size={22} color={Colors.black} />
        </View>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handlePackageRegistration}
          activeOpacity={0.65}
        >
          <Text style={styles.buttonText}>패키지</Text>
          <Text style={styles.buttonActionText}>등록</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.buttonBorder]}
          onPress={handlePackageList}
          activeOpacity={0.65}
        >
          <Text style={styles.buttonText}>패키지</Text>
          <Text style={styles.buttonActionText}>조회</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleOrderList}
          activeOpacity={0.65}
        >
          <Text style={styles.buttonText}>주문</Text>
          <Text style={styles.buttonActionText}>조회</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  topContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  storeImage: {
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 18,
  },
  storeName: {
    fontWeight: '700',
    fontSize: 22,
    color: Colors.primary,
    marginBottom: 2,
  },
  mangerNickname: {
    fontWeight: '300',
    fontSize: 13,
    color: Colors.black,
    marginTop: 2,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: Colors.lightGray,
    borderRightColor: Colors.lightGray,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.black,
  },
  buttonActionText: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.primary,
    marginTop: 10,
  },
});

export default ManagedStoreItem;
