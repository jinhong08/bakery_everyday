import React, { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { CommonActions, useNavigation } from '@react-navigation/native';

import RootStackNavigator from '@/navigations/stack/root/RootStackNavigator';
import { tokenVar } from '@/stores/auth';
import TokenRepository from '@/repository/token.repository';
import { REISSUE } from '@/operations/auth/mutation/ReIssue';
import { RootNavigations, RootStackParamProps } from '@/navigations/stack/root';

type navigationProp = RootStackParamProps<RootNavigations>['navigation'];

const Main: React.FC = () => {
  const navigation = useNavigation<navigationProp>();

  const token = useReactiveVar(tokenVar);
  const [reissue] = REISSUE();

  useEffect(() => {
    if (token === null) {
      TokenRepository.get().then((token) => {
        if (token !== null) {
          reissue({
            variables: token,
          })
            .then(({ data }) => {
              tokenVar(data.reissue);
            })
            .catch(() => {
              TokenRepository.set(null);
            });
        } else {
          if (navigation.getState().routes[0]?.name !== RootNavigations.Auth) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: RootNavigations.Auth }],
              })
            );
          }
        }
      });
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: RootNavigations.Main }],
        })
      );
    }
  }, [token, navigation]);

  return <RootStackNavigator />;
};

export default Main;
