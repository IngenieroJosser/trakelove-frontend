import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeOut, ZoomIn } from 'react-native-reanimated';

import { Palette, Radius, Shadow } from '@/constants/theme';

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  if (!visible) return null;

  return (
    <Animated.View
      exiting={FadeOut.duration(260)}
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => setReady(true));
      }}
      style={styles.overlay}
    >
      <Animated.View entering={ZoomIn.duration(420).springify()} style={styles.iconCard}>
        <Image source={require('@/assets/images/icon.png')} style={styles.icon} contentFit="cover" />
      </Animated.View>
      <View style={styles.wordmarkRow}>
        <Animated.Text entering={ZoomIn.delay(120).duration(280)} style={styles.wordmark}>
          <Animated.Text style={styles.love}>Love</Animated.Text>Track
        </Animated.Text>
      </View>
      {ready ? (
        <View
          onLayout={() => {
            requestAnimationFrame(() => setVisible(false));
          }}
        />
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 1000,
    backgroundColor: Palette.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  iconCard: {
    width: 104,
    height: 104,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...Shadow.floating,
  },
  icon: { width: '100%', height: '100%' },
  wordmarkRow: { minHeight: 34 },
  wordmark: { fontSize: 27, lineHeight: 34, fontWeight: '900', letterSpacing: -0.8, color: Palette.primaryDark },
  love: { color: Palette.secondary },
});
