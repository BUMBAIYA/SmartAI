import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Image,
} from 'react-native';
import { ArrowTopRightOnSquareIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBadgeIcon } from 'react-native-heroicons/outline';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { setStoreAPIKey, setKeyVerified } from '@/store/openAIApiSlice';
import { chatgptApiCall } from '@/api/OpenAI';
import KeyVerificationError from '@/components/KeyVerificationFailed';

const API_KEY_URL = 'https://platform.openai.com/account/api-keys';

export default function SettingScreen() {
  const openAIKey = useAppSelector((state) => state.openAIKeyReducer.key);
  const isKeyVerified = useAppSelector(
    (state) => state.openAIKeyReducer.verified,
  );
  const [apiKey, setApiKey] = useState(openAIKey);
  const [verifying, setVerifying] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenAIDashboard = useCallback(async () => {
    const supportedUrl = await Linking.canOpenURL(API_KEY_URL);
    if (supportedUrl) {
      await Linking.openURL(API_KEY_URL);
    }
  }, []);

  const handleSaveApiKey = async () => {
    dispatch(setKeyVerified(false));
    setVerifying(true);
    const data = await chatgptApiCall(apiKey, [
      { role: 'user', content: 'Are you available? yes or no' },
    ]);
    if (data.success) {
      await AsyncStorage.setItem('api-key-verified', 'true');
      dispatch(setKeyVerified(true));
      setShowError(false);
    } else {
      await AsyncStorage.setItem('api-key-verified', '');
      dispatch(setKeyVerified(false));
      setShowError(true);
    }
    await AsyncStorage.setItem('api-key', apiKey);
    dispatch(setStoreAPIKey(apiKey));
    setVerifying(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <ScrollView className="space-y-8">
        <View className="space-y-4">
          <Text
            style={{ fontSize: wp(6.5) }}
            className="font-semibold text-gray-700"
          >
            Setting
          </Text>
          <View className="p-4 bg-emerald-100 rounded-lg space-y-2">
            <Text className="text-xl text-emerald-600 font-semibold">
              Important
            </Text>
            <Text className="text-base">
              Please generate a valid OpenAI key from your OpenAI dashboard.
            </Text>
            <TouchableOpacity
              onPress={handleOpenAIDashboard}
              className="flex-row space-x-1 items-center"
            >
              <Text className="underline -underline-offset-2 text-base text-emerald-600">
                OpenAI key
              </Text>
              <ArrowTopRightOnSquareIcon size={20} color="#059669" />
            </TouchableOpacity>
          </View>
          <View className="space-y-2">
            <Text className="font-semibold text-lg text-gray-700">
              OpenAI API Key
            </Text>
            <View className="px-3 space-y-2 py-1 border border-gray-500 rounded-lg">
              <TextInput
                value={apiKey}
                onChangeText={setApiKey}
                numberOfLines={3}
                placeholder="API KEY"
                style={{ textAlignVertical: 'top' }} // eslint-disable-line react-native/no-inline-styles
                className="text-base"
                spellCheck={false}
                autoCorrect={false}
                multiline
              />
            </View>
          </View>
          <View className="flex flex-row space-x-2 items-center justify-end">
            {verifying && (
              <Image
                source={require('@assets/loading.gif')}
                className="h-9 w-9"
              />
            )}
            {isKeyVerified && (
              <CheckBadgeIcon color="#009669" size={30} className="h-9 w-9" />
            )}
            <TouchableOpacity
              onPress={handleSaveApiKey}
              className="bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-600/40"
            >
              <Text className="text-lg font-semibold">
                {verifying
                  ? 'Verifying'
                  : isKeyVerified
                  ? 'Verified'
                  : 'Verify'}
              </Text>
            </TouchableOpacity>
          </View>
          {showError && <KeyVerificationError />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
