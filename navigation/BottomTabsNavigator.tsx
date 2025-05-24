import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { Feather } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Favorites: undefined;
  Cart: undefined;
  Notifications: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: RouteProp<TabParamList, keyof TabParamList> }) =>
        ({
          headerShown: false,
          tabBarActiveTintColor: '#C77B4D',
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: '#ddd',
            backgroundColor: '#fff',
            paddingVertical: 8,
            height: 60,
          },
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            let iconName: keyof typeof Feather.glyphMap;

            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Favorites') iconName = 'heart';
            else if (route.name === 'Cart') iconName = 'shopping-bag';
            else iconName = 'bell';

            return <Feather name={iconName} size={size} color={color} />;
          },
        } as BottomTabNavigationOptions)
      }
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}
