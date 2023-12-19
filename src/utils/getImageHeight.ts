import { useState } from 'react';
import { Image } from 'react-native';

interface GetImageHeightProps {
  url: string;
  width: number;
}

const getImageHeight = ({ url, width }: GetImageHeightProps): number | null => {
  const [result, setResult] = useState<number | null>(null);

  Image.getSize(url, (imageWidth, imageHeight) => {
    setResult((width * imageHeight) / imageWidth);
  });

  return result;
};

export default getImageHeight;
