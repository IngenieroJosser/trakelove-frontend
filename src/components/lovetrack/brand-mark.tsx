import { LinearGradient } from 'expo-linear-gradient';
import { Heart, MapPin } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Palette, Shadow } from '@/constants/theme';

type BrandMarkProps = {
  compact?: boolean;
  showName?: boolean;
  inverse?: boolean;
};

export function BrandMark({ compact = false, showName = true, inverse = false }: BrandMarkProps) {
  const size = compact ? 46 : 68;

  return (
    <View style={styles.row}>
      <LinearGradient
        colors={[Palette.secondary, Palette.primary]}
        start={{ x: 0.05, y: 0.05 }}
        end={{ x: 0.95, y: 1 }}
        style={[styles.logo, { width: size, height: size, borderRadius: size * 0.32 }]}
      >
        <Heart size={size * 0.56} color={Palette.white} strokeWidth={2.6} fill="rgba(255,255,255,0.16)" />
        <View style={styles.pinWrap}>
          <MapPin size={size * 0.31} color={Palette.white} strokeWidth={3} fill={Palette.secondary} />
        </View>
      </LinearGradient>
      {showName ? (
        <Text style={[styles.name, compact && styles.nameCompact, inverse && styles.nameInverse]}>
          <Text style={styles.love}>Love</Text>Track
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.soft,
  },
  pinWrap: { position: 'absolute', top: '31%', left: '35%' },
  name: { fontSize: 30, lineHeight: 36, fontWeight: '800', letterSpacing: -1.2, color: Palette.primaryDark },
  nameCompact: { fontSize: 23, lineHeight: 28, letterSpacing: -0.7 },
  nameInverse: { color: Palette.white },
  love: { color: Palette.secondary },
});
