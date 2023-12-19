import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useReactiveVar } from '@apollo/client';

import { GET_PRODUCT } from '@/operations/product/query/GetProduct';
import { Colors } from '@/constants/color';
import { productDetailHeaderHeightVar } from '@/stores/product';
import {
  StoreDetailNavigations,
  StoreDetailStackParamProps,
} from '@/navigations/stack/store';

import ProductTopTabNavigator from '@/navigations/tab/product/ProductTopTabNavigator';
import SizedBox from '@/components/SizedBox';
import CustomButton from '@/components/CustomButton';
import Conditional from '@/hocs/Conditional';
import { useFocusEffect } from '@react-navigation/native';
import { mainBottomNavigationVisibleVar } from '@/stores/common';
import { CREATE_ORDER } from '@/operations/order/mutation/CreateOrder';
import { HAS_ORDER } from '@/operations/order/query/HasOrder';

export const StoreProductHomeScreenOptions: StackNavigationOptions = {
  title: '',
};

interface StoreProductHomeScreenProps {
  navigation: StoreDetailStackParamProps<StoreDetailNavigations.Product>['navigation'];
  route: StoreDetailStackParamProps<StoreDetailNavigations.Product>['route'];
}

const StoreProductHomeScreen: React.FC<StoreProductHomeScreenProps> = ({
  navigation,
  route,
}) => {
  useFocusEffect(() => {
    mainBottomNavigationVisibleVar(false);
  });

  const [getProduct, { data }] = GET_PRODUCT({
    variables: { productId: route.params.productId },
  });
  const [hasOrder, { data: hasOrderData }] = HAS_ORDER({
    variables: { productId: route.params.productId },
  });
  const [createOrder] = CREATE_ORDER();

  useEffect(() => {
    getProduct();
    hasOrder();
  }, []);

  const productDetailHeaderHeight = useReactiveVar<number>(
    productDetailHeaderHeightVar
  );

  const [headerHeight, setHeaderHeight] = useState<number | null>(null);
  const [touchStarted, setTouchStarted] = useState<number>(0);
  const height = useSharedValue<number | null>(null);

  const subscribeButtonVisible = useMemo<boolean>(
    () =>
      !!data?.product?.store?.isManager !== true &&
      hasOrderData?.hasOrder !== true,
    [data, hasOrderData?.hasOrder]
  );

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    ...(height.value !== null
      ? {
          height: withTiming(height.value),
        }
      : {}),
  }));

  useEffect(() => {
    height.value = headerHeight * productDetailHeaderHeight;
  }, [headerHeight, productDetailHeaderHeight]);

  const handleOnLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (
        headerHeight === null ||
        headerHeight < event.nativeEvent.layout.height
      ) {
        setHeaderHeight(event.nativeEvent.layout.height);
        productDetailHeaderHeightVar(1);
      }
    },
    [headerHeight]
  );

  const handleOnTouchStart = useCallback((event: GestureResponderEvent) => {
    setTouchStarted(event.nativeEvent.locationY);
  }, []);

  const handleOnTouchEnd = useCallback(
    (event: GestureResponderEvent) => {
      if (touchStarted > event.nativeEvent.locationY) {
        productDetailHeaderHeightVar(0);
      }
    },
    [touchStarted]
  );

  const handleStore = useCallback(() => {
    if (!!data?.product?.store?.id) {
      navigation.push(StoreDetailNavigations.Home, {
        storeId: data?.product?.store?.id,
      });
    }
  }, [navigation, data?.product?.store?.id]);

  const handleSubscribe = useCallback(async () => {
    if (!!data?.product?.id) {
      const {
        data: {
          createOrder: { id, orderUrl, orderSecret },
        },
      } = await createOrder({ variables: { productId: data?.product?.id } });

      navigation.push(StoreDetailNavigations.Subscribe, {
        productId: data?.product?.id,
        orderId: id,
        orderUrl,
        orderSecret,
      });
    }
  }, [navigation, data]);

  return (
    <Animated.View style={styles.container}>
      <Animated.View
        style={[styles.header, headerAnimatedStyle]}
        onLayout={handleOnLayout}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={handleOnTouchEnd}
      >
        <Image
          style={[styles.image]}
          source={{ uri: data?.product?.image.url }}
        />

        <SizedBox height={20} />

        <Text style={styles.title}>{data?.product?.name ?? ''}</Text>

        <View style={styles.infoContainer}>
          <SizedBox height={8} />

          <TouchableOpacity
            style={styles.rowContainer}
            onPress={handleStore}
            activeOpacity={0.8}
          >
            <Text style={styles.store}>{data?.product?.store?.name ?? ''}</Text>

            <Entypo name="chevron-small-right" size={18} color={Colors.black} />
          </TouchableOpacity>

          <SizedBox height={6} />

          <Text style={styles.price}>
            {isNaN(data?.product?.price)
              ? data?.product?.price
              : `${(+data?.product?.price).toLocaleString()} 원`}
          </Text>

          <SizedBox height={6} />

          <View style={styles.rowContainer}>
            <AntDesign name="star" size={14} color={Colors.primary} />

            <SizedBox width={4} />

            <Text style={styles.score}>{data?.product?.score.toFixed(1)}</Text>
          </View>
        </View>

        <SizedBox height={20} />
      </Animated.View>

      <ProductTopTabNavigator productId={route.params.productId} />

      <Conditional condition={subscribeButtonVisible}>
        <View style={styles.subscribeButtonContainer}>
          <SafeAreaView>
            <CustomButton
              style={[styles.subscribeButton]}
              label="구독하기"
              onPress={handleSubscribe}
            />
          </SafeAreaView>
        </View>
      </Conditional>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width - 40,
    borderRadius: 6,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: Colors.black,
  },
  infoContainer: {
    paddingLeft: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  store: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.black,
  },
  price: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.black,
  },
  score: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.black,
  },
  subscribeButtonContainer: {
    backgroundColor: Colors.primary,
  },
  subscribeButton: {
    width: '100%',
  },
});

export default StoreProductHomeScreen;
