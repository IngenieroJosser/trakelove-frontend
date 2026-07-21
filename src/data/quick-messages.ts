export type QuickMessage = {
  id: string;
  emoji: string;
  label: string;
  accessibilityLabel: string;
};

export const quickMessages: QuickMessage[] = [
  {
    id: 'stay-safe',
    emoji: '🛡️',
    label: 'Mantente a salvo',
    accessibilityLabel: 'Enviar mensaje Mantente a salvo',
  },
  {
    id: 'love-you',
    emoji: '❤️',
    label: 'Te amo',
    accessibilityLabel: 'Enviar mensaje Te amo',
  },
  {
    id: 'how-are-you',
    emoji: '👋',
    label: '¿Qué tal?',
    accessibilityLabel: 'Enviar mensaje Qué tal',
  },
  {
    id: 'tell-me-arrive',
    emoji: '🏠',
    label: 'Avísame al llegar',
    accessibilityLabel: 'Enviar mensaje Avísame al llegar',
  },
  {
    id: 'on-my-way',
    emoji: '🚗',
    label: 'Voy en camino',
    accessibilityLabel: 'Enviar mensaje Voy en camino',
  },
  {
    id: 'everything-ok',
    emoji: '📍',
    label: '¿Todo bien?',
    accessibilityLabel: 'Enviar mensaje Todo bien',
  },
  {
    id: 'battery',
    emoji: '🔋',
    label: '¿Tienes batería?',
    accessibilityLabel: 'Enviar mensaje Tienes batería',
  },
  {
    id: 'miss-you',
    emoji: '🥰',
    label: 'Te extraño',
    accessibilityLabel: 'Enviar mensaje Te extraño',
  },
];
