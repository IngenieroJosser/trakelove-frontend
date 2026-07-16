# LoveTrack Mobile UI/UX

Prototipo navegable en React Native + Expo Router para compartir ubicación entre dos personas con consentimiento explícito.

## Experiencia implementada

- Bienvenida y propuesta de privacidad.
- Registro e inicio de sesión.
- Vinculación mediante código, QR o invitación.
- Mapa principal con ubicación actual, última actualización, precisión GPS, batería, conectividad y velocidad.
- Aviso visible de ubicación compartida y control para pausarla.
- Historial de las últimas 24 horas con horas exactas, permanencias y detalle de precisión.
- Lugares guardados: casa, trabajo, iglesia y casa de un familiar.
- Creación de lugares seleccionando un pin exacto en el mapa.
- Alertas de entrada y salida por lugar.
- Ajustes de permisos, dispositivo, privacidad, retención y eliminación definitiva del historial.
- Detalle de lugar con coordenadas, reglas de confirmación y última visita.

## Criterio UX para evitar falsas llegadas

La interfaz no trata una geocerca amplia como una llegada confirmada. Cada lugar conserva un pin exacto y una distancia interna de confirmación. El estado mostrado puede ser:

1. `En <lugar>`: distancia y precisión permiten confirmar la presencia.
2. `Cerca de <lugar>`: el dispositivo está próximo, pero la lectura no es suficientemente precisa.
3. `A X m de <lugar> · En camino`: todavía no ha llegado.

La lógica de demostración está en `src/lib/location.ts` y usa:

- distancia Haversine al pin;
- precisión horizontal reportada por el GPS;
- distancia de confirmación configurada para el lugar.

En backend/producción se recomienda añadir dos o más lecturas consecutivas, tiempo mínimo de permanencia y detección de movimiento antes de generar una notificación.

## Rutas principales

```text
/
/login
/register
/link-partner
/(tabs)             Mapa
/(tabs)/history
/(tabs)/places
/(tabs)/alerts
/(tabs)/settings
/add-place
/place-details
/delete-history
```

## Ejecución

```bash
npm install
npm run android
# o
npm run ios
```

Para ubicación en segundo plano y geofencing real se necesita un **development build**; Expo Go no cubre completamente esas capacidades.

## Validaciones realizadas

```bash
npx tsc --noEmit
npm run lint
npx expo config --type public
```

Las tres validaciones finalizan correctamente.

## Estado técnico

Este entregable implementa UI/UX, navegación, permisos de ubicación en primer plano, mapa nativo y datos de demostración. Aún no incluye backend, autenticación real, WebSocket, almacenamiento persistente, tareas de ubicación en segundo plano ni notificaciones push.
