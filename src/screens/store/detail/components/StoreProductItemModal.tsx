import React, { useCallback, useState } from 'react';

import { Colors } from '@/constants/color';
import { Product } from '@/domain/product';
import SelectModal, {
  ModalItemProps,
} from '@/components/modal/select-modal/SelectModal';
import { STOP_PRODUCT } from '@/operations/product/mutation/StopProduct';
import SelectBottomSheet, {
  BottomSheetButtonProps,
} from '@/components/modal/select-bottom-sheet/SelectBottomSheet';
import { StyleSheet, Text } from 'react-native';

interface StoreProductItemModalProps {
  product: Product;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreProductItemModal: React.FC<StoreProductItemModalProps> = ({
  product,
  open,
  setOpen,
}) => {
  const [stopProduct] = STOP_PRODUCT({ variables: { productId: product.id } });

  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);

  const items: ModalItemProps[] = [
    {
      label: '판매 종료',
      color: Colors.primary,
      onPress: () => {
        setOpen(false);

        setTimeout(() => {
          setOpenBottomSheet(true);
        }, 360);
      },
    },
  ];

  const action: BottomSheetButtonProps = {
    label: '네, 종료할래요.',
    onPress: () => {
      stopProduct().then(() => setOpenBottomSheet(false));
    },
  };

  const dismiss: BottomSheetButtonProps = {
    label: '아니요',
    onPress: () => {
      setOpenBottomSheet(false);

      setTimeout(() => {
        setOpen(true);
      }, 400);
    },
  };

  const handleModalOnBackdropPress = useCallback(() => {
    setOpen(false);
  }, []);

  const handleBottomOnBackdropPress = useCallback(() => {
    setOpenBottomSheet(false);

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
        open={openBottomSheet}
        setOpen={setOpenBottomSheet}
        title={
          <Text style={styles.bottomSheetTitle}>
            패키지 판매를 정말{' '}
            <Text style={styles.buttonSheetTitlePrimary}>종료</Text>하시겠어요?
          </Text>
        }
        action={action}
        dismiss={dismiss}
        onBackdropPress={handleBottomOnBackdropPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheetTitle: {
    fontWeight: '800',
    fontSize: 20,
    color: Colors.black,
  },
  buttonSheetTitlePrimary: {
    color: Colors.primary,
  },
});

export default StoreProductItemModal;
