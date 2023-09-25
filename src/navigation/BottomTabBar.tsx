import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  HomeIcon,
  Cog6ToothIcon,
  SquaresPlusIcon,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as MiniHomeIcon,
  Cog6ToothIcon as Cog6ToothMiniIcon,
  SquaresPlusIcon as SquaresPlusMiniIcon,
} from 'react-native-heroicons/mini';
import classNames from '@/utility/css';
import { TabNavigationRoute } from '@/navigation';

type TabIcons = Record<
  TabNavigationRoute,
  { icon: JSX.Element; iconSelected: JSX.Element }
>;

const TabIconsComponents: TabIcons = {
  Chat: {
    icon: <HomeIcon color="#2f3642" className="h-7 w-7" />,
    iconSelected: <MiniHomeIcon color="#15a37f" className="h-7 w-7" />,
  },
  Setting: {
    icon: <Cog6ToothIcon color="#2f3642" className="h-7 w-7" />,
    iconSelected: <Cog6ToothMiniIcon color="#15a37f" className="h-7 w-7" />,
  },
  Feature: {
    icon: <SquaresPlusIcon color="#2f3642" className="h-7 w-7" />,
    iconSelected: <SquaresPlusMiniIcon color="#15a37f" className="h-7 w-7" />,
  },
};

export default function MyAppBottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="flex-row justify-around items-center py-2 bg-white border-t-[1px] border-gray-500/20 shadow-md">
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
            className="flex-col gap-1 items-center"
          >
            {isFocused
              ? TabIconsComponents[routeName].iconSelected
              : TabIconsComponents[routeName].icon}
            <Text
              className={classNames(
                'text-base',
                isFocused ? 'text-emerald-600 font-semibold' : 'text-gray-700',
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
