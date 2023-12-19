import React, { useCallback, useMemo, useState } from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '@/constants/color';
import { Product } from '@/domain/product';
import CustomImage from '@/components/CustomImage';
import SizedBox from '@/components/SizedBox';
import Conditional from '@/hocs/Conditional';
import StoreProductItemModal from '@/screens/store/detail/components/StoreProductItemModal';
import CustomButton from '@/components/CustomButton';
import {
  StoreDetailNavigations,
  StoreDetailStackParamProps,
} from '@/navigations/stack/store';

type navigationProp =
  StoreDetailStackParamProps<StoreDetailNavigations.PackageRegistration>['navigation'];

interface StoreProductItemProps {
  product: Product;
}

const StoreProductItem: React.FC<StoreProductItemProps> = ({ product }) => {
  const navigation = useNavigation<navigationProp>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const backgroundColor = useMemo<StyleProp<ViewStyle>>(
    () => ({
      backgroundColor: product.status
        ? Colors.white
        : 'rgba(175, 175, 175, 0.6)',
    }),
    [product.status]
  );

  const handleProduct = useCallback(() => {
    navigation.push(StoreDetailNavigations.Product, { productId: product.id });
  }, [navigation, product.id]);

  const handleOnPress = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  return (
    <>
      <TouchableOpacity
        onPress={handleProduct}
        activeOpacity={product.status === true ? 0.75 : 1}
        disabled={product.status === false}
      >
        <View style={[styles.container, backgroundColor]}>
          <CustomImage
            style={styles.image}
            imageUrl={product.image?.url}
            width={100}
            height={100}
          />

          <SizedBox width={18} />

          <View style={styles.infoContainer}>
            <Text style={styles.title}>{product.name}</Text>

            <SizedBox height={10} />

            <Text style={styles.text}>{product.price.toLocaleString()} 원</Text>
          </View>

          <View>
            <Conditional condition={product.status === true}>
              <>
                <TouchableOpacity onPress={handleOnPress} activeOpacity={0.65}>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={20}
                    color={Colors.black}
                  />
                </TouchableOpacity>

                <StoreProductItemModal
                  open={modalOpen}
                  setOpen={setModalOpen}
                  product={product}
                />
              </>
            </Conditional>
          </View>
        </View>
      </TouchableOpacity>

      <Conditional condition={product.status === false}>
        <View style={styles.statusContainer}>
          <CustomButton
            style={styles.statusButton}
            label="판매종료"
            disabled={true}
          />
        </View>
      </Conditional>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  image: {
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    color: Colors.black,
  },
  text: {
    fontWeight: '300',
    fontSize: 14,
    color: Colors.black,
    paddingLeft: 6,
  },
  statusContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusButton: {
    width: Dimensions.get('window').width - 100,
    backgroundColor: Colors.inactive,
  },
});

export default StoreProductItem;
