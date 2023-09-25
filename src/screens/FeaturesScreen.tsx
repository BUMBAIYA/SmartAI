import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function FeatureScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4 space-y-6">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="space-y-4 flex-1"
      >
        <Text
          style={{ fontSize: wp(6.5) }}
          className="font-semibold text-gray-700 mt-4"
        >
          Features
        </Text>
        <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
          <View className="flex-row items-center space-x-2">
            <Image
              source={require('@assets/chatgptIcon.png')}
              style={{ height: hp(4), width: hp(4) }}
            />
            <Text
              style={{ fontSize: wp(4.8) }}
              className="font-semibold text-gray-700"
            >
              ChatGPT
            </Text>
          </View>
          <Text
            style={{ fontSize: wp(3.8) }}
            className="font-medium text-gray-700"
          >
            ChatGPT can provide you with instant and knowledgeable response,
            assist you with creative ideas.
          </Text>
        </View>
        <View className="bg-purple-200 p-4 rounded-xl space-y-2">
          <View className="flex-row items-center space-x-2">
            <Image
              source={require('@assets/dalleIcon.png')}
              style={{ height: hp(4), width: hp(4) }}
            />
            <Text
              style={{ fontSize: wp(4.8) }}
              className="font-semibold text-gray-700"
            >
              DALL-E
            </Text>
          </View>
          <Text
            style={{ fontSize: wp(3.8) }}
            className="font-medium text-gray-700"
          >
            DALL-E can generate imaginative and diverse images from textual
            descriptions, expanding the boundaries of visual creativity.
          </Text>
        </View>
        <View className="bg-cyan-200 p-4 rounded-xl space-y-2">
          <View className="flex-row items-center space-x-2">
            <Image
              source={require('@assets/smartaiIcon.png')}
              style={{ height: hp(4), width: hp(4) }}
            />
            <Text
              style={{ fontSize: wp(4.8) }}
              className="font-semibold text-gray-700"
            >
              Smart AI
            </Text>
          </View>
          <Text
            style={{ fontSize: wp(3.8) }}
            className="font-medium text-gray-700"
          >
            A powerful voice assistant with the abilities of ChatGPT and Dall-E,
            providing you the best of both worlds.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
