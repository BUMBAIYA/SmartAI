import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function SettingScreen() {
  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white">
      <ScrollView className="space-y-8">
        <View className="space-y-2 mt-4">
          <Text
            style={{ fontSize: wp(10) }}
            className="font-bold text-gray-700"
          >
            Setting
          </Text>
          <Text
            style={{ fontSize: wp(4) }}
            className="text-center tracking-wider text-gray-600 font-semibold"
          >
            Setting app data
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
