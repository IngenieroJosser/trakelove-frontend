import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Palette } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Palette.canvas } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="link-partner" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="add-place" options={{ presentation: 'modal' }} />
        <Stack.Screen name="place-details" />
        <Stack.Screen name="delete-history" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}
