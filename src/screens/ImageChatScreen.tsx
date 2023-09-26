import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ScrollView,
  Keyboard,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AIChatComponent from '@/components/TextChatComponent';
import DefaultTextChatComponent from '@/components/DefaultTextChatComponent';
import Inputbar from '@/components/Inputbar';
import { Message } from '@/components/AIMessage';
import { dalleApiCall } from '@/api/OpenAI';
import { useAppSelector } from '@/hooks/useStore';
import { DefaultImageGenerationButtons } from '@/constants/DefaultImageGenerationButton';
import NonVerifiedKey from '@/components/NonVerifiedKey';

export default function ImageChatScreen() {
  const apiKey = useAppSelector((state) => state.openAIKeyReducer.key);
  const isKeyVerified = useAppSelector(
    (state) => state.openAIKeyReducer.verified,
  );
  const refScrollTextContainer = useRef<ScrollView>(null);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const updateScrollView = () => {
    setTimeout(() => {
      refScrollTextContainer.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  const handleAddQuery = async (prompt: string) => {
    if (prompt === '') {
      return;
    }
    const newMessage: Message = {
      role: 'user',
      content: prompt,
    };
    Keyboard.dismiss();
    setMessages((prev) => [...prev, newMessage]);
    updateScrollView();
    setQuery('');
    setLoading(true);
    const data = await dalleApiCall(apiKey, prompt);
    if (data.success) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: 'error', content: 'Request failed' },
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
            Powered by DALL-E
          </Text>
          <Image
            source={require('@assets/dalleIcon.png')}
            style={{ width: hp(4), height: hp(4) }}
          />
        </View>
        <View className="flex-1 pb-4">
          {messages.length === 0 ? (
            <DefaultTextChatComponent
              title="Generate image"
              buttons={DefaultImageGenerationButtons}
              handleClick={handleAddQuery}
            />
          ) : (
            <AIChatComponent
              scrollRef={refScrollTextContainer}
              type="image"
              loading={loading}
              messages={messages}
            />
          )}
        </View>
        {isKeyVerified ? (
          <Inputbar
            query={query}
            setQuery={setQuery}
            handleQuery={handleAddQuery}
          />
        ) : (
          <NonVerifiedKey />
        )}
      </View>
    </SafeAreaView>
  );
}
