import React from 'react';
import { Image, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export type Message = {
  role: 'user' | 'assistant' | 'error';
  content: string;
};

export type AIBaseMessage = {
  content: string;
};

export function AIBaseMessage({ content }: AIBaseMessage) {
  return (
    <View
      style={{ width: wp(70) }}
      className="bg-neutral-100 border border-gray-200 p-2 rounded-lg rounded-tl-none mt-3 px-3"
    >
      <Text className="text-neutral-800" style={{ fontSize: wp(4) }}>
        {content}
      </Text>
    </View>
  );
}

export function AIImageMessage({ content }: AIBaseMessage) {
  return (
    <View className="flex-row justify-start mt-3">
      <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
        <Image
          source={{ uri: content }}
          className="rounded-lg"
          resizeMode="contain"
          style={{ height: wp(60), width: wp(60) }}
        />
      </View>
    </View>
  );
}

export function AIErrorMessage({ content }: AIBaseMessage) {
  return (
    <View
      style={{ width: wp(70) }}
      className="bg-red-100 border border-red-400/40 p-2 rounded-lg rounded-tl-none mt-3 px-3"
    >
      <Text className="text-red-600" style={{ fontSize: wp(4) }}>
        {content}
      </Text>
    </View>
  );
}
