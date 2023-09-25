import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '@/screens/WelcomeScreen';
import FeatureScreen from '@/screens/FeaturesScreen';
import TextChatScreen from '@/screens/TextChatScreen';
import SettingScreen from '@/screens/SettingScreen';
import MyAppBottomTabBar from '@/navigation/BottomTabBar';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export type TabNavigationRoute = 'Chat' | 'Setting' | 'Feature';

type TabRoutes = Record<TabNavigationRoute, string>;

export const TabRoutes: TabRoutes = {
  Chat: 'Chat',
  Feature: 'Feature',
  Setting: 'Setting',
};

function MainApp() {
  return (
    <Tab.Navigator
      tabBar={MyAppBottomTabBar}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name={TabRoutes.Feature} component={FeatureScreen} />
      <Tab.Screen name={TabRoutes.Chat} component={TextChatScreen} />
      <Tab.Screen name={TabRoutes.Setting} component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
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
