import React, { useCallback, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '@/screens/WelcomeScreen';
import FeatureScreen from '@/screens/FeaturesScreen';
import TextChatScreen from '@/screens/TextChatScreen';
import SettingScreen from '@/screens/SettingScreen';
import MyAppBottomTabBar from '@/navigation/BottomTabBar';
import ImageChatScreen from '@/screens/ImageChatScreen';
import { useAppDispatch } from '@/hooks/useStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setKeyVerified, setStoreAPIKey } from '@/store/openAIApiSlice';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export type TabNavigationRoute = 'Chat' | 'Setting' | 'Feature' | 'Image';

type TabRoutes = Record<TabNavigationRoute, string>;

export const TabRoutes: TabRoutes = {
  Chat: 'Chat',
  Feature: 'Feature',
  Setting: 'Setting',
  Image: 'Image',
};

function MainApp() {
  return (
    <Tab.Navigator
      tabBar={MyAppBottomTabBar}
      screenOptions={{ headerShown: false }}
      initialRouteName={TabRoutes.Chat}
    >
      <Tab.Screen name={TabRoutes.Feature} component={FeatureScreen} />
      <Tab.Screen name={TabRoutes.Chat} component={TextChatScreen} />
      <Tab.Screen name={TabRoutes.Image} component={ImageChatScreen} />
      <Tab.Screen name={TabRoutes.Setting} component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  const dispatch = useAppDispatch();
  const loadAPIKey = useCallback(async () => {
    const key = await AsyncStorage.getItem('api-key');
    const isVerifiedKey = await AsyncStorage.getItem('api-key-verified');
    if (key) {
      dispatch(setStoreAPIKey(key));
    }
    if (isVerifiedKey) {
      dispatch(setKeyVerified(Boolean(isVerifiedKey)));
    }
  }, [dispatch]);

  useEffect(() => {
    loadAPIKey();
  }, [loadAPIKey]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Welcome"
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="MainApp" component={MainApp} />
          <Stack.Screen name="Feature" component={FeatureScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
