import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';

export default function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white">
      <ScrollView className="space-y-8">
        <View style={{ height: hp(80) }} className="space-y-8">
          <View className="space-y-2 mt-16">
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
          <View className="flex flex-1 justify-center items-center">
            <Image
              source={require('@assets/welcome.png')}
              style={{ height: wp(75), width: wp(75) }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('MainApp')}
          className="bg-emerald-600 mx-5 p-4 rounded-2xl mb-6"
        >
          <Text
            style={{ fontSize: wp(6) }}
            className="text-center font-bold text-white text-2xl"
          >
            Get started
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
