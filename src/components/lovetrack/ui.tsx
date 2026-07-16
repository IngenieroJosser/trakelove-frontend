import * as Haptics from 'expo-haptics';
import type { LucideIcon } from 'lucide-react-native';
import { ChevronRight } from 'lucide-react-native';
import type { PropsWithChildren, ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaxContentWidth, Palette, Radius, Shadow, Spacing } from '@/constants/theme';

export function Screen({ children, scroll = true, style }: PropsWithChildren<{ scroll?: boolean; style?: ViewStyle }>) {
  const content = (
    <View style={[styles.screenContent, style]}>{children}</View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : content}
    </SafeAreaView>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <View style={styles.pageHeader}>
      <View style={styles.pageHeaderText}>
        <Text style={styles.pageTitle}>{title}</Text>
        {subtitle ? <Text style={styles.pageSubtitle}>{subtitle}</Text> : null}
      </View>
      {action}
    </View>
  );
}

export function Card({ children, style, onPress }: PropsWithChildren<{ style?: ViewStyle; onPress?: () => void }>) {
  if (onPress) {
    return (
      <Pressable
        onPress={() => {
          Haptics.selectionAsync();
          onPress();
        }}
        style={({ pressed }) => [styles.card, style, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PrimaryButton({
  label,
  onPress,
  icon: Icon,
  loading = false,
  disabled = false,
  tone = 'primary',
}: {
  label: string;
  onPress: () => void;
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  tone?: 'primary' | 'secondary' | 'danger' | 'ghost';
}) {
  const toneStyle = {
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
    danger: styles.buttonDanger,
    ghost: styles.buttonGhost,
  }[tone];
  const textStyle = tone === 'ghost' ? styles.buttonTextGhost : styles.buttonText;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={({ pressed }) => [styles.button, toneStyle, pressed && styles.buttonPressed, (disabled || loading) && styles.disabled]}
    >
      {loading ? <ActivityIndicator color={tone === 'ghost' ? Palette.primary : Palette.white} /> : null}
      {!loading && Icon ? <Icon size={20} color={tone === 'ghost' ? Palette.primary : Palette.white} strokeWidth={2.4} /> : null}
      {!loading ? <Text style={[styles.buttonText, textStyle]}>{label}</Text> : null}
    </Pressable>
  );
}

export function Field({ label, helper, error, ...props }: TextInputProps & { label: string; helper?: string; error?: string }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor="#A59EAF"
        style={[styles.input, error ? styles.inputError : null]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action}
    </View>
  );
}

export function StatusPill({
  label,
  tone = 'neutral',
  dot = true,
}: {
  label: string;
  tone?: 'success' | 'warning' | 'danger' | 'neutral' | 'primary';
  dot?: boolean;
}) {
  const palette = {
    success: { bg: Palette.successSoft, fg: Palette.success },
    warning: { bg: Palette.warningSoft, fg: Palette.warning },
    danger: { bg: Palette.dangerSoft, fg: Palette.danger },
    neutral: { bg: '#F0EDF4', fg: Palette.inkMuted },
    primary: { bg: Palette.lavender, fg: Palette.primary },
  }[tone];

  return (
    <View style={[styles.pill, { backgroundColor: palette.bg }]}>
      {dot ? <View style={[styles.dot, { backgroundColor: palette.fg }]} /> : null}
      <Text style={[styles.pillText, { color: palette.fg }]}>{label}</Text>
    </View>
  );
}

export function Metric({ label, value, icon: Icon, tone = Palette.primary }: { label: string; value: string; icon: LucideIcon; tone?: string }) {
  return (
    <View style={styles.metric}>
      <View style={[styles.metricIcon, { backgroundColor: `${tone}18` }]}>
        <Icon size={18} color={tone} strokeWidth={2.4} />
      </View>
      <View>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
      </View>
    </View>
  );
}

export function SettingsRow({
  icon: Icon,
  title,
  subtitle,
  onPress,
  right,
  danger = false,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  right?: ReactNode;
  danger?: boolean;
}) {
  const body = (
    <View style={styles.settingsRowInner}>
      <View style={[styles.settingsIcon, danger && styles.settingsIconDanger]}>
        <Icon size={20} color={danger ? Palette.danger : Palette.primary} strokeWidth={2.2} />
      </View>
      <View style={styles.settingsCopy}>
        <Text style={[styles.settingsTitle, danger && styles.dangerText]}>{title}</Text>
        {subtitle ? <Text style={styles.settingsSubtitle}>{subtitle}</Text> : null}
      </View>
      {right ?? (onPress ? <ChevronRight size={20} color="#A59EAF" /> : null)}
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      {body}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Palette.canvas },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1, alignItems: 'center' },
  screenContent: { width: '100%', maxWidth: MaxContentWidth, paddingHorizontal: Spacing.four, paddingTop: Spacing.four, paddingBottom: 120, gap: Spacing.four },
  pageHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 4 },
  pageHeaderText: { flex: 1 },
  pageTitle: { fontSize: 30, lineHeight: 36, fontWeight: '800', letterSpacing: -0.8, color: Palette.ink },
  pageSubtitle: { fontSize: 15, lineHeight: 22, color: Palette.inkMuted, marginTop: 5 },
  card: { backgroundColor: Palette.surface, borderRadius: Radius.lg, padding: Spacing.four, borderWidth: 1, borderColor: Palette.border, ...Shadow.soft },
  pressed: { opacity: 0.76, transform: [{ scale: 0.995 }] },
  button: { minHeight: 54, borderRadius: Radius.md, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10 },
  buttonPrimary: { backgroundColor: Palette.primary },
  buttonSecondary: { backgroundColor: Palette.secondary },
  buttonDanger: { backgroundColor: Palette.danger },
  buttonGhost: { backgroundColor: Palette.lavender },
  buttonPressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  buttonText: { color: Palette.white, fontSize: 16, lineHeight: 20, fontWeight: '800' },
  buttonTextGhost: { color: Palette.primary },
  disabled: { opacity: 0.5 },
  fieldWrap: { gap: 7 },
  fieldLabel: { fontSize: 14, lineHeight: 18, fontWeight: '700', color: Palette.ink },
  input: { minHeight: 54, borderWidth: 1, borderColor: Palette.border, borderRadius: Radius.md, paddingHorizontal: 16, backgroundColor: Palette.white, fontSize: 16, color: Palette.ink },
  inputError: { borderColor: Palette.danger },
  helper: { fontSize: 12, lineHeight: 17, color: Palette.inkMuted },
  error: { fontSize: 12, lineHeight: 17, color: Palette.danger },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  sectionTitle: { fontSize: 19, lineHeight: 24, fontWeight: '800', color: Palette.ink, letterSpacing: -0.25 },
  pill: { alignSelf: 'flex-start', borderRadius: Radius.pill, paddingHorizontal: 10, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  pillText: { fontSize: 12, lineHeight: 15, fontWeight: '800' },
  metric: { flex: 1, minWidth: 140, flexDirection: 'row', alignItems: 'center', gap: 10 },
  metricIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  metricValue: { fontSize: 15, lineHeight: 19, color: Palette.ink, fontWeight: '800' },
  metricLabel: { fontSize: 12, lineHeight: 16, color: Palette.inkMuted },
  settingsRowInner: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingsIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  settingsIconDanger: { backgroundColor: Palette.dangerSoft },
  settingsCopy: { flex: 1 },
  settingsTitle: { fontSize: 15, lineHeight: 20, fontWeight: '800', color: Palette.ink },
  settingsSubtitle: { fontSize: 12, lineHeight: 17, color: Palette.inkMuted, marginTop: 2 },
  dangerText: { color: Palette.danger },
});
