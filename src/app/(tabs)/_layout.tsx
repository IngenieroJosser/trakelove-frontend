import { Tabs } from 'expo-router';
import { Bell, Clock3, Map, MapPinned, Settings } from 'lucide-react-native';

import { Palette, Shadow } from '@/constants/theme';

const icons = {
  index: Map,
  history: Clock3,
  places: MapPinned,
  alerts: Bell,
  settings: Settings,
};

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
          tabBarIcon: ({ color, size, focused }) => (
            <Icon color={color} size={focused ? size + 1 : size} strokeWidth={focused ? 2.6 : 2} />
          ),
        };
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Mapa' }} />
      <Tabs.Screen name="history" options={{ title: 'Historial' }} />
      <Tabs.Screen name="places" options={{ title: 'Lugares' }} />
      <Tabs.Screen name="alerts" options={{ title: 'Alertas' }} />
      <Tabs.Screen name="settings" options={{ title: 'Ajustes' }} />
    </Tabs>
  );
}
