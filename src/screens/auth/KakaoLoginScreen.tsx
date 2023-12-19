import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import qs from 'qs';
import axios from 'axios';

import { BASE_URL, KAKAO_APP_KEY } from '@/constants';

import { SIGN_IN } from '@/operations/auth/mutation/SignIn';
import { AuthNavigations, AuthStackParamProps } from '@/navigations/stack/auth';
import { tokenVar } from '@/stores/auth';
import tokenRepository from '@/repository/token.repository';

export const KakaoLoginScreenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
};

const REDIRECT_URI: string = `${BASE_URL}/api/oauth/redirect`;
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('')`;

interface KakaoLoginScreenProps {
  navigation: AuthStackParamProps<AuthNavigations.KakaoLogin>['navigation'];
}

const KakaoLoginScreen: React.FC<KakaoLoginScreenProps> = ({ navigation }) => {
  const [signIn] = SIGN_IN();

  const handleOnMessage = useCallback(async (event: WebViewMessageEvent) => {
    if (event.nativeEvent['url'].includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent['url'].replace(
        `${REDIRECT_URI}?code=`,
        ''
      );

      axios
        .post(
          `https://kauth.kakao.com/oauth/token`,
          qs.stringify({
            grant_type: 'authorization_code',
            client_id: KAKAO_APP_KEY,
            redirect_url: REDIRECT_URI,
            code,
          })
        )
        .then((res) => {
          signIn({
            variables: {
              type: 'KAKAO',
              token: res.data['access_token'],
            },
          })
            .then((res) => {
              tokenRepository.set(res.data.signIn);
              tokenVar(res.data.signIn);
            })
            .catch(() => {
              navigation.replace(AuthNavigations.SignUp, {
                type: 'KAKAO',
                token: res.data['access_token'],
              });
            });
        })
        .catch(() => {
          navigation.replace(AuthNavigations.Home);
        });
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.container}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_APP_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KakaoLoginScreen;
