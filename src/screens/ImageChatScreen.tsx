import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PaperAirplaneIcon } from 'react-native-heroicons/mini';
import { UserMessage } from '@/components/UserMessage';
import { AIBaseMessage, Message } from '@/components/AIMessage';

export default function ImageChatScreen() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleAddQuery = () => {
    if (query === '') {
      return;
    }
    const newMessage: Message = {
      role: 'user',
      content: query,
    };
    setMessages((prev) => [...prev, newMessage]);
    setQuery('');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 mx-5 flex py-4 space-y-6">
        <View className="flex-row justify-end space-x-3 items-center">
          <Text className="text-gray-700 text-base font-semibold">
            Powered by DALL-E
          </Text>
          <Image
            source={require('@assets/dalleIcon.png')}
            style={{ width: hp(4), height: hp(4) }}
          />
        </View>
        <View className="flex-1">
          {messages.length === 0 ? null : (
            <View className="bg-neutral-200 rounded-lg p-4 flex-1">
              <ScrollView
                bounces={false}
                className="space-y-4"
                showsVerticalScrollIndicator={false}
              >
                {messages.map((message, index) => {
                  if (message.role === 'assistant') {
                    return (
                      <AIBaseMessage key={index} content={message.content} />
                    );
                  }
                  return <UserMessage key={index} content={message.content} />;
                })}
              </ScrollView>
            </View>
          )}
        </View>
        <View className="border w-full items-center space-x-4 border-gray-500 rounded-lg flex flex-row px-5 py-1 bg-white">
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Chat"
            className="flex-1 text-base"
          />
          <TouchableOpacity onPress={handleAddQuery}>
            <PaperAirplaneIcon color="green" className="h-4 w-4" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
