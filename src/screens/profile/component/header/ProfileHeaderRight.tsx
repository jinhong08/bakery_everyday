import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Colors } from '@/constants/color';
import SelectModal, {
  ModalItemProps,
} from '@/components/modal/select-modal/SelectModal';
import { tokenVar } from '@/stores/auth';
import { LOGOUT } from '@/operations/auth/mutation/Logout';
import TokenRepository from '@/repository/token.repository';

const ProfileHeaderRight: React.FC = () => {
  const [logout] = LOGOUT();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const items: ModalItemProps[] = [
    {
      label: '로그아웃',
      onPress: () => {
        setOpenModal(false);

        logout().then(({ data }) => {
          if (data.logout) {
            TokenRepository.set(null);
            tokenVar(null);
          }
        });
      },
    },
  ];

  const handleOnBackdropPress = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleOnPress = useCallback(() => {
    setOpenModal(true);
  }, []);

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={handleOnPress}
        activeOpacity={0.65}
      >
        <AntDesign name="setting" size={20} color={Colors.black} />
      </TouchableOpacity>

      <SelectModal
        open={openModal}
        setOpen={setOpenModal}
        onBackdropPress={handleOnBackdropPress}
        title="설정"
        items={items}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileHeaderRight;
