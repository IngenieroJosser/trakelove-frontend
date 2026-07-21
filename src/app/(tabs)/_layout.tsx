import { Tabs } from 'expo-router';
import { Bell, Clock3, Heart, Map, MapPin, UserRound } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { Palette, Shadow } from '@/constants/theme';

const icons = {
  index: Map,
  history: Clock3,
  alerts: Bell,
  settings: UserRound,
};

function PlacesTabIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <View style={[styles.placeIconWrap, focused && styles.placeIconWrapActive]}>
      <MapPin color={color} size={focused ? 27 : 25} strokeWidth={focused ? 2.6 : 2.1} />
      <Heart
        color={color}
        fill={focused ? color : 'transparent'}
        size={9}
        strokeWidth={2.4}
        style={styles.placeHeart}
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
              <PlacesTabIcon color={color} focused={focused} />
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

const styles = StyleSheet.create({
  placeIconWrap: {
    width: 34,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeIconWrapActive: {
    transform: [{ translateY: -1 }],
  },
  placeHeart: {
    position: 'absolute',
    top: 8,
  },
});
