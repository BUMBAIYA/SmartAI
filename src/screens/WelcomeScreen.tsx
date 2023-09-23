import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white">
      <View className="space-y-2">
        <Text className="text-center text-4xl font-bold text-gray-700">
          Jarvis
        </Text>
        <Text className="text-center tracking-wider text-gray-600 font-semibold">
          Future is here, powered by AI.
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Image source={require('@assets/welcome.png')} className="w-72 h-72" />
      </View>
    </SafeAreaView>
  );
}
