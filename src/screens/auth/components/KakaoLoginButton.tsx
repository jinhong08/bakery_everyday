import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/color';

import { AuthNavigations, AuthStackParamProps } from '@/navigations/stack/auth';

type navigationProp = AuthStackParamProps<AuthNavigations.Home>['navigation'];

const KakaoLoginButton: React.FC = () => {
  const navigation = useNavigation<navigationProp>();

  const handleOnPress = useCallback(() => {
    navigation.push(AuthNavigations.KakaoLogin);
  }, [navigation]);

  return (
    <TouchableOpacity onPress={handleOnPress} activeOpacity={0.65}>
      <View style={styles.container}>
        <Svg width={22} height={22} viewBox="0 0 512 512" strokeWidth={512}>
          <Path
            fill={Colors.black}
            d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"
          />
        </Svg>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>카카오로 시작하기</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: Colors.kakao,
  },
  labelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
    fontSize: 15,
    color: Colors.black,
  },
});

export default KakaoLoginButton;
