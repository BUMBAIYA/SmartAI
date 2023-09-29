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
import { OPENAI_GENERATE_KEY_URL } from '@/constants/OpenAILinks';
import { useColorScheme } from 'nativewind';

export default function SettingScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const openAIKey = useAppSelector((state) => state.openAIKeyReducer.key);
  const isKeyVerified = useAppSelector(
    (state) => state.openAIKeyReducer.verified,
  );
  const [apiKey, setApiKey] = useState(openAIKey);
  const [verifying, setVerifying] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenAIDashboard = useCallback(async () => {
    const supportedUrl = await Linking.canOpenURL(OPENAI_GENERATE_KEY_URL);
    if (supportedUrl) {
      await Linking.openURL(OPENAI_GENERATE_KEY_URL);
    }
  }, []);

  const handleSaveApiKey = async () => {
    setVerifying(true);
    const data = await chatgptApiCall(apiKey, [
      { role: 'user', content: 'Are you available? yes or no' },
    ]);
    dispatch(setStoreAPIKey(apiKey));
    if (data.success) {
      if (!isKeyVerified) {
        await AsyncStorage.setItem('api-key-verified', 'true');
        dispatch(setKeyVerified(true));
      }
      setShowError(false);
    } else {
      await AsyncStorage.setItem('api-key-verified', '');
      dispatch(setKeyVerified(false));
      setShowError(true);
    }
    await AsyncStorage.setItem('api-key', apiKey);
    setVerifying(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-900 px-4 pt-4">
      <ScrollView className="space-y-8">
        <View className="space-y-8">
          <Text
            style={{ fontSize: wp(6.5) }}
            className="font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Setting
          </Text>
          <View className="p-4 border dark:bg-emerald-600 border-gray-600 rounded-lg space-y-2">
            <Text className="text-xl text-zinc-900 dark:text-zinc-100 font-semibold">
              Generate key
            </Text>
            <Text className="text-base dark:text-emerald-100">
              Please generate a valid OpenAI key from your OpenAI dashboard.
              Link below
            </Text>
            <View className="flex flex-row justify-end">
              <TouchableOpacity
                onPress={handleOpenAIDashboard}
                className="flex-row space-x-1 items-center"
              >
                <Text className="underline font-semibold -underline-offset-2 text-lg text-emerald-600 dark:text-zinc-100">
                  OpenAI key
                </Text>
                <ArrowTopRightOnSquareIcon
                  size={20}
                  color={colorScheme === 'light' ? '#059669' : '#f4f4f4'}
                  className="dark:text-emerald-200"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="space-y-2">
            <Text className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
              OpenAI API Key
            </Text>
            <View className="px-2 space-y-2 border border-gray-500 rounded-lg">
              <TextInput
                value={apiKey}
                onChangeText={setApiKey}
                numberOfLines={2}
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
                style={{ height: wp(8), width: wp(8) }}
              />
            )}
            {isKeyVerified && !verifying && (
              <CheckBadgeIcon color="#009669" size={wp(8)} />
            )}
            <TouchableOpacity
              onPress={handleSaveApiKey}
              className="bg-emerald-100 dark:bg-emerald-600 px-3 py-1 rounded-lg border border-emerald-600/40"
            >
              <Text className="text-lg text-zinc-900 dark:text-zinc-100 font-semibold">
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
