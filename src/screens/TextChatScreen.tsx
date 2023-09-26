import React, { useRef, useState } from 'react';
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
import { chatgptApiCall } from '@/api/OpenAI';
import { useAppSelector } from '@/hooks/useStore';

export default function TextChatScreen() {
  const apiKey = useAppSelector((state) => state.openAIKeyReducer.key);
  const refScrollTextContainer = useRef<ScrollView>(null);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const updateScrollView = () => {
    setTimeout(() => {
      refScrollTextContainer.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  const handleAddQuery = async () => {
    if (query === '') {
      return;
    }
    const newMessage: Message = {
      role: 'user',
      content: query,
    };
    setMessages((prev) => [...prev, newMessage]);
    updateScrollView();
    setQuery('');
    setLoading(true);
    const data = await chatgptApiCall(apiKey, [...messages, newMessage]);
    if (data.success) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message },
      ]);
    }
    updateScrollView();
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 mx-5 flex py-4 space-y-6">
        <View className="flex-row justify-end space-x-3 items-center">
          <Text className="text-gray-700 text-base font-semibold">
            Powered by ChatGPT
          </Text>
          <Image
            source={require('@assets/chatgptIcon.png')}
            style={{ width: hp(4), height: hp(4) }}
          />
        </View>
        <View className="flex-1 border-t-[1px] border-gray-200">
          {messages.length === 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex-1">
                <Text className="text-gray-700 py-4 text-xl font-semibold">
                  Start chating
                </Text>
                <View className="space-y-4">
                  <View className="p-4 py-3 border border-gray-500 rounded-lg">
                    <TouchableOpacity>
                      <Text className="text-gray-700 text-base font-semibold">
                        Brainstorm names
                      </Text>
                      <Text className="text-gray-400 text-base font-semibold">
                        for an orange cat we're adopting
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="p-4 border border-gray-500 rounded-lg">
                    <TouchableOpacity>
                      <Text className="text-gray-700 text-base font-semibold">
                        Interview questions
                      </Text>
                      <Text className="text-gray-400 text-base font-semibold">
                        for MERN stack developer
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="p-4 border border-gray-500 rounded-lg">
                    <TouchableOpacity>
                      <Text className="text-gray-700 text-base font-semibold">
                        What is React Native?
                      </Text>
                      <Text className="text-gray-400 text-base font-semibold">
                        compare with Reactjs
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          ) : (
            <View className="rounded-lg px-4 flex-1">
              <ScrollView
                ref={refScrollTextContainer}
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
                {loading && (
                  <View>
                    <Image
                      source={require('@assets/loading.gif')}
                      className="h-10 w-10"
                    />
                  </View>
                )}
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
