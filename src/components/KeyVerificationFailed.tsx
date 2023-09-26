import React from 'react';
import { Text, View } from 'react-native';

export default function KeyVerificationError() {
  return (
    <View className="w-full p-4 bg-red-100 rounded-lg mt-4">
      <Text className="text-base font-semibold underline text-red-600">
        Failed to verify API Key
      </Text>
      <Text className="text-base text-red-500">* Incorrect API key</Text>
      <Text className="text-base text-red-500">* Key may be expired</Text>
      <Text className="text-base text-red-500">
        * Account quota may be exceeded
      </Text>
    </View>
  );
}
