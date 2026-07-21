import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import type { LucideIcon } from 'lucide-react-native';
import {
  BellRing,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  Church,
  Clock3,
  Crosshair,
  DoorOpen,
  GraduationCap,
  Heart,
  Home,
  LocateFixed,
  MapPin,
  Minus,
  Navigation,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LiveMap } from '@/components/lovetrack/live-map';
import { PrimaryButton } from '@/components/lovetrack/ui';
import { Palette, Radius, Shadow, Spacing } from '@/constants/theme';
import { me, partner, places } from '@/data/mock';

const steps = [
  { id: 'location', label: 'Ubicación' },
  { id: 'access', label: 'Acceso' },
  { id: 'identity', label: 'Identidad' },
  { id: 'rules', label: 'Reglas' },
  { id: 'review', label: 'Confirmar' },
] as const;

const accessOptions = [
  {
    id: 'main',
    label: 'Entrada principal',
    helper: 'Puerta o acceso usado normalmente',
    icon: DoorOpen,
  },
  {
    id: 'lobby',
    label: 'Portería',
    helper: 'Acceso controlado del edificio o conjunto',
    icon: ShieldCheck,
  },
  {
    id: 'side',
    label: 'Puerta lateral',
    helper: 'Acceso alternativo claramente identificable',
    icon: Navigation,
  },
  {
    id: 'custom',
    label: 'Punto personalizado',
    helper: 'Define una referencia específica',
    icon: Crosshair,
  },
] as const;

const categories = [
  { id: 'home', label: 'Casa', icon: Home },
  { id: 'church', label: 'Iglesia', icon: Church },
  { id: 'study', label: 'Universidad', icon: GraduationCap },
  { id: 'family', label: 'Familiar', icon: Users },
  { id: 'work', label: 'Trabajo', icon: BriefcaseBusiness },
] as const;

type AccessId = (typeof accessOptions)[number]['id'];
type CategoryId = (typeof categories)[number]['id'];

