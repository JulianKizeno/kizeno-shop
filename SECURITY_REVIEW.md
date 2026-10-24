# Revisión de seguridad — 2026-10-24

Repositorio: `JulianKizeno/kizeno-shop`. Rama: `security/review-2026-10-24`.

## Correcciones

- CWE-321: replace the public session signing secret and harden cookies
- CWE-943: reject object/array credentials and bound bcrypt inputs
- CWE-200/CWE-521: exclude password hashes from responses and enforce 8-character passwords
- Server-side authentication and administrator authorization
- CWE-862/CWE-915: require administrator permission for writes; allowlist product fields
- CWE-639: prevent reading another user’s cart by changing its owner ID
- Update vulnerable dependencies: mongoose ^6.13.12, bcrypt ^6.0.0, passport ^0.7.0
- Upgrade vulnerable Axios 0.19 to current 1.20, retaining the HTTP client API
- Replace the unsupported Create React App dependency tree with Vite/Vitest; preserve application source and build output directory
- Remove committed environment values and add a value-free template; rotate any previously exposed credentials/signing secrets (history retained)
- Remove committed obsolete dependency trees; use corrected lockfiles and npm install

## Auditoría npm después de los cambios

| Proyecto | Críticas | Altas | Moderadas | Bajas | Total |
|---|---:|---:|---:|---:|---:|
| `client` | 0 | 0 | 0 | 0 | 0 |
| `server` | 0 | 0 | 0 | 0 | 0 |

## Verificación

- `client`: instalación correcta; build correcto; sin pruebas unitarias existentes.
- Pruebas de regresión de seguridad (`server/security-tests`): correctas.
- Inicialización de servidor (`server`) con APIs reales de las dependencias y conexión de base de datos aislada: correcta.

## Límites y configuración

- La auditoría cubre el árbol npm resuelto, no demuestra ausencia de vulnerabilidades de lógica, infraestructura o servicios externos. No se ha desplegado ni fusionado este cambio.
- Configurar un SESSION_SECRET nuevo de al menos 32 caracteres. En producción las cookies requieren HTTPS; revisar la configuración del proxy de confianza para la topología real.
- Los archivos .env se sustituyen por ejemplos sin valores. Rotar cualquier credencial o secreto publicado previamente; eliminarlo de esta rama no lo borra del historial.
- Migración de herramientas: usar Node 22.22.2+ o Node 24.15+ según engines, reinstalar con npm ci y revisar visualmente los flujos de la aplicación antes de fusionar. Protractor/TSLint obsoletos dejan de ser comandos disponibles donde se retiraron; los archivos e2e se conservan como referencia.
