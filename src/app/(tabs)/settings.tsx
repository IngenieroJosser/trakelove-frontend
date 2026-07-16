import { router } from 'expo-router';
import {
  BatteryCharging,
  Bell,
  ChevronRight,
  CirclePause,
  Clock3,
  Link2,
  LogOut,
  MapPin,
  ShieldCheck,
  Smartphone,
  Trash2,
  UserRound,
  Wifi,
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { Card, PageHeader, Screen, SettingsRow, StatusPill } from '@/components/lovetrack/ui';
import { Palette, Radius } from '@/constants/theme';

export default function SettingsScreen() {
  const [sharing, setSharing] = useState(true);

  return (
    <Screen>
      <PageHeader title="Ajustes" subtitle="Controla tu cuenta, dispositivo, privacidad y datos." />

      <Card style={styles.profileCard}>
        <View style={styles.profileAvatar}><Text style={styles.profileInitials}>JC</Text></View>
        <View style={styles.profileCopy}><Text style={styles.profileName}>Josser</Text><Text style={styles.profileEmail}>josser@example.com</Text></View>
        <ChevronRight size={20} color={Palette.inkMuted} />
      </Card>

      <View style={[styles.sharingCard, !sharing && styles.sharingCardPaused]}>
        <View style={[styles.sharingIcon, !sharing && styles.sharingIconPaused]}>
          {sharing ? <MapPin size={24} color={Palette.success} fill={`${Palette.success}20`} /> : <CirclePause size={24} color={Palette.danger} />}
        </View>
        <View style={styles.sharingCopy}>
          <View style={styles.sharingTitleRow}><Text style={styles.sharingTitle}>{sharing ? 'Ubicación compartida' : 'Ubicación pausada'}</Text><StatusPill label={sharing ? 'Activa' : 'Pausada'} tone={sharing ? 'success' : 'danger'} /></View>
          <Text style={styles.sharingText}>{sharing ? 'Tu pareja puede ver tu posición y última actualización.' : 'Tu pareja solo puede ver la última posición enviada.'}</Text>
        </View>
        <Switch value={sharing} onValueChange={setSharing} trackColor={{ false: '#E0B9C5', true: '#AEE4CF' }} thumbColor={sharing ? Palette.success : Palette.danger} />
      </View>

      <Text style={styles.sectionLabel}>PAREJA Y CUENTA</Text>
      <Card>
        <SettingsRow icon={Link2} title="Mi amor" subtitle="Vinculada · ubicación activa" onPress={() => {}} />
        <View style={styles.separator} />
        <SettingsRow icon={UserRound} title="Perfil y seguridad" subtitle="Nombre, correo y contraseña" onPress={() => {}} />
      </Card>

      <Text style={styles.sectionLabel}>DISPOSITIVO</Text>
      <Card>
        <SettingsRow icon={Smartphone} title="Este dispositivo" subtitle="Android · última conexión ahora" right={<StatusPill label="Conectado" tone="success" />} />
        <View style={styles.separator} />
        <SettingsRow icon={BatteryCharging} title="Optimización de batería" subtitle="Configura el seguimiento estable en segundo plano" onPress={() => {}} />
        <View style={styles.separator} />
        <SettingsRow icon={Wifi} title="Estado de conectividad" subtitle="Wi-Fi y datos móviles disponibles" right={<StatusPill label="Correcto" tone="success" />} />
      </Card>

      <Text style={styles.sectionLabel}>PRIVACIDAD Y DATOS</Text>
      <Card>
        <SettingsRow icon={ShieldCheck} title="Permisos y consentimiento" subtitle="Revisa quién puede ver tu ubicación" onPress={() => {}} />
        <View style={styles.separator} />
        <SettingsRow icon={Clock3} title="Retención del historial" subtitle="Eliminar automáticamente después de 24 horas" onPress={() => {}} />
        <View style={styles.separator} />
        <SettingsRow icon={Bell} title="Notificaciones" subtitle="Llegadas, salidas y conectividad" onPress={() => router.push('/(tabs)/alerts')} />
        <View style={styles.separator} />
        <SettingsRow icon={Trash2} title="Eliminar todo el historial" subtitle="Borra ubicaciones y eventos de manera permanente" danger onPress={() => router.push('/delete-history')} />
      </Card>

      <Pressable style={styles.logout}><LogOut size={19} color={Palette.danger} /><Text style={styles.logoutText}>Cerrar sesión</Text></Pressable>
      <Text style={styles.version}>LoveTrack 1.0.0 · Privado para ustedes dos</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  profileAvatar: { width: 54, height: 54, borderRadius: 20, backgroundColor: Palette.primary, alignItems: 'center', justifyContent: 'center' },
  profileInitials: { color: Palette.white, fontSize: 15, fontWeight: '900' },
  profileCopy: { flex: 1 },
  profileName: { fontSize: 17, fontWeight: '900', color: Palette.ink },
  profileEmail: { fontSize: 11, color: Palette.inkMuted, marginTop: 4 },
  sharingCard: { minHeight: 94, borderRadius: Radius.lg, backgroundColor: Palette.successSoft, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 15 },
  sharingCardPaused: { backgroundColor: Palette.dangerSoft },
  sharingIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: Palette.white, alignItems: 'center', justifyContent: 'center' },
  sharingIconPaused: { backgroundColor: '#FFF7F9' },
  sharingCopy: { flex: 1 },
  sharingTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 7, flexWrap: 'wrap' },
  sharingTitle: { fontSize: 14, lineHeight: 18, fontWeight: '900', color: Palette.ink },
  sharingText: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 4 },
  sectionLabel: { fontSize: 10, lineHeight: 14, letterSpacing: 1.2, fontWeight: '900', color: Palette.inkMuted, marginTop: 5, marginLeft: 2 },
  separator: { height: 1, backgroundColor: Palette.border },
  logout: { minHeight: 54, borderRadius: Radius.md, backgroundColor: Palette.dangerSoft, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  logoutText: { color: Palette.danger, fontSize: 14, fontWeight: '900' },
  version: { textAlign: 'center', color: Palette.inkMuted, fontSize: 10, lineHeight: 15 },
});
