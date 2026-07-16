export const Palette = {
  ink: '#191528',
  inkMuted: '#6E687C',
  surface: '#FFFFFF',
  canvas: '#F8F6FB',
  primary: '#7C3AED',
  primaryDark: '#5B21B6',
  secondary: '#FF4D8D',
  secondarySoft: '#FFE5EF',
  lavender: '#EEE8FF',
  success: '#1F9D6A',
  successSoft: '#E3F7EF',
  warning: '#D97706',
  warningSoft: '#FFF3D6',
  danger: '#D94063',
  dangerSoft: '#FFE8EE',
  border: '#E9E4EF',
  white: '#FFFFFF',
  black: '#000000',
  mapRoad: '#FFFFFF',
  mapWater: '#DCEAF7',
} as const;

export const Colors = {
  light: {
    text: Palette.ink,
    background: Palette.canvas,
    backgroundElement: Palette.surface,
    backgroundSelected: Palette.lavender,
    textSecondary: Palette.inkMuted,
  },
  dark: {
    text: '#F8F6FB',
    background: '#15121D',
    backgroundElement: '#211C2C',
    backgroundSelected: '#302543',
    textSecondary: '#BEB6C9',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
  seven: 32,
  eight: 40,
  nine: 48,
  ten: 64,
} as const;

export const Radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  pill: 999,
} as const;

export const Shadow = {
  soft: {
    shadowColor: '#241B36',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  floating: {
    shadowColor: '#241B36',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

export const MaxContentWidth = 760;
export const BottomTabInset = 88;
