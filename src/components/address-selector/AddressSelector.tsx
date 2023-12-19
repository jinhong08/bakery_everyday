import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Postcode from '@actbase/react-daum-postcode';

import { Colors } from '@/constants/color';
import { Feather } from '@expo/vector-icons';

interface AddressSelectorProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPostCode: React.Dispatch<React.SetStateAction<string>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
  visible,
  setVisible,
  setPostCode,
  setAddress,
}) => {
  const handleOnClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleSelected = useCallback((data) => {
    setPostCode(data['zonecode']);
    setAddress(data['address']);

    setVisible(false);
  }, []);

  const handleOnError = useCallback((error) => {
    console.warn(error);
  }, []);

  return (
    <Modal style={styles.modalContainer} isVisible={visible}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleOnClose} activeOpacity={0.65}>
            <Feather name="x" size={24} color={Colors.black} />
          </TouchableOpacity>
        </View>

        <Postcode
          style={styles.container}
          jsOptions={{ animation: true }}
          onSelected={handleSelected}
          onError={handleOnError}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    padding: 10,
  },
  container: {
    flex: 1,
    width: '100%',
  },
});

export default AddressSelector;
