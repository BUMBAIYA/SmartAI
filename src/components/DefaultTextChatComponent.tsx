import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export type ButtonData = {
  title: string;
  desc: string;
};

export type DefaultTextChatComponentProps = {
  handleClick: (prompt: string) => Promise<void>;
  title: string;
  buttons: ButtonData[];
};

export default function DefaultTextChatComponent({
  handleClick,
  title,
  buttons,
}: DefaultTextChatComponentProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1">
        <Text className="text-zinc-700 dark:text-zinc-100 py-4 text-xl font-semibold">
          {title}
        </Text>
        <View className="space-y-4">
          {buttons.map((btn) => (
            <ChatDefaultButton
              key={btn.title}
              title={btn.title}
              desc={btn.desc}
              handleClick={handleClick}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

type ChatDefaultButtonProps = ButtonData &
  Pick<DefaultTextChatComponentProps, 'handleClick'>;

function ChatDefaultButton({
  title,
  desc,
  handleClick,
}: ChatDefaultButtonProps) {
  return (
    <View className="p-4 py-3 border my-2 border-gray-500 rounded-lg">
      <TouchableOpacity onPress={() => handleClick(`${title}, ${desc}`)}>
        <Text className="text-zinc-700 dark:text-zinc-100 text-base font-semibold">
          {title}
        </Text>
        <Text className="text-zinc-400 text-base font-semibold">{desc}</Text>
      </TouchableOpacity>
    </View>
  );
}
