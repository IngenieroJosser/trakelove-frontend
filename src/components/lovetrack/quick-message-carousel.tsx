import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Palette, Radius, Shadow } from '@/constants/theme';
import { quickMessages, type QuickMessage } from '@/data/quick-messages';

type QuickMessagePillProps = {
  item: QuickMessage;
  selected: boolean;
  onPress: (item: QuickMessage) => void;
};

function QuickMessagePill({ item, selected, onPress }: QuickMessagePillProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const emojiScale = useRef(new Animated.Value(1)).current;

  const trigger = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 0.94,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1.04,
          damping: 8,
          stiffness: 260,
          mass: 0.55,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          damping: 11,
          stiffness: 230,
          mass: 0.65,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(emojiScale, {
          toValue: 1.3,
          duration: 130,
          useNativeDriver: true,
        }),
        Animated.spring(emojiScale, {
          toValue: 1,
          damping: 8,
          stiffness: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    onPress(item);
  };

  const content = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.accessibilityLabel}
      accessibilityState={{ selected }}
      onPress={trigger}
      style={styles.pressable}
    >
      <Animated.Text style={[styles.emoji, { transform: [{ scale: emojiScale }] }]}>
        {item.emoji}
      </Animated.Text>
      <Text numberOfLines={1} style={[styles.label, selected && styles.labelSelected]}>
        {item.label}
      </Text>
    </Pressable>
  );

  return (
    <Animated.View style={[styles.animatedPill, { transform: [{ scale }] }]}>
      {selected ? (
        <LinearGradient
          colors={[Palette.secondary, '#8C0DA8', Palette.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.selectedSurface}>{content}</View>
        </LinearGradient>
      ) : (
        <View style={styles.pill}>{content}</View>
      )}
    </Animated.View>
  );
}

export function QuickMessageCarousel({ partnerName = 'tu pareja' }: { partnerName?: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sentMessage, setSentMessage] = useState<QuickMessage | null>(null);
  const bubbleOpacity = useRef(new Animated.Value(0)).current;
  const bubbleTranslateY = useRef(new Animated.Value(18)).current;
  const bubbleScale = useRef(new Animated.Value(0.92)).current;

  const sendMessage = (item: QuickMessage) => {
    setSelectedId(item.id);
    setSentMessage(item);
    bubbleOpacity.stopAnimation();
    bubbleTranslateY.stopAnimation();
    bubbleScale.stopAnimation();
    bubbleOpacity.setValue(0);
    bubbleTranslateY.setValue(18);
    bubbleScale.setValue(0.92);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(bubbleOpacity, {
          toValue: 1,
          duration: 170,
          useNativeDriver: true,
        }),
        Animated.spring(bubbleTranslateY, {
          toValue: 0,
          damping: 12,
          stiffness: 220,
          mass: 0.7,
          useNativeDriver: true,
        }),
        Animated.spring(bubbleScale, {
          toValue: 1,
          damping: 10,
          stiffness: 220,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1250),
      Animated.parallel([
        Animated.timing(bubbleOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleTranslateY, {
          toValue: -16,
          duration: 220,
          useNativeDriver: true,
        }),
      ]),
    ]).start(({ finished }) => {
      if (finished) setSentMessage(null);
    });
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      {sentMessage ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.sentBubble,
            {
              opacity: bubbleOpacity,
              transform: [{ translateY: bubbleTranslateY }, { scale: bubbleScale }],
            },
          ]}
        >
          <Text style={styles.sentEmoji}>{sentMessage.emoji}</Text>
          <View style={styles.sentCopy}>
            <Text style={styles.sentTitle}>{sentMessage.label}</Text>
            <Text style={styles.sentSubtitle}>Enviado a {partnerName}</Text>
          </View>
          <View style={styles.sentCheck}>
            <Text style={styles.sentCheckText}>✓</Text>
          </View>
        </Animated.View>
      ) : null}

      <View style={styles.headingRow}>
        <Text style={styles.heading}>Enviar un mensaje rápido</Text>
        <Text style={styles.hint}>Desliza para ver más</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        decelerationRate="fast"
      >
        {quickMessages.map((item) => (
          <QuickMessagePill
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onPress={sendMessage}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  headingRow: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  heading: {
    color: Palette.ink,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '900',
  },
  hint: {
    color: Palette.inkMuted,
    fontSize: 9,
    lineHeight: 13,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 4,
    gap: 10,
  },
  animatedPill: {
    borderRadius: Radius.pill,
    ...Shadow.soft,
  },
  pill: {
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.88)',
    padding: 2,
  },
  gradientBorder: {
    borderRadius: Radius.pill,
    padding: 2,
  },
  selectedSurface: {
    borderRadius: Radius.pill,
    backgroundColor: Palette.white,
  },
  pressable: {
    minHeight: 52,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  emoji: {
    fontSize: 22,
    lineHeight: 27,
  },
  label: {
    color: Palette.primaryDark,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '900',
  },
  labelSelected: {
    color: Palette.primary,
  },
  sentBubble: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 69,
    zIndex: 10,
    minHeight: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderWidth: 1,
    borderColor: 'rgba(81,16,153,0.11)',
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...Shadow.floating,
  },
  sentEmoji: {
    fontSize: 24,
  },
  sentCopy: {
    flex: 1,
  },
  sentTitle: {
    color: Palette.ink,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '900',
  },
  sentSubtitle: {
    color: Palette.inkMuted,
    fontSize: 10,
    lineHeight: 14,
    marginTop: 2,
  },
  sentCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Palette.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentCheckText: {
    color: Palette.success,
    fontSize: 15,
    fontWeight: '900',
  },
});
