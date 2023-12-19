import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';

export const generateRNFile = async (
  asset: string | MediaLibrary.Asset,
  name = `picture-${Date.now()}`
) => {
  const uri =
    typeof asset === 'string'
      ? asset
      : Platform.select({
          ios: await MediaLibrary.getAssetInfoAsync(asset).then(
            (it) => it.localUri
          ),
          android: asset.uri,
        });

  return asset
    ? new ReactNativeFile({
        uri,
        type: mime.lookup(uri) || 'image',
        name: `${name}.${mime.lookup(uri).replace('image/', '')}`,
      })
    : null;
};