export default function AddPlaceScreen() {
  const [step, setStep] = useState(0);
  const [access, setAccess] = useState<AccessId>('main');
  const [category, setCategory] = useState<CategoryId>('home');
  const [name, setName] = useState('Casa de mi hermana');
  const [address, setAddress] = useState('Carrera 4 # 22-18, Quibdó');
  const [reference, setReference] = useState('Puerta blanca junto a la tienda de la esquina');
  const [minimumStay, setMinimumStay] = useState(2);
  const [requiredAccuracy, setRequiredAccuracy] = useState(10);
  const [arrivalAlerts, setArrivalAlerts] = useState(true);
  const [exitAlerts, setExitAlerts] = useState(true);

  const selectedAccess = useMemo(
    () => accessOptions.find((option) => option.id === access) ?? accessOptions[0],
    [access],
  );
  const selectedCategory = useMemo(
    () => categories.find((option) => option.id === category) ?? categories[0],
    [category],
  );

  const goBack = () => {
    if (step === 0) {
      router.back();
      return;
    }
    setStep((value) => Math.max(0, value - 1));
  };

  const goNext = () => setStep((value) => Math.min(steps.length - 1, value + 1));

  const savePlace = () => {
    router.replace('/(tabs)/places');
  };

  if (step === 0) {
    return (
      <LocationStep
        onClose={() => router.back()}
        onNext={goNext}
      />
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <FlowHeader step={step} onBack={goBack} onClose={() => router.back()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {step === 1 ? (
            <AccessStep selected={access} onSelect={setAccess} />
          ) : null}

          {step === 2 ? (
            <IdentityStep
              name={name}
              address={address}
              reference={reference}
              category={category}
              onNameChange={setName}
              onAddressChange={setAddress}
              onReferenceChange={setReference}
              onCategoryChange={setCategory}
            />
          ) : null}

          {step === 3 ? (
            <RulesStep
              minimumStay={minimumStay}
              requiredAccuracy={requiredAccuracy}
              arrivalAlerts={arrivalAlerts}
              exitAlerts={exitAlerts}
              onMinimumStayChange={setMinimumStay}
              onRequiredAccuracyChange={setRequiredAccuracy}
              onArrivalAlertsChange={setArrivalAlerts}
              onExitAlertsChange={setExitAlerts}
            />
          ) : null}

          {step === 4 ? (
            <ReviewStep
              name={name}
              address={address}
              reference={reference}
              accessLabel={selectedAccess.label}
              categoryIcon={selectedCategory.icon}
              categoryLabel={selectedCategory.label}
              minimumStay={minimumStay}
              requiredAccuracy={requiredAccuracy}
              arrivalAlerts={arrivalAlerts}
              exitAlerts={exitAlerts}
            />
          ) : null}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable onPress={goBack} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
            <ChevronLeft size={19} color={Palette.primary} strokeWidth={2.5} />
            <Text style={styles.secondaryButtonText}>Atrás</Text>
          </Pressable>
          <View style={styles.footerPrimary}>
            <PrimaryButton
              label={step === 4 ? 'Guardar lugar' : 'Continuar'}
              icon={step === 4 ? Check : undefined}
              onPress={step === 4 ? savePlace : goNext}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function FlowHeader({ step, onBack, onClose }: { step: number; onBack: () => void; onClose: () => void }) {
  return (
    <View style={styles.headerWrap}>
      <View style={styles.headerRow}>
        <Pressable onPress={onBack} style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
          <ChevronLeft size={22} color={Palette.ink} />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>NUEVO LUGAR · PASO {step + 1} DE {steps.length}</Text>
          <Text style={styles.headerTitle}>{steps[step].label}</Text>
        </View>
        <Pressable onPress={onClose} style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
          <X size={21} color={Palette.inkMuted} />
        </Pressable>
      </View>
      <View style={styles.progressRow}>
        {steps.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.progressSegment,
              index <= step ? styles.progressSegmentActive : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function LocationStep({ onClose, onNext }: { onClose: () => void; onNext: () => void }) {
  return (
    <View style={styles.locationContainer}>
      <LiveMap me={me} partner={partner} places={places} />

      <SafeAreaView style={styles.locationOverlay} edges={['top', 'left', 'right']} pointerEvents="box-none">
        <View style={styles.locationHeader}>
          <Pressable onPress={onClose} style={styles.mapIconButton}>
            <X size={22} color={Palette.ink} />
          </Pressable>
          <View style={styles.locationTitleCard}>
            <Text style={styles.eyebrow}>PASO 1 DE {steps.length}</Text>
            <Text style={styles.locationTitle}>Selecciona la ubicación</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Search size={19} color={Palette.inkMuted} />
          <TextInput
            placeholder="Buscar dirección o lugar"
            placeholderTextColor="#8E8799"
            style={styles.searchInput}
          />
        </View>

        <Pressable style={styles.currentLocationButton}>
          <LocateFixed size={19} color={Palette.primary} />
          <Text style={styles.currentLocationText}>Usar mi ubicación actual</Text>
        </Pressable>
      </SafeAreaView>

      <View style={styles.fixedPinWrap} pointerEvents="none">
        <View style={styles.fixedPinShadow} />
        <LinearGradient
          colors={[Palette.secondary, Palette.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fixedPin}
        >
          <MapPin size={29} color={Palette.white} strokeWidth={2.7} />
          <Heart size={10} color={Palette.white} fill={Palette.white} style={styles.fixedPinHeart} />
        </LinearGradient>
        <View style={styles.fixedPinStem} />
      </View>

      <View style={styles.locationSheet}>
        <View style={styles.sheetHandle} />
        <View style={styles.locationStatusRow}>
          <View style={styles.locationStatusIcon}>
            <Target size={20} color={Palette.primary} />
          </View>
          <View style={styles.locationStatusCopy}>
            <Text style={styles.locationStatusLabel}>PUNTO SELECCIONADO</Text>
            <Text style={styles.locationStatusAddress}>Carrera 4 # 22-18, Quibdó</Text>
            <Text style={styles.coordinates}>5.694760, -76.657420</Text>
          </View>
          <View style={styles.accuracyBadge}>
            <Check size={13} color={Palette.success} />
            <Text style={styles.accuracyText}>±6 m</Text>
          </View>
        </View>
        <Text style={styles.locationHelp}>
          Mueve el mapa hasta dejar el pin exactamente sobre la entrada del lugar, no sobre el centro de la zona.
        </Text>
        <PrimaryButton label="Confirmar este punto" icon={MapPin} onPress={onNext} />
      </View>
    </View>
  );
}

function AccessStep({ selected, onSelect }: { selected: AccessId; onSelect: (value: AccessId) => void }) {
  return (
    <View style={styles.stepContent}>
      <StepIntro
        icon={DoorOpen}
        title="¿Cuál es el acceso exacto?"
        text="Selecciona la entrada que realmente utiliza la persona. Esto ayuda a separar lugares cercanos y evita confirmar una llegada solo por pasar al frente."
      />

      <View style={styles.optionList}>
        {accessOptions.map((option) => {
          const Icon = option.icon;
          const active = selected === option.id;
          return (
            <Pressable
              key={option.id}
              onPress={() => onSelect(option.id)}
              style={({ pressed }) => [
                styles.optionCard,
                active && styles.optionCardActive,
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.optionIcon, active && styles.optionIconActive]}>
                <Icon size={22} color={active ? Palette.primary : Palette.inkMuted} />
              </View>
              <View style={styles.optionCopy}>
                <Text style={[styles.optionTitle, active && styles.optionTitleActive]}>{option.label}</Text>
                <Text style={styles.optionHelper}>{option.helper}</Text>
              </View>
              <View style={[styles.radio, active && styles.radioActive]}>
                {active ? <View style={styles.radioDot} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.precisionCard}>
        <View style={styles.precisionTopRow}>
          <View>
            <Text style={styles.precisionLabel}>COORDENADAS DEL ACCESO</Text>
            <Text style={styles.precisionValue}>5.694760, -76.657420</Text>
          </View>
          <View style={styles.accuracyBadge}>
            <Check size={13} color={Palette.success} />
            <Text style={styles.accuracyText}>Precisión ±6 m</Text>
          </View>
        </View>
        <View style={styles.precisionDivider} />
        <Text style={styles.precisionNote}>
          Este punto se guardará como referencia principal para validar entrada, permanencia y salida.
        </Text>
      </View>
    </View>
  );
}

function IdentityStep({
  name,
  address,
  reference,
  category,
  onNameChange,
  onAddressChange,
  onReferenceChange,
  onCategoryChange,
}: {
  name: string;
  address: string;
  reference: string;
  category: CategoryId;
  onNameChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onReferenceChange: (value: string) => void;
  onCategoryChange: (value: CategoryId) => void;
}) {
  return (
    <View style={styles.stepContent}>
      <StepIntro
        icon={Sparkles}
        title="Identifica el lugar"
        text="Usa un nombre claro y una referencia visual para reconocerlo fácilmente en el mapa, historial y notificaciones."
      />

      <LabeledInput label="Nombre del lugar" value={name} onChangeText={onNameChange} placeholder="Ej. Casa de mi hermana" />

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Categoría e icono</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map((option) => {
            const Icon = option.icon;
            const active = category === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => onCategoryChange(option.id)}
                style={({ pressed }) => [
                  styles.categoryChip,
                  active && styles.categoryChipActive,
                  pressed && styles.pressed,
                ]}
              >
                <Icon size={19} color={active ? Palette.white : Palette.primary} />
                <Text style={[styles.categoryText, active && styles.categoryTextActive]}>{option.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <LabeledInput label="Dirección" value={address} onChangeText={onAddressChange} placeholder="Dirección completa" />
      <LabeledInput
        label="Referencia visual"
        value={reference}
        onChangeText={onReferenceChange}
        placeholder="Ej. Puerta blanca, portería azul, local de la esquina"
        multiline
        helper="La referencia solo ayuda a reconocer el lugar; no reemplaza las coordenadas."
      />

      <View style={styles.identityPreview}>
        <View style={styles.identityPreviewIcon}>
          <MapPin size={25} color={Palette.primary} />
          <Heart size={9} color={Palette.secondary} fill={Palette.secondary} style={styles.identityHeart} />
        </View>
        <View style={styles.identityPreviewCopy}>
          <Text style={styles.identityPreviewName}>{name || 'Nombre del lugar'}</Text>
          <Text style={styles.identityPreviewAddress}>{address || 'Dirección pendiente'}</Text>
        </View>
      </View>
    </View>
  );
}

function RulesStep({
  minimumStay,
  requiredAccuracy,
  arrivalAlerts,
  exitAlerts,
  onMinimumStayChange,
  onRequiredAccuracyChange,
  onArrivalAlertsChange,
  onExitAlertsChange,
}: {
  minimumStay: number;
  requiredAccuracy: number;
  arrivalAlerts: boolean;
  exitAlerts: boolean;
  onMinimumStayChange: (value: number) => void;
  onRequiredAccuracyChange: (value: number) => void;
  onArrivalAlertsChange: (value: boolean) => void;
  onExitAlertsChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.stepContent}>
      <StepIntro
        icon={ShieldCheck}
        title="Configura la confirmación"
        text="El modo estricto combina precisión, cercanía al acceso y permanencia mínima antes de registrar una llegada."
      />

      <View style={styles.strictCard}>
        <LinearGradient
          colors={[`${Palette.secondary}18`, `${Palette.primary}1A`]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.strictIcon}>
          <ShieldCheck size={24} color={Palette.primary} />
        </View>
        <View style={styles.strictCopy}>
          <View style={styles.strictTitleRow}>
            <Text style={styles.strictTitle}>Modo estricto</Text>
            <View style={styles.recommendedBadge}><Text style={styles.recommendedText}>RECOMENDADO</Text></View>
          </View>
          <Text style={styles.strictText}>No confirma una llegada mientras la lectura siga siendo ambigua o la persona solo esté pasando cerca.</Text>
        </View>
        <View style={styles.selectedCheck}><Check size={15} color={Palette.white} strokeWidth={3} /></View>
      </View>

      <CounterCard
        icon={Clock3}
        title="Permanencia mínima"
        helper="Tiempo continuo cerca de la entrada antes de confirmar."
        value={minimumStay}
        unit={minimumStay === 1 ? 'minuto' : 'minutos'}
        onDecrease={() => onMinimumStayChange(Math.max(1, minimumStay - 1))}
        onIncrease={() => onMinimumStayChange(Math.min(10, minimumStay + 1))}
      />

      <CounterCard
        icon={Target}
        title="Precisión requerida"
        helper="La lectura debe ser igual o mejor que este valor."
        value={requiredAccuracy}
        unit="metros"
        onDecrease={() => onRequiredAccuracyChange(Math.max(5, requiredAccuracy - 5))}
        onIncrease={() => onRequiredAccuracyChange(Math.min(40, requiredAccuracy + 5))}
      />

      <View style={styles.alertsCard}>
        <View style={styles.alertsHeader}>
          <BellRing size={21} color={Palette.primary} />
          <View style={styles.alertsHeaderCopy}>
            <Text style={styles.alertsTitle}>Avisos del lugar</Text>
            <Text style={styles.alertsSubtitle}>Solo se generan después de validar el evento.</Text>
          </View>
        </View>
        <View style={styles.switchRow}>
          <View style={styles.switchCopy}>
            <Text style={styles.switchTitle}>Avisar al llegar</Text>
            <Text style={styles.switchText}>Notificación de entrada confirmada</Text>
          </View>
          <Switch
            value={arrivalAlerts}
            onValueChange={onArrivalAlertsChange}
            trackColor={{ false: '#D8D2DE', true: '#C9B7F4' }}
            thumbColor={arrivalAlerts ? Palette.primary : '#F5F3F7'}
          />
        </View>
        <View style={styles.rowDivider} />
        <View style={styles.switchRow}>
          <View style={styles.switchCopy}>
            <Text style={styles.switchTitle}>Avisar al salir</Text>
            <Text style={styles.switchText}>Notificación de salida confirmada</Text>
          </View>
          <Switch
            value={exitAlerts}
            onValueChange={onExitAlertsChange}
            trackColor={{ false: '#D8D2DE', true: '#C9B7F4' }}
            thumbColor={exitAlerts ? Palette.primary : '#F5F3F7'}
          />
        </View>
      </View>
    </View>
  );
}

function ReviewStep({
  name,
  address,
  reference,
  accessLabel,
  categoryIcon: CategoryIcon,
  categoryLabel,
  minimumStay,
  requiredAccuracy,
  arrivalAlerts,
  exitAlerts,
}: {
  name: string;
  address: string;
  reference: string;
  accessLabel: string;
  categoryIcon: LucideIcon;
  categoryLabel: string;
  minimumStay: number;
  requiredAccuracy: number;
  arrivalAlerts: boolean;
  exitAlerts: boolean;
}) {
  const nearby = [
    { name: 'Iglesia San Francisco', distance: '138 m' },
    { name: 'Casa', distance: '640 m' },
    { name: 'Universidad', distance: '1,2 km' },
  ];

  return (
    <View style={styles.stepContent}>
      <StepIntro
        icon={Check}
        title="Confirma el nuevo lugar"
        text="Revisa el acceso, las reglas y la distancia respecto a otros puntos antes de guardarlo."
      />

      <View style={styles.reviewMap}>
        <LiveMap me={me} partner={partner} places={places} />
        <View style={styles.reviewPin}>
          <MapPin size={26} color={Palette.white} />
          <Heart size={9} color={Palette.white} fill={Palette.white} style={styles.reviewHeart} />
        </View>
        <View style={styles.reviewMapBadge}>
          <Target size={14} color={Palette.success} />
          <Text style={styles.reviewMapBadgeText}>Pin exacto · ±6 m</Text>
        </View>
      </View>

      <View style={styles.placeSummaryCard}>
        <View style={styles.summaryIcon}>
          <CategoryIcon size={24} color={Palette.primary} />
        </View>
        <View style={styles.summaryCopy}>
          <Text style={styles.summaryName}>{name}</Text>
          <Text style={styles.summaryAddress}>{address}</Text>
          <Text style={styles.summaryReference}>{reference}</Text>
        </View>
        <View style={styles.categoryBadge}><Text style={styles.categoryBadgeText}>{categoryLabel}</Text></View>
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>Punto y confirmación</Text>
        <ReviewRow label="Acceso" value={accessLabel} />
        <ReviewRow label="Coordenadas" value="5.694760, -76.657420" />
        <ReviewRow label="Precisión mínima" value={`±${requiredAccuracy} m`} />
        <ReviewRow label="Permanencia" value={`${minimumStay} min continuos`} />
        <ReviewRow label="Modo" value="Estricto" highlight />
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>Avisos</Text>
        <ReviewRow label="Entrada confirmada" value={arrivalAlerts ? 'Activado' : 'Desactivado'} />
        <ReviewRow label="Salida confirmada" value={exitAlerts ? 'Activado' : 'Desactivado'} />
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>Otros lugares cercanos</Text>
        <Text style={styles.nearbyHelp}>Se muestran para comprobar que el nuevo pin no se confunda con otro lugar.</Text>
        {nearby.map((item) => (
          <View key={item.name} style={styles.nearbyRow}>
            <View style={styles.nearbyIcon}><MapPin size={16} color={Palette.primary} /></View>
            <Text style={styles.nearbyName}>{item.name}</Text>
            <Text style={styles.nearbyDistance}>{item.distance}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function StepIntro({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <View style={styles.intro}>
      <LinearGradient
        colors={[`${Palette.secondary}18`, `${Palette.primary}18`]}
        style={styles.introIcon}
      >
        <Icon size={24} color={Palette.primary} />
      </LinearGradient>
      <View style={styles.introCopy}>
        <Text style={styles.introTitle}>{title}</Text>
        <Text style={styles.introText}>{text}</Text>
      </View>
    </View>
  );
}

function LabeledInput({
  label,
  helper,
  ...props
}: React.ComponentProps<typeof TextInput> & { label: string; helper?: string }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor="#A59EAF"
        style={[styles.input, props.multiline && styles.inputMultiline]}
        {...props}
      />
      {helper ? <Text style={styles.fieldHelper}>{helper}</Text> : null}
    </View>
  );
}

function CounterCard({
  icon: Icon,
  title,
  helper,
  value,
  unit,
  onDecrease,
  onIncrease,
}: {
  icon: LucideIcon;
  title: string;
  helper: string;
  value: number;
  unit: string;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <View style={styles.counterCard}>
      <View style={styles.counterHeader}>
        <View style={styles.counterIcon}><Icon size={20} color={Palette.primary} /></View>
        <View style={styles.counterCopy}>
          <Text style={styles.counterTitle}>{title}</Text>
          <Text style={styles.counterHelper}>{helper}</Text>
        </View>
      </View>
      <View style={styles.stepper}>
        <Pressable onPress={onDecrease} style={({ pressed }) => [styles.stepperButton, pressed && styles.pressed]}>
          <Minus size={20} color={Palette.primary} />
        </Pressable>
        <View style={styles.stepperValueWrap}>
          <Text style={styles.stepperValue}>{value}</Text>
          <Text style={styles.stepperUnit}>{unit}</Text>
        </View>
        <Pressable onPress={onIncrease} style={({ pressed }) => [styles.stepperButton, pressed && styles.pressed]}>
          <Plus size={20} color={Palette.primary} />
        </Pressable>
      </View>
    </View>
  );
}

function ReviewRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.reviewRow}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={[styles.reviewValue, highlight && styles.reviewValueHighlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.canvas },
  safe: { flex: 1 },
  headerWrap: { backgroundColor: Palette.surface, borderBottomWidth: 1, borderBottomColor: Palette.border, paddingHorizontal: Spacing.four, paddingTop: 8, paddingBottom: 13 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  iconButton: { width: 44, height: 44, borderRadius: 15, backgroundColor: '#F3F0F6', alignItems: 'center', justifyContent: 'center' },
  headerCopy: { flex: 1 },
  eyebrow: { fontSize: 9, lineHeight: 13, fontWeight: '900', letterSpacing: 1.1, color: Palette.primary },
  headerTitle: { fontSize: 20, lineHeight: 25, fontWeight: '900', color: Palette.ink, marginTop: 1 },
  progressRow: { flexDirection: 'row', gap: 6, marginTop: 13 },
  progressSegment: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#E6E0EA' },
  progressSegmentActive: { backgroundColor: Palette.primary },
  scrollContent: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingHorizontal: Spacing.four, paddingTop: Spacing.four, paddingBottom: 32 },
  stepContent: { gap: 16 },
  footer: { minHeight: 82, borderTopWidth: 1, borderTopColor: Palette.border, backgroundColor: Palette.surface, paddingHorizontal: Spacing.four, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  secondaryButton: { minHeight: 54, borderRadius: Radius.md, paddingHorizontal: 16, backgroundColor: Palette.lavender, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
  secondaryButtonText: { fontSize: 14, fontWeight: '900', color: Palette.primary },
  footerPrimary: { flex: 1 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },

  locationContainer: { flex: 1, backgroundColor: Palette.canvas },
  locationOverlay: { ...StyleSheet.absoluteFillObject, paddingHorizontal: Spacing.four, pointerEvents: 'box-none' },
  locationHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 7 },
  mapIconButton: { width: 48, height: 48, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.97)', alignItems: 'center', justifyContent: 'center', ...Shadow.floating },
  locationTitleCard: { flex: 1, minHeight: 52, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.97)', justifyContent: 'center', paddingHorizontal: 15, ...Shadow.floating },
  locationTitle: { fontSize: 15, lineHeight: 19, fontWeight: '900', color: Palette.ink, marginTop: 1 },
  searchBar: { marginTop: 10, minHeight: 50, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.97)', flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 14, ...Shadow.soft },
  searchInput: { flex: 1, minHeight: 48, fontSize: 14, color: Palette.ink },
  currentLocationButton: { alignSelf: 'flex-start', marginTop: 10, minHeight: 43, borderRadius: Radius.pill, paddingHorizontal: 14, backgroundColor: 'rgba(255,255,255,0.97)', flexDirection: 'row', alignItems: 'center', gap: 8, ...Shadow.soft },
  currentLocationText: { fontSize: 12, fontWeight: '900', color: Palette.primary },
  fixedPinWrap: { position: 'absolute', left: '50%', top: '43%', marginLeft: -27, marginTop: -56, width: 54, height: 76, alignItems: 'center' },
  fixedPinShadow: { position: 'absolute', bottom: 1, width: 30, height: 9, borderRadius: 15, backgroundColor: 'rgba(25,21,40,0.22)' },
  fixedPin: { width: 54, height: 54, borderRadius: 19, borderWidth: 4, borderColor: Palette.white, alignItems: 'center', justifyContent: 'center', ...Shadow.floating },
  fixedPinHeart: { position: 'absolute', top: 21 },
  fixedPinStem: { width: 4, height: 17, backgroundColor: Palette.primary, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 },
  locationSheet: { position: 'absolute', left: 14, right: 14, bottom: 15, borderRadius: 28, backgroundColor: Palette.surface, padding: 17, gap: 13, ...Shadow.floating },
  sheetHandle: { width: 44, height: 5, borderRadius: 3, backgroundColor: '#D9D3DE', alignSelf: 'center', marginBottom: 2 },
  locationStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  locationStatusIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  locationStatusCopy: { flex: 1 },
  locationStatusLabel: { fontSize: 9, lineHeight: 13, letterSpacing: 1, fontWeight: '900', color: Palette.inkMuted },
  locationStatusAddress: { fontSize: 14, lineHeight: 18, fontWeight: '900', color: Palette.ink, marginTop: 2 },
  coordinates: { fontSize: 10, lineHeight: 14, color: Palette.inkMuted, marginTop: 2 },
  accuracyBadge: { borderRadius: Radius.pill, backgroundColor: Palette.successSoft, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 6 },
  accuracyText: { fontSize: 10, fontWeight: '900', color: Palette.success },
  locationHelp: { fontSize: 11, lineHeight: 17, color: Palette.inkMuted },

  intro: { flexDirection: 'row', alignItems: 'flex-start', gap: 13, marginBottom: 2 },
  introIcon: { width: 50, height: 50, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  introCopy: { flex: 1 },
  introTitle: { fontSize: 20, lineHeight: 25, fontWeight: '900', color: Palette.ink },
  introText: { fontSize: 12, lineHeight: 18, color: Palette.inkMuted, marginTop: 5 },
  optionList: { gap: 11 },
  optionCard: { minHeight: 82, borderRadius: Radius.lg, borderWidth: 1, borderColor: Palette.border, backgroundColor: Palette.surface, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 12 },
  optionCardActive: { borderColor: Palette.primary, backgroundColor: '#FAF8FF' },
  optionIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#F3F0F6', alignItems: 'center', justifyContent: 'center' },
  optionIconActive: { backgroundColor: Palette.lavender },
  optionCopy: { flex: 1 },
  optionTitle: { fontSize: 14, lineHeight: 18, fontWeight: '900', color: Palette.ink },
  optionTitleActive: { color: Palette.primary },
  optionHelper: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 3 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#CFC8D6', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: Palette.primary },
  radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: Palette.primary },
  precisionCard: { borderRadius: Radius.lg, backgroundColor: '#F4F0FA', padding: 15, borderWidth: 1, borderColor: '#E1D8ED' },
  precisionTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  precisionLabel: { fontSize: 9, letterSpacing: 1, fontWeight: '900', color: Palette.inkMuted },
  precisionValue: { fontSize: 14, fontWeight: '900', color: Palette.ink, marginTop: 4 },
  precisionDivider: { height: 1, backgroundColor: '#DED5E8', marginVertical: 12 },
  precisionNote: { fontSize: 11, lineHeight: 17, color: Palette.inkMuted },

  fieldGroup: { gap: 7 },
  fieldLabel: { fontSize: 13, lineHeight: 17, fontWeight: '900', color: Palette.ink },
  input: { minHeight: 54, borderRadius: Radius.md, borderWidth: 1, borderColor: Palette.border, backgroundColor: Palette.surface, paddingHorizontal: 15, fontSize: 15, color: Palette.ink },
  inputMultiline: { minHeight: 96, paddingTop: 14, textAlignVertical: 'top' },
  fieldHelper: { fontSize: 10, lineHeight: 15, color: Palette.inkMuted },
  categoryRow: { gap: 9, paddingRight: 8 },
  categoryChip: { minHeight: 44, borderRadius: Radius.pill, borderWidth: 1, borderColor: '#DED6E8', backgroundColor: Palette.surface, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 7 },
  categoryChipActive: { backgroundColor: Palette.primary, borderColor: Palette.primary },
  categoryText: { fontSize: 12, fontWeight: '900', color: Palette.primary },
  categoryTextActive: { color: Palette.white },
  identityPreview: { minHeight: 82, borderRadius: Radius.lg, padding: 14, backgroundColor: '#F4F0FA', flexDirection: 'row', alignItems: 'center', gap: 12 },
  identityPreviewIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: Palette.white, alignItems: 'center', justifyContent: 'center' },
  identityHeart: { position: 'absolute', top: 20 },
  identityPreviewCopy: { flex: 1 },
  identityPreviewName: { fontSize: 15, fontWeight: '900', color: Palette.ink },
  identityPreviewAddress: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 4 },

  strictCard: { minHeight: 116, borderRadius: Radius.lg, overflow: 'hidden', borderWidth: 1.5, borderColor: Palette.primary, padding: 15, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  strictIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: Palette.white, alignItems: 'center', justifyContent: 'center' },
  strictCopy: { flex: 1 },
  strictTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 7, flexWrap: 'wrap' },
  strictTitle: { fontSize: 15, lineHeight: 19, fontWeight: '900', color: Palette.ink },
  recommendedBadge: { borderRadius: Radius.pill, backgroundColor: Palette.primary, paddingHorizontal: 8, paddingVertical: 4 },
  recommendedText: { color: Palette.white, fontSize: 8, fontWeight: '900', letterSpacing: 0.7 },
  strictText: { fontSize: 11, lineHeight: 17, color: Palette.inkMuted, marginTop: 6 },
  selectedCheck: { width: 24, height: 24, borderRadius: 12, backgroundColor: Palette.primary, alignItems: 'center', justifyContent: 'center' },
  counterCard: { borderRadius: Radius.lg, backgroundColor: Palette.surface, borderWidth: 1, borderColor: Palette.border, padding: 15, gap: 14 },
  counterHeader: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  counterIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  counterCopy: { flex: 1 },
  counterTitle: { fontSize: 14, lineHeight: 18, fontWeight: '900', color: Palette.ink },
  counterHelper: { fontSize: 10, lineHeight: 15, color: Palette.inkMuted, marginTop: 3 },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepperButton: { width: 46, height: 46, borderRadius: 15, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  stepperValueWrap: { alignItems: 'center' },
  stepperValue: { fontSize: 28, lineHeight: 31, fontWeight: '900', color: Palette.primary },
  stepperUnit: { fontSize: 10, color: Palette.inkMuted, marginTop: 2 },
  alertsCard: { borderRadius: Radius.lg, backgroundColor: Palette.surface, borderWidth: 1, borderColor: Palette.border, padding: 15 },
  alertsHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  alertsHeaderCopy: { flex: 1 },
  alertsTitle: { fontSize: 14, fontWeight: '900', color: Palette.ink },
  alertsSubtitle: { fontSize: 10, lineHeight: 15, color: Palette.inkMuted, marginTop: 3 },
  switchRow: { minHeight: 60, flexDirection: 'row', alignItems: 'center', gap: 12 },
  switchCopy: { flex: 1 },
  switchTitle: { fontSize: 13, fontWeight: '900', color: Palette.ink },
  switchText: { fontSize: 10, lineHeight: 15, color: Palette.inkMuted, marginTop: 3 },
  rowDivider: { height: 1, backgroundColor: Palette.border },

  reviewMap: { height: 220, borderRadius: Radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: Palette.border },
  reviewPin: { position: 'absolute', left: '50%', top: '50%', marginLeft: -25, marginTop: -31, width: 50, height: 50, borderRadius: 18, backgroundColor: Palette.primary, borderWidth: 4, borderColor: Palette.white, alignItems: 'center', justifyContent: 'center', ...Shadow.floating },
  reviewHeart: { position: 'absolute', top: 19 },
  reviewMapBadge: { position: 'absolute', left: 12, bottom: 12, borderRadius: Radius.pill, backgroundColor: 'rgba(255,255,255,0.96)', paddingHorizontal: 10, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 5, ...Shadow.soft },
  reviewMapBadgeText: { fontSize: 10, fontWeight: '900', color: Palette.success },
  placeSummaryCard: { minHeight: 100, borderRadius: Radius.lg, backgroundColor: Palette.surface, borderWidth: 1, borderColor: Palette.border, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  summaryIcon: { width: 50, height: 50, borderRadius: 17, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  summaryCopy: { flex: 1 },
  summaryName: { fontSize: 16, lineHeight: 21, fontWeight: '900', color: Palette.ink },
  summaryAddress: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 3 },
  summaryReference: { fontSize: 10, lineHeight: 15, color: Palette.primary, marginTop: 4 },
  categoryBadge: { borderRadius: Radius.pill, backgroundColor: '#F0EAFE', paddingHorizontal: 9, paddingVertical: 6 },
  categoryBadgeText: { fontSize: 9, fontWeight: '900', color: Palette.primary },
  reviewSection: { borderRadius: Radius.lg, backgroundColor: Palette.surface, borderWidth: 1, borderColor: Palette.border, padding: 15 },
  reviewSectionTitle: { fontSize: 14, lineHeight: 18, fontWeight: '900', color: Palette.ink, marginBottom: 9 },
  reviewRow: { minHeight: 39, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Palette.border },
  reviewLabel: { flex: 1, fontSize: 11, color: Palette.inkMuted },
  reviewValue: { maxWidth: '58%', fontSize: 11, fontWeight: '900', color: Palette.ink, textAlign: 'right' },
  reviewValueHighlight: { color: Palette.primary },
  nearbyHelp: { fontSize: 10, lineHeight: 15, color: Palette.inkMuted, marginBottom: 7 },
  nearbyRow: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 9 },
  nearbyIcon: { width: 32, height: 32, borderRadius: 11, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  nearbyName: { flex: 1, fontSize: 11, fontWeight: '800', color: Palette.ink },
  nearbyDistance: { fontSize: 11, fontWeight: '900', color: Palette.primary },
});
