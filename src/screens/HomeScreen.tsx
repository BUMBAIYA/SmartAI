import React, { useState } from 'react';
import { SafeAreaView, View, Image, Text } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Features from '@/components/Features';

export default function HomeScreen() {
  const [messages, setMessages] = useState([]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 mx-5 flex py-8">
        <View className="flex-row justify-center">
          <Image
            source={require('@assets/bot.png')}
            style={{ width: hp(15), height: hp(15) }}
          />
        </View>
        {messages.length > 0 ? (
          <View>
            <Text>Messages</Text>
          </View>
        ) : (
          <Features />
        )}
      </View>
    </SafeAreaView>
  );
}
