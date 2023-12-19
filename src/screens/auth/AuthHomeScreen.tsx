import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';

import { Colors } from '@/constants/color';

import KakaoLoginButton from '@/screens/auth/components/KakaoLoginButton';

export const AuthHomeScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

const AuthHomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTopMessage}>간편하게 로그인하고</Text>
          <Text style={styles.infoBottomMessage}>
            편리한 기능을 사용해보세요!
          </Text>
        </View>

        <KakaoLoginButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 36,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTopMessage: {
    fontWeight: '500',
    fontSize: 20,
    color: Colors.black,
  },
  infoBottomMessage: {
    fontWeight: '800',
    fontSize: 20,
    color: Colors.black,
    marginTop: 10,
  },
});

export default AuthHomeScreen;
