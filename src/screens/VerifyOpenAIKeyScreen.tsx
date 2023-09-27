import { chatgptApiCall } from '@/api/OpenAI';
import KeyVerificationError from '@/components/KeyVerificationFailed';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { OPENAI_GENERATE_KEY_URL } from '@/constants/OpenAILinks';
import { setKeyVerified, setStoreAPIKey } from '@/store/openAIApiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowTopRightOnSquareIcon,
  CheckBadgeIcon,
} from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function VerifyOpenAIKeyScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const openAIKey = useAppSelector((state) => state.openAIKeyReducer.key);
  const [apiKey, setApiKey] = useState(openAIKey);
  const [verifying, setVerifying] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isKeyVerified, setIsKeyVerified] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenAIDashboard = useCallback(async () => {
    const supportedUrl = await Linking.canOpenURL(OPENAI_GENERATE_KEY_URL);
    if (supportedUrl) {
      await Linking.openURL(OPENAI_GENERATE_KEY_URL);
    }
  }, []);

  const handleSaveApiKey = async () => {
    dispatch(setKeyVerified(false));
    setVerifying(true);
    const data = await chatgptApiCall(apiKey, [
      { role: 'user', content: 'Are you available? yes or no' },
    ]);
    if (data.success) {
      setIsKeyVerified(true);
      setShowError(false);
    } else {
      setIsKeyVerified(false);
      setShowError(true);
    }
    await AsyncStorage.setItem('api-key', apiKey);
    dispatch(setStoreAPIKey(apiKey));
    setVerifying(false);
  };

  const handleEnterApp = async () => {
    await AsyncStorage.setItem('api-key-verified', 'true');
    dispatch(setKeyVerified(true));
    navigation.navigate('MainApp');
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-1 space-y-4">
          <View className="flex-row justify-center mt-6">
            <View className="flex-col items-center">
              <Image
                source={require('@assets/dalleIcon.png')}
                style={{ height: hp(10), width: hp(10) }}
              />
              <Text
                style={{ fontSize: wp(8) }}
                className="font-bold text-gray-700"
              >
                OpenAI
              </Text>
            </View>
          </View>
          <View className="p-4 border border-gray-600 rounded-lg space-y-2">
            <Text className="text-xl text-gray-700 font-semibold">
              Generate key
            </Text>
            <Text className="text-base">
              Please generate a valid OpenAI key from your OpenAI dashboard.
              Link below
            </Text>
            <View className="flex flex-row justify-end">
              <TouchableOpacity
                onPress={handleOpenAIDashboard}
                className="flex-row space-x-1 items-center"
              >
                <Text className="underline font-semibold -underline-offset-2 text-lg text-emerald-600">
                  OpenAI key
                </Text>
                <ArrowTopRightOnSquareIcon size={20} color="#059669" />
              </TouchableOpacity>
            </View>
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
          <TouchableOpacity
            onPress={handleSaveApiKey}
            className="space-x-2 bg-emerald-100 border items-center border-emerald-300 flex-row justify-center rounded-lg px-4 py-3"
          >
            {verifying && (
              <Image
                source={require('@assets/loading.gif')}
                style={{ height: wp(7), width: wp(7) }}
              />
            )}
            {isKeyVerified && (
              <CheckBadgeIcon color="#009669" size={30} className="h-9 w-9" />
            )}
            <Text
              style={{ fontSize: wp(5) }}
              className="text-lg font-semibold text-emerald-600"
            >
              {verifying ? 'Verifying' : isKeyVerified ? 'Verified' : 'Verify'}
            </Text>
          </TouchableOpacity>
          {showError && <KeyVerificationError />}
        </View>
        {isKeyVerified && (
          <TouchableOpacity
            onPress={handleEnterApp}
            className="mt-8 p-4 flex-row justify-center bg-emerald-600 rounded-lg"
          >
            <Text
              style={{ fontSize: wp(6) }}
              className="font-bold text-gray-100"
            >
              Proceed
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
