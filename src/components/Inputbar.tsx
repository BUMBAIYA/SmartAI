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
    <View className="border w-full items-center space-x-4 border-gray-500 rounded-lg flex flex-row px-5 py-1 bg-white">
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Chat"
        className="flex-1 text-base"
      />
      <TouchableOpacity onPress={() => handleQuery(query)}>
        <PaperAirplaneIcon color="green" className="h-4 w-4" />
      </TouchableOpacity>
    </View>
  );
}
