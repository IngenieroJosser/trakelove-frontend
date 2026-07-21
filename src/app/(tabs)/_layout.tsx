import { Tabs } from 'expo-router';
import { Bell, Clock3, Heart, Map, MapPin, UserRound } from 'lucide-react-native';
import { View } from 'react-native';

import { Palette, Shadow } from '@/constants/theme';

const icons = {
  index: Map,
  history: Clock3,
  alerts: Bell,
  settings: UserRound,
};

function PlacesTabIcon({ color, size, focused }: { color: string; size: number; focused: boolean }) {
  const iconSize = focused ? size + 2 : size;

  return (
    <View style={{ width: iconSize + 7, height: iconSize + 7, alignItems: 'center', justifyContent: 'center' }}>
      <MapPin color={color} size={iconSize + 3} strokeWidth={focused ? 2.6 : 2.2} />
      <Heart
        color={color}
        fill={focused ? color : 'transparent'}
        size={Math.max(9, iconSize * 0.38)}
        strokeWidth={2.5}
        style={{ position: 'absolute', top: iconSize * 0.28 }}
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const Icon = icons[route.name as keyof typeof icons] ?? Map;
        return {
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: Palette.primary,
          tabBarInactiveTintColor: '#8E8799',
          tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginTop: 2 },
          tabBarStyle: {
            height: 78,
            paddingTop: 8,
            paddingBottom: 12,
            backgroundColor: Palette.white,
            borderTopColor: Palette.border,
            ...Shadow.soft,
          },
          tabBarIcon: ({ color, size, focused }) =>
            route.name === 'places' ? (
              <PlacesTabIcon color={color} size={size} focused={focused} />
            ) : (
              <Icon color={color} size={focused ? size + 1 : size} strokeWidth={focused ? 2.6 : 2} />
            ),
        };
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Mapa' }} />
      <Tabs.Screen name="places" options={{ title: 'Lugares' }} />
      <Tabs.Screen name="history" options={{ title: 'Historial' }} />
      <Tabs.Screen name="alerts" options={{ title: 'Alertas' }} />
      <Tabs.Screen name="settings" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
