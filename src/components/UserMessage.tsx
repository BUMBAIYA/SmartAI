import React from 'react';
import { Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export type UserMessage = {
  content: string;
};

export function UserMessage({ content }: UserMessage) {
  return (
    <View className="flex-row justify-end mt-3">
      <View
        style={{ width: wp(70) }}
        className="bg-emerald-100 p-2 rounded-lg px-3"
      >
        <Text style={{ fontSize: wp(4) }} className="text-neutral-800">
          {content}
        </Text>
      </View>
    </View>
  );
}
