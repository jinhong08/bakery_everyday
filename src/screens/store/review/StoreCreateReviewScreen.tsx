import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import * as MediaLibrary from 'expo-media-library';

import {
  StoreDetailNavigations,
  StoreDetailStackParamProps,
} from '@/navigations/stack/store';
import { GET_PRODUCT } from '@/operations/product/query/GetProduct';
import { mainBottomNavigationVisibleVar } from '@/stores/common';
import { Colors } from '@/constants/color';
import { CREATE_REVIEW } from '@/operations/review/mutation/CreateReview';
import { generateRNFile } from '@/utils/generateFile';
import {
  Data as HasReviewData,
  HAS_REVIEW_GQL,
  Variables as HasReviewVariables,
} from '@/operations/review/query/HasReview';
import MultiImageSelector from '@/components/multi-image-selctor/MultiImageSelector';
import CustomImage from '@/components/CustomImage';
import SizedBox from '@/components/SizedBox';
import CustomButton from '@/components/CustomButton';

import ReviewStartList from '@/screens/store/review/components/ReviewStartList';

export const StoreCreateReviewScreenOptions: StackNavigationOptions = {
  title: '리뷰 등록',
};

interface StoreCreateReviewScreenProps {
  navigation: StoreDetailStackParamProps<StoreDetailNavigations.CreateReview>['navigation'];
  route: StoreDetailStackParamProps<StoreDetailNavigations.CreateReview>['route'];
}

const StoreCreateReviewScreen: React.FC<StoreCreateReviewScreenProps> = ({
  navigation,
  route,
}) => {
  useFocusEffect(() => {
    mainBottomNavigationVisibleVar(false);
  });

  const [getProduct, { data }] = GET_PRODUCT({
    variables: { productId: route.params.productId },
  });
  const [createReview] = CREATE_REVIEW();

  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [star, setStar] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const buttonDisabled = useMemo(() => star === 0, [star]);

  useEffect(() => {
    getProduct();
  }, []);

  const handleOnChangeText = useCallback((text: string) => {
    setReview(text);
  }, []);

  const handleButton = useCallback(async () => {
    createReview({
      update: (cache, { data: reviewData }) => {
        if (!reviewData) return;

        cache.updateQuery<HasReviewData, HasReviewVariables>(
          {
            query: HAS_REVIEW_GQL,
            variables: {
              productId: data?.product.id,
            },
          },
          () => ({
            hasReview: true,
          })
        );
      },
      variables: {
        productId: route.params.productId,
        score: star,
        content: review.trim(),
        images: await Promise.all(
          assets.map(async (asset) => await generateRNFile(asset))
        ),
      },
    }).then(() => {
      navigation.goBack();
    });
  }, [navigation, route.params.productId, star, review, assets]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.productContainer}>
          <CustomImage
            style={styles.image}
            imageUrl={data?.product?.image?.url}
            width={80}
            height={80}
          />

          <SizedBox width={16} />

          <View style={styles.productInfoContainer}>
            <Text style={styles.store}>{data?.product?.store?.name}</Text>

            <SizedBox height={6} />

            <Text style={styles.product}>{data?.product?.name}</Text>
          </View>
        </View>

        <SizedBox height={24} />

        <View style={styles.reviewContainer}>
          <Text style={styles.reviewInfo}>상품은 어떠셨나요?</Text>

          <SizedBox height={24} />

          <ReviewStartList star={star} setStar={setStar} />

          <SizedBox height={24} />

          <Text style={styles.reviewInfo}>솔직한 상품 리뷰를 남겨주세요.</Text>

          <SizedBox height={24} />

          <TextInput
            style={styles.reviewInput}
            value={review}
            onChangeText={handleOnChangeText}
            selectionColor={Colors.primary}
            multiline={true}
            textAlign="left"
            textAlignVertical="top"
          />
        </View>

        <SizedBox height={24} />

        <MultiImageSelector assets={assets} setAssets={setAssets} size={80} />

        <SizedBox height={24} />

        <CustomButton
          label="등록하기"
          onPress={handleButton}
          disabled={buttonDisabled}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  productContainer: {
    flexDirection: 'row',
  },
  image: {
    borderRadius: 5,
  },
  productInfoContainer: {
    justifyContent: 'center',
  },
  store: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.black,
  },
  product: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.darkGray,
  },
  reviewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  reviewInfo: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.black,
  },
  reviewInput: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 5,
  },
});

export default StoreCreateReviewScreen;
