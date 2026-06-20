# Stash Anything - Android App Project Structure

## Overview
This is an Android application inspired by the Stash Anything iOS app. It's a digital vault for saving links, posts, articles, recipes, screenshots, and other content with one-tap save from any app.

## Technology Stack
- **Language**: Kotlin
- **Architecture**: MVVM (Model-View-ViewModel)
- **UI Framework**: Jetpack Compose
- **Database**: Room
- **Dependency Injection**: Hilt
- **Networking**: Retrofit + OkHttp (for future sync features)
- **Image Loading**: Coil
- **Async**: Kotlin Coroutines
- **Storage**: DataStore + SharedPreferences

## Project Structure

```
folderapp/
├── app/                              # Main application module
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/stashapp/
│   │   │   │   ├── MainActivity.kt                    # Main entry point
│   │   │   │   ├── StashApplication.kt               # Hilt Application setup
│   │   │   │   │
│   │   │   │   ├── di/                               # Dependency Injection
│   │   │   │   │   └── AppModule.kt                  # Hilt modules
│   │   │   │   │
│   │   │   │   ├── data/                             # Data layer
│   │   │   │   │   ├── database/
│   │   │   │   │   │   ├── StashEntity.kt            # Room entities
│   │   │   │   │   │   ├── StashDao.kt               # Room DAOs
│   │   │   │   │   │   └── StashDatabase.kt          # Room Database
│   │   │   │   │   └── repository/
│   │   │   │   │       └── StashRepository.kt        # Data repository
│   │   │   │   │
│   │   │   │   ├── domain/                           # Business logic (future)
│   │   │   │   │   └── usecases/                     # Use cases (future)
│   │   │   │   │
│   │   │   │   ├── presentation/                     # UI layer
│   │   │   │   │   ├── screens/
│   │   │   │   │   │   ├── HomeScreen.kt             # Home screen with stash list
│   │   │   │   │   │   └── StashDetailScreen.kt      # Stash detail with items
│   │   │   │   │   ├── viewmodels/
│   │   │   │   │   │   └── StashViewModel.kt         # Main view model
│   │   │   │   │   └── components/                   # Reusable components (future)
│   │   │   │   │
│   │   │   │   └── ui/                               # Theme & styling
│   │   │   │       └── theme/
│   │   │   │           ├── Theme.kt                  # Material 3 theme
│   │   │   │           ├── Type.kt                   # Typography
│   │   │   │           └── Shape.kt                  # Shapes
│   │   │   │
│   │   │   ├── AndroidManifest.xml                   # App manifest
│   │   │   └── res/
│   │   │       ├── values/
│   │   │       │   └── strings.xml                   # String resources
│   │   │       ├── mipmap/                           # App icons
│   │   │       └── drawable/                         # Drawables (future)
│   │   │
│   │   └── test/                                     # Unit tests
│   │
│   ├── build.gradle.kts                              # App-level build config
│   └── proguard-rules.pro                            # ProGuard rules
│
├── build.gradle.kts                                  # Project-level build config
├── settings.gradle.kts                               # Project settings
├── imagereference/                                   # Reference UI screenshots
│   └── 230x498bb*.webp                               # Stash Anything app screenshots
│
└── PROJECT_STRUCTURE.md                              # This file
```

## Key Components

### Data Layer
- **StashEntity**: Represents a stash (folder/category)
- **SavedItemEntity**: Represents a saved item (link, image, etc.)
- **StashDao & SavedItemDao**: Database access objects
- **StashRepository**: Abstraction layer for data operations

### Presentation Layer
- **StashViewModel**: Manages UI state and handles user interactions
- **HomeScreen**: Displays list of stashes
- **StashDetailScreen**: Shows items in a selected stash
- **Material 3 Theme**: Modern, adaptive theming

### Features (Current State)
✅ Create stashes (categories)
✅ Save items to stashes
✅ View all stashes
✅ View items in a stash
✅ Search within stash
✅ Global search
✅ Favorite items
✅ Share sheet integration (backend ready)
⏳ Edit stash details
⏳ Edit saved items
⏳ Cloud sync
⏳ Collaborative sharing
⏳ Tags and nested folders
⏳ Offline mode
⏳ Export functionality

## Architecture Pattern

### MVVM Flow
```
UI (Compose) 
  → ViewModel (StashViewModel)
    → Repository (StashRepository)
      → DAO (StashDao/SavedItemDao)
        → Room Database
```

Each layer is independent and uses coroutines for async operations.

## Build & Run

### Prerequisites
- Android Studio Flamingo or later
- Kotlin 1.9.20+
- Gradle 8.2.0+
- Min SDK: 26, Target SDK: 34

### Building
```bash
# From project root
./gradlew build

# Run on device/emulator
./gradlew installDebug
./gradlew installRelease
```

## Dependencies
Key dependencies are defined in `app/build.gradle.kts`:
- AndroidX Core, AppCompat, Activity
- Jetpack Compose & Material 3
- Room database
- Hilt dependency injection
- Retrofit + OkHttp
- Coil image loading
- Kotlin Coroutines

## Future Enhancements
1. **Sync**: Cloud sync with backend
2. **Collaboration**: Share stashes with other users
3. **Advanced Search**: Semantic search
4. **Export**: Markdown, PDF export
5. **Widgets**: Home screen widgets
6. **Offline Mode**: Better offline-first architecture
7. **Media Processing**: Extract text from images (OCR)
8. **Social Features**: Comments, reactions on items

## Notes
- Reference images from Stash Anything are stored in `imagereference/` folder
- UI/UX design is original - not copied from reference
- Architecture supports easy testing
- All dependencies are latest stable versions as of 2024
