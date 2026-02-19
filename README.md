# TBMS Connect

TBMS Connect is an Expo + React Native app for school management workflows including authentication, dashboards, attendance, exams, homework, timetable, fees, announcements, and settings.

## Tech Stack

- Expo SDK 54
- React 19 / React Native 0.81
- TypeScript
- React Navigation (Native Stack + Bottom Tabs)
- Zustand (state management)
- Axios (HTTP client + token refresh flow)
- React Hook Form + Yup (form handling and validation)
- Expo Secure Store (token storage)
- Jest + Testing Library (testing)

## Features

- Role-based app navigation (`student`, `teacher`, `parent`, `admin`)
- Auth flow: Login, Forgot password, OTP verification, Reset password
- Domain modules: Attendance, Exams, Homework, Timetable, Fees, Announcements, Settings
- Theme initialization and app-level loading bootstrap

## Project Structure

```text
TBMSConnect/
  src/
    app/
      navigation/
    features/
      announcements/
      attendance/
      auth/
      dashboard/
      exams/
      fees/
      homework/
      settings/
      timetable/
    services/
    shared/
    store/
  __tests__/
  App.tsx
  app.json
  package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Expo CLI environment (via `npx expo` is enough)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```bash
EXPO_PUBLIC_API_URL=https://your-api-base-url
```

Notes:
- `EXPO_PUBLIC_API_URL` is used in `src/services/api.ts`.
- If not set, the app falls back to a default URL defined in code.

## Run the App

```bash
npm run start
```

Then choose platform:

- `a` for Android emulator/device
- `i` for iOS simulator (macOS)
- `w` for web

You can also use direct scripts:

```bash
npm run android
npm run ios
npm run web
```

## Available Scripts

```bash
npm run start
npm run android
npm run ios
npm run web
npm run test
npm run test:watch
npm run test:coverage
npm run lint
npm run typecheck
```

## Authentication and API Notes

- Access and refresh tokens are stored via Expo Secure Store.
- Axios request interceptor attaches `Authorization: Bearer <token>`.
- Axios response interceptor handles `401` with refresh-token retry logic and request queueing.

## Testing

Run tests:

```bash
npm run test
```

For coverage:

```bash
npm run test:coverage
```

## Known Status

- Some modules are still under active development.
- Current `npm run typecheck` reports existing project-wide TypeScript errors in files outside the auth reset-password flow.

## Build and Release (Expo)

This project is compatible with Expo workflows. For production builds, use EAS Build/Submit as needed for your org setup.

## Contributing

1. Create a branch.
2. Make focused changes.
3. Run lint/tests/typecheck.
4. Open a PR with clear scope and screenshots (for UI changes).
