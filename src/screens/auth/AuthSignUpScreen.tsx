import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { Feather, Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '@/constants/color';

import SingleImagePicker from '@/components/SingleImagePicker';
import CustomButton from '@/components/CustomButton';
import Conditional from '@/hocs/Conditional';
import CustomInput from '@/components/CustomInput';
import SizedBox from '@/components/SizedBox';
import AddressSelector from '@/components/address-selector/AddressSelector';

import { AuthNavigations, AuthStackParamProps } from '@/navigations/stack/auth';
import { SIGN_UP } from '@/operations/auth/mutation/SignUp';
import { generateRNFile } from '@/utils/generateFile';
import { tokenVar } from '@/stores/auth';
import tokenRepository from '@/repository/token.repository';

export const AuthSignUpScreenOptions: StackNavigationOptions = {
  headerTitle: '',
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
};

interface AuthSignUpScreenProps {
  route: AuthStackParamProps<AuthNavigations.SignUp>['route'];
}

const AuthSignUpScreen: React.FC<AuthSignUpScreenProps> = ({ route }) => {
  const [signUp] = SIGN_UP();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [postcode, setPostcode] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');
  const [addressVisible, setAddressVisible] = useState<boolean>(false);

  const buttonDisabled = useMemo<boolean>(
    () =>
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      phone.trim().length === 0 ||
      postcode.trim().length === 0 ||
      address1.trim().length === 0 ||
      address2.trim().length === 0,
    [name, email, phone, postcode, address1, address2]
  );

  const handleAddress = useCallback(() => {
    setAddressVisible(true);
  }, []);

  const handleSubmit = useCallback(async () => {
    signUp({
      variables: {
        type: route.params.type,
        token: route.params.token,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim().replaceAll('-', ''),
        postcode: postcode.trim(),
        address1: address1.trim(),
        address2: address2.trim(),
        profileImage: await generateRNFile(profileImage),
      },
    }).then((res) => {
      tokenRepository.set(res.data.signUp);
      tokenVar(res.data.signUp);
    });
  }, [route, profileImage, name, email, phone, postcode, address1, address2]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAwareScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>회원 정보를 입력해주세요.</Text>
        <View style={styles.profileImageContainer}>
          <SingleImagePicker setImage={setProfileImage}>
            <>
              <Conditional condition={profileImage === null}>
                <View style={styles.emptyProfileImage}>
                  <Feather name="image" size={30} color="rgba(0,0,0,0.15)" />
                </View>
              </Conditional>

              <Conditional condition={profileImage !== null}>
                <Image
                  style={styles.profileImage}
                  source={{ uri: profileImage as string }}
                />
              </Conditional>

              <View style={styles.cameraContainer}>
                <Ionicons name="ios-camera" size={22} color={Colors.black} />
              </View>
            </>
          </SingleImagePicker>
        </View>

        <CustomInput title="이름" text={name} setText={setName} />

        <SizedBox height={30} />

        <CustomInput
          title="이메일"
          text={email}
          setText={setEmail}
          props={{ keyboardType: 'email-address' }}
        />

        <SizedBox height={30} />

        <CustomInput
          title="전화번호"
          text={phone}
          setText={setPhone}
          props={{ keyboardType: 'phone-pad' }}
        />

        <SizedBox height={30} />

        <TouchableOpacity onPress={handleAddress} activeOpacity={1}>
          <View style={styles.postcodeContainer}>
            <CustomInput
              title="주소"
              text={postcode}
              setText={setPostcode}
              editable={false}
            />

            <SizedBox width={8} />

            <CustomButton
              style={styles.postcodeButton}
              labelStyle={styles.postcodeButtonLabel}
              label="주소 검색"
              onPress={handleAddress}
            />
          </View>

          <SizedBox height={20} />

          <CustomInput
            text={address1}
            setText={setAddress1}
            editable={false}
            props={{ placeholder: '주소를 입력해주세요.' }}
          />
        </TouchableOpacity>

        <Conditional condition={postcode.length !== 0 && address1.length !== 0}>
          <>
            <SizedBox height={20} />

            <CustomInput
              text={address2}
              setText={setAddress2}
              props={{ placeholder: '상세 주소를 입력해주세요.' }}
            />
          </>
        </Conditional>

        <SizedBox height={40} />

        <CustomButton
          label="완료"
          onPress={handleSubmit}
          disabled={buttonDisabled}
        />
      </KeyboardAwareScrollView>

      <AddressSelector
        visible={addressVisible}
        setVisible={setAddressVisible}
        setPostCode={setPostcode}
        setAddress={setAddress1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 26,
  },
  container: {
    paddingVertical: 20,
  },
  title: {
    fontWeight: '600',
    fontSize: 22,
    color: Colors.black,
  },
  profileImageContainer: {
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyProfileImage: {
    width: 126,
    height: 126,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
  },
  profileImage: {
    width: 126,
    height: 126,
    borderRadius: 100,
  },
  cameraContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray,
  },
  postcodeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  postcodeButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: '#FFF1E2',
  },
  postcodeButtonLabel: {
    fontWeight: '600',
    fontSize: 13,
    color: Colors.primary,
  },
});

export default AuthSignUpScreen;
