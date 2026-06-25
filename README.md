# Stash Anything

A vibrant, premium content‑saving mobile app built with **Expo (React Native + TypeScript)**.
Save anything into themed collections ("stashes"), sort an inbox of unstashed items by tap or
drag‑and‑drop, browse shared collabs, and manage everything from a polished iOS‑style settings
screen. Uses the San Francisco (SF Pro) font and a custom floating tab bar.

> Target platform right now is **Android** (via an Expo **development build**). iOS works through
> the same Expo setup but requires macOS to compile.

---

## Tech stack

- Expo SDK 56 · React Native 0.85 · React 19 · TypeScript
- `expo-router` (file‑based navigation, `app/`)
- `expo-dev-client` (custom development build — **not** Expo Go)
- `lucide-react-native` + `react-native-svg` (icons / vector art)
- `expo-linear-gradient` (card gradients)
- `@react-native-async-storage/async-storage` (local persistence)
- New Architecture enabled

---

## Project layout

```
app/                     # expo-router routes
  _layout.tsx            # root: fonts, providers, splash
  (tabs)/                # bottom-tab screens
    _layout.tsx          # tab navigator (custom floating TabBar)
    index.tsx            # Home (stash grid + create)
    unstashed.tsx        # Unstashed inbox (tap / drag-to-sort)
    collab.tsx           # Collab grid + empty state
    settings.tsx         # Settings list
src/
  components/            # TabBar, StashCard, CardStack, StashFadeColumn, settings UI, etc.
  store.tsx              # AsyncStorage-backed stash/inbox store
  data.ts               # seed data
  theme.ts              # colors, fonts, layout helpers
assets/fonts/            # bundled SF Pro Display/Text weights
```

`android/` and `ios/` are **generated** (Continuous Native Generation) and are git‑ignored — they
are recreated by `expo run:*` / `expo prebuild`.

---

## Prerequisites

- **Node.js 20+** (developed on Node 22) and npm
- **JDK 17**
- **Android Studio** with:
  - Android SDK (Platform 34+; this project compiles against SDK 36)
  - Android SDK Platform‑Tools (`adb`)
  - Android NDK (installed automatically on first build if missing)
  - An **Android Virtual Device (AVD)** — e.g. a Pixel 8 emulator

Set the Android SDK environment variables so Gradle can find the SDK.

**Windows (PowerShell, persistent):**
```powershell
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")
[Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", "$env:LOCALAPPDATA\Android\Sdk", "User")
```
**macOS/Linux (bash/zsh):**
```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"   # macOS; Linux: ~/Android/Sdk
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
```

---

## Setup

```bash
git clone https://github.com/async-wei/folder-app.git
cd folder-app
npm install
# If npm errors with ERESOLVE (peer-dependency conflict), use:
# npm install --legacy-peer-deps
```

---

## Run on an Android emulator

This app uses a **development build**, so the first run compiles a custom dev client and installs
it on the emulator.

1. **Start an emulator** (or plug in a device with USB debugging). To launch an AVD from the CLI:
   ```bash
   emulator -list-avds
   emulator -avd <YourAVDName>          # e.g. Pixel_8
   # verify it's connected:
   adb devices
   ```

2. **Build, install and launch** the dev client + Metro (first build takes several minutes — it
   downloads Gradle, the NDK, and compiles native modules):
   ```bash
   npm run android
   ```
   This runs `expo run:android`, which generates `android/`, builds the debug APK, installs it on
   the running emulator, starts Metro, and opens the app.

3. **Day‑to‑day iteration** (after the dev client is installed once): you don't need to rebuild for
   JS changes — just start the dev server and the app hot‑reloads:
   ```bash
   npm start          # = expo start --dev-client
   ```
   Then open the app on the emulator (it reconnects to Metro). Press `r` in the terminal to reload.

   You only need to re‑run `npm run android` when **native** config changes (new native dependency,
   `app.json` plugins, app icon, package name, etc.).

### Scripts
- `npm run android` — build + install + run the Android dev client
- `npm start` — start Metro for the installed dev client
- `npm run typecheck` — `tsc --noEmit`

---

## Notes

- **Fonts:** the app bundles Apple's SF Pro (Display + Text) weights in `assets/fonts/`. They are
  loaded at startup in `app/_layout.tsx`. (SF Pro is Apple‑licensed; included here for development.)
- **Persistence:** stashes and the unstashed inbox are saved locally via AsyncStorage and seeded
  with sample data on first launch.
- **Temporary dev toggles (Unstashed tab):** the header has dev‑only chips to switch the sort
  interaction between **Tap** and **Drag**, and to flip the inbox between **Empty** and **Filled**.
  The stash list is also doubled in this view for testing the scroll/fade. These are marked
  `TEMP`/dev in the code and will be removed before release.
- **Troubleshooting:**
  - `adb: command not found` → add `platform-tools` to `PATH` (see env setup above).
  - Gradle can't find the SDK → ensure `ANDROID_HOME` is set and restart the terminal.
  - Metro port (8081) already in use → stop the other process, or run `npx expo start --dev-client --port 8082`.
