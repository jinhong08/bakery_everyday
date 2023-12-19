import React, { useCallback, useMemo } from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useDimensions } from '@react-native-community/hooks';

import { Colors } from '@/constants/color';
import Conditional from '@/hocs/Conditional';

interface MultiImageSelectorModalItemProps {
  asset: MediaLibrary.Asset;
  sequence: number;
  select: (image: MediaLibrary.Asset) => void;
}

const MultiImageSelectorModalItem: React.FC<
  MultiImageSelectorModalItemProps
> = ({ asset, sequence, select }) => {
  const { screen } = useDimensions();

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      width: screen.width / 3,
      height: screen.width / 3,
    }),
    [screen]
  );

  const imageStyle = useMemo<StyleProp<ImageStyle>>(
    () => ({
      width: screen.width / 3 - 1,
      height: screen.width / 3 - 1,
      borderWidth: sequence !== -1 ? 4 : 0,
      borderColor: sequence !== -1 ? Colors.primary : null,
    }),
    [screen, sequence]
  );

  const sequenceContainer = useMemo<StyleProp<ViewStyle>>(
    () => ({
      backgroundColor: sequence !== -1 ? Colors.primary : Colors.lightGray,
    }),
    [sequence]
  );

  const handleOnPress = useCallback(() => {
    select(asset);
  }, [asset, select]);

  return (
    <TouchableOpacity onPress={handleOnPress} activeOpacity={0.65}>
      <View style={[styles.container, containerStyle]}>
        <Image
          style={imageStyle}
          source={{ uri: asset.uri }}
          resizeMode="cover"
        />

        <View style={[styles.sequenceContainer, sequenceContainer]}>
          <Conditional condition={sequence !== -1}>
            <Text style={styles.sequence}>{sequence + 1}</Text>
          </Conditional>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  sequenceContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 23,
    height: 23,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sequence: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.black,
  },
});

export default React.memo(MultiImageSelectorModalItem);
