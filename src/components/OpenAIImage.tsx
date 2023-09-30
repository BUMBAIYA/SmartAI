import React from 'react';
import { Image } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type OpenAIImageProps = {
  colorScheme: 'light' | 'dark';
};

export default function OpenAIImage({ colorScheme }: OpenAIImageProps) {
  return colorScheme === 'light' ? (
    <Image
      source={require('@assets/dalleIcon.png')}
      style={{ width: hp(4), height: hp(4) }}
    />
  ) : (
    <Image
      source={require('@assets/openaiDark.png')}
      style={{ width: hp(4), height: hp(4) }}
    />
  );
}
