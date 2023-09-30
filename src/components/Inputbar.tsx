import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { PaperAirplaneIcon } from 'react-native-heroicons/mini';

export type InputbarProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleQuery: (prompt: string) => Promise<void>;
};

export default function Inputbar({
  query,
  setQuery,
  handleQuery,
}: InputbarProps) {
  return (
    <View className="border w-full items-center space-x-4 border-gray-500 rounded-lg flex flex-row px-3 py-0">
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Chat"
        className="flex-1 text-sm text-zinc-700 dark:text-zinc-100"
      />
      <TouchableOpacity onPress={() => handleQuery(query)}>
        <PaperAirplaneIcon color="#15a37f" className="h-4 w-4" />
      </TouchableOpacity>
    </View>
  );
}
