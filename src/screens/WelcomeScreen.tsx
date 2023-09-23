import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';

export default function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white">
      <View className="space-y-2">
        <Text
          style={{ fontSize: wp(10) }}
          className="text-center font-bold text-gray-700"
        >
          Jarvis
        </Text>
        <Text
          style={{ fontSize: wp(4) }}
          className="text-center tracking-wider text-gray-600 font-semibold"
        >
          Future is here, powered by AI.
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Image source={require('@assets/welcome.png')} className="w-72 h-72" />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="bg-emerald-600 mx-5 p-4 rounded-2xl"
      >
        <Text
          style={{ fontSize: wp(6) }}
          className="text-center font-bold text-white text-2xl"
        >
          Get started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
