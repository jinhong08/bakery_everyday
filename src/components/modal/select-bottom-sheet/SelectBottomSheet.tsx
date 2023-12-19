import React, { useCallback, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';

import { Colors } from '@/constants/color';
import SizedBox from '@/components/SizedBox';
import Conditional from '@/hocs/Conditional';

export interface BottomSheetButtonProps {
  label: string;
  onPress: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

interface SelectBottomSheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string | JSX.Element;
  titleAlign?: 'left' | 'center';
  action: BottomSheetButtonProps;
  dismiss?: BottomSheetButtonProps;
  onClose?: () => void;
  onBackdropPress?: () => void;
}

const SelectBottomSheet: React.FC<SelectBottomSheetProps> = ({
  open,
  setOpen,
  title,
  titleAlign = 'center',
  action,
  dismiss = null,
  onClose = () => {},
  onBackdropPress = () => {},
}) => {
  const topContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      alignItems: titleAlign === 'left' ? 'flex-start' : 'center',
    }),
    [titleAlign]
  );

  const handleClose = useCallback(() => {
    setOpen(false);

    onClose();
  }, [onClose]);

  return (
    <Modal
      style={styles.container}
      isVisible={open}
      onSwipeComplete={handleClose}
      onBackdropPress={onBackdropPress}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.innerContainer}>
        <View style={[styles.topContainer, topContainerStyle]}>
          {typeof title === 'string' ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            title
          )}
        </View>

        <SizedBox height={60} />

        <View style={styles.bottomContainer}>
          <Conditional condition={dismiss !== undefined}>
            <>
              <TouchableOpacity
                style={[styles.dismissButton, dismiss.style]}
                onPress={dismiss.onPress}
                activeOpacity={0.65}
              >
                <Text style={[styles.dismissLabel, dismiss.textStyle]}>
                  {dismiss.label}
                </Text>
              </TouchableOpacity>

              <SizedBox width={6} />
            </>
          </Conditional>

          <TouchableOpacity
            style={[styles.actionButton, action.style]}
            onPress={action.onPress}
            activeOpacity={0.65}
          >
            <Text style={[styles.actionLabel, action.textStyle]}>
              {action.label}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    paddingHorizontal: 26,
    paddingTop: 56,
    paddingBottom: 30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: Colors.white,
  },
  topContainer: {
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 20,
    color: Colors.black,
  },
  bottomContainer: {
    flexDirection: 'row',
  },
  dismissButton: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray,
  },
  dismissLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: Colors.black,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  actionLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.white,
  },
});

export default SelectBottomSheet;
