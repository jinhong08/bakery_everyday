import React, { useCallback, useMemo, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PhotoIcon } from 'react-native-heroicons/mini';

import {
  StoreDetailNavigations,
  StoreDetailStackParamProps,
} from '@/navigations/stack/store';

import { mainBottomNavigationVisibleVar } from '@/stores/common';
import { Colors } from '@/constants/color';
import SizedBox from '@/components/SizedBox';
import MultiImageSelectorModal from '@/components/modal/multi-image-selector/MultiImageSelectorModal';
import Conditional from '@/hocs/Conditional';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { BreadType } from '@/domain/product';
import { CREATE_PRODUCT } from '@/operations/product/mutation/CreateProduct';
import { generateRNFile } from '@/utils/generateFile';
import MultiImageSelector from '@/components/multi-image-selctor/MultiImageSelector';

export const StoreProductionRegistrationScreenOptions: StackNavigationOptions =
  {
    title: '패키지 등록',
  };

interface StoreProductRegistrationScreenProps {
  navigation: StoreDetailStackParamProps<StoreDetailNavigations.PackageRegistration>['navigation'];
  route: StoreDetailStackParamProps<StoreDetailNavigations.PackageRegistration>['route'];
}

const StoreProductRegistrationScreen: React.FC<
  StoreProductRegistrationScreenProps
> = ({ navigation, route }) => {
  useFocusEffect(() => {
    mainBottomNavigationVisibleVar(false);
  });

  const [createProduct] = CREATE_PRODUCT();

  const [open, setOpen] = useState<boolean>(false);
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [breadType, setBreadType] = useState<BreadType>(BreadType.ETC);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<MediaLibrary.Asset[]>([]);
  const [quantity, setQuantity] = useState<string | null>('');
  const [price, setPrice] = useState<string>('');

  const buttonDisabled = useMemo<boolean>(
    () =>
      name.trim().length === 0 ||
      price.trim().length === 0 ||
      isNaN(+price.replaceAll(',', '')),
    [name, price]
  );

  const handleOnPress = useCallback(async () => {
    await createProduct({
      variables: {
        storeId: route.params.storeId,
        image: await generateRNFile(assets[0]),
        name: name.trim(),
        breadType,
        description: await Promise.all(
          description.map(async (asset) => await generateRNFile(asset))
        ),
        price: +price.replaceAll(',', ''),
        quantity: isNaN(+quantity.replaceAll(',', ''))
          ? null
          : +quantity.replaceAll(',', ''),
      },
    });

    navigation.goBack();
  }, [
    navigation,
    route,
    assets,
    name,
    breadType,
    description,
    price,
    quantity,
  ]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
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

        <DropDownPicker<BreadType>
          style={styles.dropDown}
          containerStyle={styles.dropDownContainer}
          dropDownContainerStyle={styles.dropDownInnerContainer}
          labelStyle={styles.dropDownText}
          listItemLabelStyle={styles.dropDownText}
          items={[
            { label: '식빵', value: BreadType.BREAD },
            { label: '쿠키', value: BreadType.COOKIES },
            { label: '도넛', value: BreadType.DONUTS },
            { label: '케이크', value: BreadType.CAKES },
            { label: '타르트', value: BreadType.TARTS },
            { label: '크로와상', value: BreadType.CROISSANTS },
            { label: '페스츄리', value: BreadType.PASTRIES },
            { label: '샌드위치', value: BreadType.SANDWICHES },
            { label: '구움과자', value: BreadType.PETIT_FOUR },
            { label: '기타', value: BreadType.ETC },
          ]}
          open={open}
          setOpen={setOpen}
          value={breadType}
          setValue={setBreadType}
          listMode="SCROLLVIEW"
          showArrowIcon={true}
          ArrowDownIconComponent={() => (
            <AntDesign name="caretdown" size={20} color={Colors.primary} />
          )}
          ArrowUpIconComponent={() => (
            <AntDesign name="caretdown" size={20} color={Colors.primary} />
          )}
        />

        <SizedBox height={26} />

        <CustomInput
          title="이름"
          titleStyle={styles.title}
          inputStyle={styles.input}
          text={name}
          setText={setName}
        />

        <SizedBox height={26} />

        <CustomInput
          title="수량"
          titleStyle={styles.title}
          inputStyle={styles.input}
          text={`${
            quantity.trim().length > 0
              ? Number(quantity.replaceAll(',', '').trim()).toLocaleString()
              : ''
          }`}
          setText={setQuantity}
          props={{ keyboardType: 'number-pad' }}
        />

        <SizedBox height={26} />

        <CustomInput
          title="가격"
          titleStyle={styles.title}
          inputStyle={styles.input}
          text={
            price.trim().length > 0
              ? Number(price.replaceAll(',', '').trim()).toLocaleString()
              : ''
          }
          setText={setPrice}
          props={{ keyboardType: 'number-pad' }}
        />

        <SizedBox height={26} />

        <Text style={styles.title}>상품 설명</Text>
        <SizedBox height={8} />
        <MultiImageSelector assets={description} setAssets={setDescription} />

        <SizedBox height={40} />

        <CustomButton
          label="완료"
          onPress={handleOnPress}
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
  dropDown: {
    borderWidth: 0,
  },
  dropDownContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  dropDownInnerContainer: {
    overflow: 'visible',
    borderWidth: 0,
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  dropDownText: {
    fontWeight: '400',
    fontSize: 14,
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

export default StoreProductRegistrationScreen;
