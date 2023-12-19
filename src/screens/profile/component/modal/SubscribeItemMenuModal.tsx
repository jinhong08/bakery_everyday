import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/color';
import { Product } from '@/domain/product';
import SelectModal, {
  ModalItemProps,
} from '@/components/modal/select-modal/SelectModal';
import SelectBottomSheet, {
  BottomSheetButtonProps,
} from '@/components/modal/select-bottom-sheet/SelectBottomSheet';
import SizedBox from '@/components/SizedBox';
import { CANCEL_ORDER } from '@/operations/order/mutation/CancelOrder';
import { GET_ORDERS_WITH_MEMBER } from '@/operations/order/query/GetOrdersWithMember';

interface SubscribeItemMenuModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
}

const SubscribeItemMenuModal: React.FC<SubscribeItemMenuModalProps> = ({
  open,
  setOpen,
  product,
}) => {
  const [getOrdersWithMember, { data }] = GET_ORDERS_WITH_MEMBER({
    fetchPolicy: 'cache-only',
  });
  const [cancelOrder] = CANCEL_ORDER();

  const [bottomOpen, setBottomOpen] = useState<boolean>(false);

  useEffect(() => {
    getOrdersWithMember();
  }, []);

  const items: ModalItemProps[] = [
    {
      label: '구독 취소',
      color: Colors.primary,
      onPress: () => {
        setOpen(false);

        setTimeout(() => {
          setBottomOpen(true);
        }, 360);
      },
    },
  ];

  const action: BottomSheetButtonProps = {
    label: '네, 취소할래요.',
    onPress: () => {
      cancelOrder({
        variables: {
          orderId: data?.ordersWithMember?.find(
            (it) => it.product.id === product.id
          ).id,
        },
      }).then(() => setBottomOpen(false));
    },
  };

  const dismiss: BottomSheetButtonProps = {
    label: '아니요',
    onPress: () => {
      setBottomOpen(false);

      setTimeout(() => {
        setOpen(true);
      }, 400);
    },
  };

  const handleModalOnBackdropPress = useCallback(() => {
    setOpen(false);
  }, []);

  const handleBottomOnBackdropPress = useCallback(() => {
    setBottomOpen(false);

    setTimeout(() => {
      setOpen(true);
    }, 400);
  }, []);

  return (
    <>
      <SelectModal
        open={open}
        setOpen={setOpen}
        title={product.name}
        items={items}
        onBackdropPress={handleModalOnBackdropPress}
      />

      <SelectBottomSheet
        open={bottomOpen}
        setOpen={setBottomOpen}
        title={
          <View>
            <Text style={styles.title}>패키지 구독을</Text>

            <SizedBox height={4} />

            <Text style={styles.title}>
              정말 <Text style={styles.primary}>취소</Text>하시겠어요?
            </Text>
          </View>
        }
        titleAlign="left"
        action={action}
        dismiss={dismiss}
        onBackdropPress={handleBottomOnBackdropPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '800',
    fontSize: 24,
    color: Colors.black,
  },
  primary: {
    color: Colors.primary,
  },
});

export default SubscribeItemMenuModal;
