import React, { useEffect, useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { GET_ME } from '@/operations/profile/query/GetMe';
import Conditional from '@/hocs/Conditional';
import { Colors } from '@/constants/color';
import { Profile } from '@/domain/profile';

import BreadIcon from '@/components/icons/BreadIcon';
import ProfileHomeMenu from '@/screens/profile/component/ProfileHomeMenu';

const ProfileHomeHeader: React.FC = () => {
  const [getMe, { data }] = GET_ME();

  useEffect(() => {
    getMe();
  }, []);

  const me = useMemo<Profile>(() => data?.me, [data]);

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>{me?.name ?? ''}</Text>
          <Text style={styles.address}>{me?.address1 ?? ''}</Text>
          <Text style={styles.address}>{me?.address2 ?? ''}</Text>
        </View>

        <Conditional condition={me?.profileImageUrl !== null}>
          <Image
            style={styles.profileImage}
            source={{ uri: me?.profileImageUrl }}
            resizeMode="cover"
          />
        </Conditional>

        <Conditional condition={me?.profileImageUrl === null}>
          <View style={[styles.profileImage, styles.emptyProfileImage]}>
            <BreadIcon size={32} />
          </View>
        </Conditional>
      </View>

      <ProfileHomeMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    padding: 20,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '600',
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 6,
  },
  address: {
    fontWeight: '600',
    fontSize: 13,
    color: Colors.black,
    marginTop: 2,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 100,
  },
  emptyProfileImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
  },
});

export default ProfileHomeHeader;
