import React, { useCallback, useMemo, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import * as MediaLibrary from 'expo-media-library';
import { PhotoIcon } from 'react-native-heroicons/mini';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';

import {
  Data as GetManagedStoreData,
  GET_MANAGED_STORE_GQL,
  Variable as GetManagedStoreVariable,
} from '@/operations/store/query/GetManagedStore';
import {
  ProfileNavigations,
  ProfileStackParamProps,
} from '@/navigations/stack/profile';
import { Colors } from '@/constants/color';

import CustomInput from '@/components/CustomInput';
import SizedBox from '@/components/SizedBox';
import CustomButton from '@/components/CustomButton';
import MultiImageSelectorModal from '@/components/modal/multi-image-selector/MultiImageSelectorModal';
import Conditional from '@/hocs/Conditional';
import { mainBottomNavigationVisibleVar } from '@/stores/common';

import { CREATE_STORE } from '@/operations/store/mutation/CreateStore';
import { generateRNFile } from '@/utils/generateFile';

export const CreateStoreScreenOptions: StackNavigationOptions = {
  headerTitle: '가게 등록',
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 20,
    color: Colors.primary,
  },
};

interface CreateStoreScreenProps {
  navigation: ProfileStackParamProps<ProfileNavigations.CreateStore>['navigation'];
}

const CreateStoreScreen: React.FC<CreateStoreScreenProps> = ({
  navigation,
}) => {
  useFocusEffect(() => {
    mainBottomNavigationVisibleVar(false);
  });

  const [createStore] = CREATE_STORE();

  const [nickname, setNickname] = useState<string>('');
  const [storeName, setStoreName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [cycle, setCycle] = useState<string>('');

  const buttonDisabled = useMemo<boolean>(
    () =>
      storeName.trim().length === 0 ||
      assets.length !== 1 ||
      description.trim().length === 0 ||
      address.trim().length === 0 ||
      phone.replaceAll('-', '').trim().length === 0 ||
      nickname.trim().length === 0,
    [storeName, assets, description, address, phone, nickname]
  );

  const handleButtonOnPress = useCallback(async () => {
    await createStore({
      variables: {
        name: storeName.trim(),
        image: await generateRNFile(assets[0]),
        description: description.trim(),
        location: address.trim(),
        phone: phone.replaceAll('-', '').trim(),
        manager: {
          nickname: nickname.trim(),
        },
      },
      update: (cache, { data }) => {
        if (!data) return;

        cache.updateQuery<GetManagedStoreData, GetManagedStoreVariable>(
          { query: GET_MANAGED_STORE_GQL },
          (prev) => ({
            managedStore: _(prev?.managedStore ?? [])
              .unionBy([data?.createStore], 'id')
              .orderBy((store) => store.createdAt, ['desc'])
              .value(),
          })
        );
      },
    });

    navigation.goBack();
  }, [
    navigation,
    createStore,
    storeName,
    assets,
    description,
    address,
    phone,
    nickname,
  ]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>대표 사진</Text>
        <SizedBox height={10} />

        <MultiImageSelectorModal
          assets={assets}
          setAssets={setAssets}
          maxAssets={1}
        >
          <>
            <Conditional condition={assets.length === 0}>
              <View style={styles.unSelectedImageContainer}>
                <PhotoIcon size={26} color={Colors.darkGray} />
              </View>
            </Conditional>

            <Conditional condition={assets.length > 0}>
              <Image style={styles.image} source={{ uri: assets[0]?.uri }} />
            </Conditional>
          </>
        </MultiImageSelectorModal>

        <SizedBox height={26} />

        <CustomInput
          title="사장님 닉네임"
          titleStyle={styles.title}
          inputStyle={styles.input}
          text={nickname}
          setText={setNickname}
        />

        <SizedBox height={26} />

        <CustomInput
          title="가게 이름"
          titleStyle={styles.title}
          inputStyle={styles.input}
          text={storeName}
          setText={setStoreName}
        />

        <SizedBox height={26} />

        <CustomInput
          title="가게 위치"
          titleStyle={styles.title}
          inputStyle={styles.input}
          text={address}
          setText={setAddress}
        />

        <SizedBox height={26} />

        <CustomInput
          title="가게 전화번호"
          titleStyle={styles.title}
          inputStyle={styles.input}
          text={phone}
          setText={setPhone}
        />

        <SizedBox height={26} />

        <CustomInput
          title="가게 소개"
          titleStyle={styles.title}
          inputStyle={styles.input}
          text={description}
          setText={setDescription}
        />

        <SizedBox height={26} />

        <CustomInput
          title="배송 주기"
          titleStyle={styles.title}
          inputStyle={styles.input}
          text={cycle}
          setText={setCycle}
        />

        <SizedBox height={40} />

        <CustomButton
          label="완료"
          onPress={handleButtonOnPress}
          disabled={buttonDisabled}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    fontWeight: '600',
    fontSize: 17,
    color: Colors.black,
  },
  input: {
    fontWeight: '400',
    fontSize: 17,
    color: Colors.black,
    paddingLeft: 4,
    borderBottomWidth: 1,
  },
  unSelectedImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 6,
  },
});

export default CreateStoreScreen;
