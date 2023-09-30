import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  ChatBubbleBottomCenterIcon,
  Cog6ToothIcon,
  SquaresPlusIcon,
  PhotoIcon,
  XMarkIcon,
} from 'react-native-heroicons/outline';
import {
  ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterMiniIcon,
  Cog6ToothIcon as Cog6ToothMiniIcon,
  SquaresPlusIcon as SquaresPlusMiniIcon,
  PhotoIcon as PhotoMiniIcon,
} from 'react-native-heroicons/mini';
import classNames from '@/utility/css';
import { TabNavigationRoute } from '@/navigation';
import { useColorScheme } from 'nativewind';

type BottomTabbarIconProps = {
  route: TabNavigationRoute;
  isFocused: boolean;
};

function BottomTabbarIcon({ route, isFocused }: BottomTabbarIconProps) {
  const { colorScheme } = useColorScheme();
  switch (route) {
    case 'Feature': {
      return isFocused ? (
        <SquaresPlusMiniIcon color="#15a37f" className="h-7 w-7" />
      ) : (
        <SquaresPlusIcon
          color={colorScheme === 'light' ? '#18181b' : '#f4f4f5'}
          className="h-7 w-7"
        />
      );
    }
    case 'Chat': {
      return isFocused ? (
        <ChatBubbleBottomCenterMiniIcon color="#15a37f" className="h-7 w-7" />
      ) : (
        <ChatBubbleBottomCenterIcon
          color={colorScheme === 'light' ? '#18181b' : '#f4f4f5'}
          className="h-7 w-7"
        />
      );
    }
    case 'Image': {
      return isFocused ? (
        <PhotoMiniIcon color="#15a37f" className="h-7 w-7" />
      ) : (
        <PhotoIcon
          color={colorScheme === 'light' ? '#18181b' : '#f4f4f5'}
          className="h-7 w-7"
        />
      );
    }
    case 'Setting': {
      return isFocused ? (
        <Cog6ToothMiniIcon color="#15a37f" className="h-7 w-7" />
      ) : (
        <Cog6ToothIcon
          color={colorScheme === 'light' ? '#18181b' : '#f4f4f5'}
          className="h-7 w-7"
        />
      );
    }
    default: {
      return <XMarkIcon color="#18181b" className="h-7 w-7" />;
    }
  }
}

export default function MyAppBottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-row justify-around items-center py-2 bg-white dark:bg-zinc-900 border-t-[1px] border-gray-500/20 shadow-md">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // TODO: preserve screen params on screen change
            // Older Version: merge: true option on navigate
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const routeName = route.name as TabNavigationRoute;

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-col gap-1 items-center py-1"
          >
            <BottomTabbarIcon isFocused={isFocused} route={routeName} />
            <Text
              className={classNames(
                'text-sm',
                isFocused
                  ? 'text-emerald-600 font-semibold'
                  : colorScheme === 'light'
                  ? 'text-zinc-900'
                  : 'text-zinc-100',
              )}
            >
              {typeof label === 'string' && label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
