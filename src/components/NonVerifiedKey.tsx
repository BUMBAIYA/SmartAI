import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ArrowTopRightOnSquareIcon } from 'react-native-heroicons/outline';

export default function NonVerifiedKey() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View className="p-4 bg-red-100 flex-row justify-between rounded-lg">
      <Text className="text-base font-semibold text-red-600">
        Verify OpenAI key
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Setting')}
        className="flex-row space-x-1 items-center"
      >
        <Text className="underline -underline-offset-2 text-base text-red-600">
          Setting
        </Text>
        <ArrowTopRightOnSquareIcon size={20} color="#dc2626" />
      </TouchableOpacity>
    </View>
  );
}
