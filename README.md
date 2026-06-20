# Stash Anything - Android Edition

A modern Android app inspired by the popular Stash Anything iOS app. Save links, posts, articles, recipes, screenshots, and more to organized digital vaults with one tap.

## Quick Start

### Setup
1. Open the project in Android Studio
2. Sync Gradle files
3. Connect an Android device or start an emulator (API 26+)
4. Run the app with `Shift + F10` or click the Run button

### Project Initialized
✅ Kotlin Android project with MVVM architecture
✅ Jetpack Compose UI framework
✅ Room database for local storage
✅ Hilt dependency injection
✅ Material 3 design system
✅ Share sheet integration ready

## Project Layout

- **MainActivity.kt**: Entry point, handles incoming shares
- **data/**: Room database, DAOs, Repository pattern
- **presentation/**: MVVM screens and ViewModels
- **di/**: Hilt dependency injection setup
- **ui/theme/**: Material 3 theme configuration

See `PROJECT_STRUCTURE.md` for detailed architecture documentation.

## Current State

### What's Built
- ✅ Database layer (Room with Stash and SavedItem entities)
- ✅ Repository pattern for data access
- ✅ ViewModel with state management
- ✅ Home screen showing stashes
- ✅ Stash detail screen showing items
- ✅ Share sheet handling (backend ready)
- ✅ Search functionality
- ✅ Favorite items toggle
- ✅ Material 3 theme

### What's Next
After this setup phase, we'll plan and build:
1. **UI/Dialogs**: Create/edit stash dialogs, item details
2. **Features**: Tag system, nested folders, search improvements
3. **Sync**: Cloud storage backend integration
4. **Polish**: Animations, transitions, better error handling
5. **Testing**: Unit tests, integration tests

## Key Technologies

| Component | Technology |
|-----------|------------|
| Language | Kotlin |
| UI | Jetpack Compose |
| Database | Room + SQLite |
| DI | Hilt |
| Async | Kotlin Coroutines |
| Images | Coil |
| Networking | Retrofit (for future sync) |

## App Architecture

```
Data Layer (Room DB)
    ↓
Repository Pattern
    ↓
ViewModel (State Management)
    ↓
Compose UI (Screens)
```

## File Structure

```
app/src/main/
├── java/com/stashapp/
│   ├── data/          # Database, DAOs, Repository
│   ├── di/            # Hilt modules
│   ├── presentation/  # Screens, ViewModels
│   └── ui/theme/      # Theming
└── res/
    ├── values/        # Strings, colors, dimensions
    └── mipmap/        # Icons
```

## Build Configuration

- **Min SDK**: 26
- **Target SDK**: 34
- **Kotlin**: 1.9.20
- **Gradle**: 8.2.0
- **Compose**: Latest stable

## Testing

Unit and instrumentation tests can be added in:
- `app/src/test/` - Unit tests
- `app/src/androidTest/` - Instrumentation tests

## Debugging

Enable Logcat to see app logs:
1. Android Studio → View → Tool Windows → Logcat
2. Filter by app package: `com.stashapp`
3. Add breakpoints in your code

## Next Phase

Once you're ready, we'll:
1. **Plan detailed app structure** for features like:
   - User authentication (optional)
   - Cloud sync
   - Collaborative stashes
   - Advanced tagging
   - Export formats

2. **Implement specific features** based on priority

3. **Add comprehensive tests** and polish

## Resources

- [Android Jetpack Compose](https://developer.android.com/jetpack/compose)
- [Room Database](https://developer.android.com/jetpack/androidx/releases/room)
- [Hilt Dependency Injection](https://developer.android.com/training/dependency-injection/hilt-android)
- [Kotlin Coroutines](https://kotlinlang.org/docs/coroutines-overview.html)
- [Material 3 Design](https://m3.material.io/)

## Reference Images

See `imagereference/` folder for Stash Anything app UI examples (for inspiration only - we create our own design).

---

**Status**: Initial Android project setup complete. Ready for feature planning and development.
