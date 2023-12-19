import React, { useCallback } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import { Colors } from '@/constants/color';
import SizedBox from '@/components/SizedBox';

export interface ModalItemProps {
  label: string;
  color?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress: (event: GestureResponderEvent) => void;
  child?: JSX.Element;
}

interface SelectModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  items?: ModalItemProps[];
  onClose?: () => void;
  onBackdropPress?: () => void;
}

const SelectModal: React.FC<SelectModalProps> = ({
  open,
  setOpen,
  title,
  items = [],
  onClose = () => {},
  onBackdropPress = () => {},
}) => {
  const button = useCallback(
    (item: ModalItemProps, index: number) => (
      <TouchableOpacity onPress={item.onPress} activeOpacity={0.95}>
        <View
          style={[
            styles.button,
            styles.borderTop,
            index + 1 === items.length ? styles.borderRadiusBottom : {},
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: item.color ?? Colors.black },
              item.textStyle ?? {},
            ]}
          >
            {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [items.length]
  );

  const handleClose = useCallback(() => {
    setOpen(false);

    onClose();
  }, [setOpen, onClose]);

  return (
    <Modal
      style={styles.container}
      isVisible={open}
      onSwipeComplete={handleClose}
      onBackdropPress={onBackdropPress}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View>
        <View style={[styles.titleContainer, styles.borderRadiusTop]}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {items.map((item, index) => (
          <View key={index}>{item.child ?? button(item, index)}</View>
        ))}

        <SizedBox height={8} />

        <TouchableOpacity onPress={handleClose} activeOpacity={0.65}>
          <View
            style={[
              styles.button,
              styles.borderRadiusTop,
              styles.borderRadiusBottom,
            ]}
          >
            <Text style={styles.buttonText}>취소</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  borderRadiusTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  borderRadiusBottom: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  borderTop: {
    borderTopWidth: 2,
    borderTopColor: Colors.lightGray,
  },
  title: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.inactive,
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 14,
  },
});

export default SelectModal;
