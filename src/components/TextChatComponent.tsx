import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import {
  AIBaseMessage,
  AIErrorMessage,
  AIImageMessage,
  Message,
} from '@/components/AIMessage';
import { UserMessage } from '@/components/UserMessage';

export type TextChatComponent = {
  scrollRef: React.RefObject<ScrollView>;
  messages: Message[];
  loading: boolean;
  type: 'text' | 'image';
};

export default function TextChatComponent({
  scrollRef,
  type,
  messages,
  loading,
}: TextChatComponent) {
  return (
    <View className="rounded-lg px-4 flex-1">
      <ScrollView
        ref={scrollRef}
        bounces={false}
        className="space-y-4"
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => {
          if (message.role === 'assistant') {
            if (type === 'image') {
              return <AIImageMessage key={index} content={message.content} />;
            }
            return <AIBaseMessage key={index} content={message.content} />;
          }
          if (message.role === 'error') {
            return <AIErrorMessage key={index} content={message.content} />;
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
  );
}
