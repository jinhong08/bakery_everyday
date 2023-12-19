import React, { useCallback, useEffect } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface SingleImagePickerProps {
  children: JSX.Element;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  style?: StyleProp<ViewStyle>;
}

const SingleImagePicker: React.FC<SingleImagePickerProps> = ({
  setImage,
  children,
  style,
}) => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    if (
      status !== null &&
      status.status === ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      requestPermission();
    }
  }, [status]);

  const handleOnPress = useCallback(async () => {
    if (
      status !== null &&
      status.status !== ImagePicker.PermissionStatus.GRANTED
    ) {
      await requestPermission();
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result['uri']);
    }
  }, [status]);

  return (
    <TouchableOpacity
      style={style}
      onPress={handleOnPress}
      activeOpacity={0.65}
    >
      {children}
    </TouchableOpacity>
  );
};

export default SingleImagePicker;
