# Stash Anything - MVP Context & Architecture

## Project Overview

**Stash Anything** is a premium mobile app for saving and organizing content from anywhere on your device. Think of it as a personal content library where users create "stashes" (collections) and save items (links, images, text) into them.

**Target**: Premium iOS-like Android experience. Not a default Material Design app. Clean, minimal, custom feel.

---

## Core Problem We're Solving

Users want to:
1. **Save content quickly** from any app (share intent)
2. **Organize by topic** (stashes = collections)
3. **Find things later** (search)
4. **Revisit favorites** (unstashed/recent)

Existing solutions (Pinterest, Pocket, Notion) are either too heavy, too specific, or require manual formatting. We're building the lightweight, flexible version.

---

## Data Model

### Core Entities

**StashEntity** (Collection/Folder)
```
- id: Int (auto-increment)
- name: String (e.g., "Design Inspiration")
- description: String (optional)
- color: String (hex color for UI)
- itemCount: Int (cache, computed from SavedItem count)
- createdAt: Long (timestamp)
- updatedAt: Long (timestamp)
- isShared: Boolean (future)
- collaborators: String (JSON array, future)
```

**SavedItemEntity** (Individual saved content)
```
- id: Int (auto-increment)
- stashId: Int (foreign key)
- title: String
- description: String
- url: String (normalized)
- imageUrl: String (cached preview)
- tags: String (CSV for now)
- sourceApp: String (e.g., "instagram", "twitter", "safari")
- savedAt: Long (timestamp)
- isFavorite: Boolean
- isLocalOnly: Boolean (not synced)
- raw: String (raw metadata as JSON)
```

### Database
- Room ORM with SQLite
- Entities in `data/database/`
- DAOs handle queries (StashDao, SavedItemDao)
- Repository pattern for data access

---

## Architecture

### MVVM + Repository Pattern

```
Presentation Layer (Compose UI)
    ↓
ViewModel (StateFlow, coroutines)
    ↓
Repository (data orchestration)
    ↓
Data Layer (Room Database + local storage)
```

### Key Layers

**Presentation** (`presentation/`)
- Screens: HomePremium, UnstashedPremium, SearchPremium, SettingsPremium
- Components: BottomNavigationBar, CreateStashDialogPremium, StashCardPremium
- Theme: San Francisco font, black/white color scheme

**ViewModel** (`presentation/viewmodels/`)
- StashViewModel: manages stashes and saved items
- Uses StateFlow for reactive updates
- Handles business logic (create, update, delete, search)

**Repository** (`data/repository/`)
- StashRepository: single source of truth
- Coordinates StashDao and SavedItemDao
- Handles data transformations

**Database** (`data/database/`)
- StashDatabase: Room database
- StashDao, SavedItemDao: query interfaces
- Entities: StashEntity, SavedItemEntity

### State Management

- **StateFlow** for UI state (not LiveData)
- **Coroutines** for async operations
- **Manual DI** (no Hilt - AGP compatibility issues)

---

## UI/UX Design System

### Color Palette
- **Primary**: Black (#000000)
- **Background**: White (#FFFFFF)
- **Secondary**: Gray (#666666, #999999)
- **Light Gray**: #F0F0F0, #F5F5F5 (inputs, backgrounds)
- **Accents**: User-selected stash colors (orange, coral, etc.)

### Typography
- **Font**: San Francisco (Regular, Medium, Semibold, Bold)
- All font files in `app/src/main/res/font/`
- Type.kt defines all text styles

### Component Sizing
- Padding: 16-24dp standard
- Border radius: 12-20dp (all rounded)
- Icon sizes: 20-24dp standard
- Card heights: 140dp (stash cards)
- Bottom nav: 64dp height

### No Ripple Effects
- Custom solid highlights instead (light gray background)
- Removed Material Design ripples completely
- Clickable with `indication = null, interactionSource = remember { MutableInteractionSource() }`

---

## Navigation

**4 Main Tabs** (Bottom Navigation)
1. **Home** - View all stashes, create new stash, quick actions
2. **Unstashed** - Recently saved items, items without stash
3. **Search** - Global search across all items
4. **Settings** - App settings, user preferences

**Deep Links**
- `home` → HomePremium
- `unstashed` → UnstashedPremium
- `search` → SearchPremium
- `settings` → SettingsPremium
- `stash/{stashId}` → StashDetailScreen (shows items in stash)

---

## Feature Set (MVP)

### Implemented ✅
- Create stashes with color selection
- View all stashes in 2-column grid
- Premium UI with San Francisco font
- Edge-to-edge display
- Custom bottom navigation (no ripples)
- Basic theme (black/white)
- Empty placeholder screens for other tabs

### In Progress 🔄
- (None - UI foundation complete)

### To Build 📋
- **Home Screen Details**
  - Add stash count and last modified date
  - Implement swipe-to-delete
  - Implement long-press menu (duplicate, export, etc.)

- **Unstashed Tab**
  - List recently saved items
  - Filter by date, source app
  - Quick add to stash

- **Search Tab**
  - Full-text search across titles, descriptions, tags
  - Filter by stash, date, source app
  - Search suggestions based on history

- **Settings Tab**
  - User preferences (theme, sorting)
  - Data management (export, import, backup)
  - About, help, feedback

- **Detail Screen** (Stash Contents)
  - List all items in stash
  - Sort options (date, title, favorite)
  - View individual item details
  - Quick actions (copy URL, share, delete)

- **Share Intent** (Core Feature)
  - Handle Intent.ACTION_SEND (single file/link)
  - Handle Intent.ACTION_SEND_MULTIPLE (multiple files)
  - Parse metadata from shared content
  - Auto-categorize or prompt user for stash

- **Item Detail** (Full View)
  - Show full content, image preview
  - Edit title, description, tags
  - Move to different stash
  - Mark as favorite

---

## Technical Stack

### Language & Framework
- **Kotlin** (primary language)
- **Jetpack Compose** (UI framework - no XML)
- **Android 26+** (minSdk)

### Key Libraries
- **Jetpack**
  - Compose UI 1.5.4
  - Material3 1.1.2
  - Navigation Compose 2.7.2
  - ViewModel + LiveData 2.6.1
  - Room 2.6.1
  - Lifecycle 2.6.1

- **Icons & Fonts**
  - Material Icons Extended 1.5.4
  - San Francisco font (embedded)

- **Utilities**
  - Coroutines 1.7.3
  - Coil (image loading) 2.5.0

### Build Config
- Gradle with Kotlin DSL
- API 34 (target & compile)
- Min API 26 (Android 8.0)
- No Hilt (manual DI due to AGP compatibility)

---

## File Structure

```
app/src/main/
├── java/com/stashapp/
│   ├── MainActivity.kt                    # Entry point, navigation setup
│   ├── data/
│   │   ├── database/
│   │   │   ├── StashDatabase.kt          # Room database
│   │   │   ├── StashEntity.kt            # Stash data model
│   │   │   ├── StashDao.kt               # Stash queries
│   │   │   └── SavedItemEntity.kt        # Item data model
│   │   └── repository/
│   │       └── StashRepository.kt        # Data access layer
│   ├── presentation/
│   │   ├── screens/
│   │   │   ├── HomePremium.kt           # Home screen (implemented)
│   │   │   ├── UnstashedPremium.kt      # Recent items (placeholder)
│   │   │   ├── SearchPremium.kt         # Search (placeholder)
│   │   │   ├── SettingsPremium.kt       # Settings (placeholder)
│   │   │   └── StashDetailScreen.kt     # Stash contents (placeholder)
│   │   ├── components/
│   │   │   ├── BottomNavigationBar.kt   # Custom nav (implemented)
│   │   │   ├── StashCardPremium.kt      # Card UI (implemented)
│   │   │   ├── CreateStashDialogPremium.kt # Dialog (implemented)
│   │   │   ├── CustomIcons.kt           # Icon wrappers
│   │   │   └── SvgIcon.kt               # Icon utilities
│   │   └── viewmodels/
│   │       ├── StashViewModel.kt        # Main view model
│   │       └── StashViewModelFactory.kt # DI helper
│   └── ui/theme/
│       ├── Theme.kt                      # Black/white color scheme
│       ├── Type.kt                       # San Francisco font setup
│       └── Shape.kt                      # Corner radius config
├── res/
│   ├── font/                             # San Francisco fonts
│   │   ├── sf_regular.otf
│   │   ├── sf_semibold.otf
│   │   ├── sf_bold.otf
│   │   └── sf_medium.otf
│   └── values/
│       └── strings.xml                   # App strings
└── AndroidManifest.xml                   # Permissions, activities
```

---

## Design Decisions & Rationale

### Why Manual DI, Not Hilt?
Hilt had AGP (Android Gradle Plugin) compatibility issues in initial setup. Manual DI is simpler, more transparent, and sufficient for MVP.

### Why San Francisco Font?
Premium iOS apps use SF. It signals quality and consistency. Embedded locally for offline reliability.

### Why Black/White Color Scheme for MVP?
Simplicity. Reduces cognitive load during development. Users can customize stash colors. Focus on functionality first, theming later.

### Why No Ripple Effects?
Material Design ripples feel generic. Custom solid highlights (light gray background) are cleaner, more premium, less "Android-y".

### Why Room, Not Firebase?
Local-first approach. Privacy-conscious. Offline-capable. Simpler for MVP. Firebase integration can be added later for sync.

### Why Compose, Not XML?
Modern, declarative, cleaner code. Better for rapid iteration. Easier to build custom premium UI.

---

## What's Next (Post-MVP)

1. **Share Intent** - Save from other apps (critical feature)
2. **Item Details** - Full UI for viewing/editing items
3. **Search** - Implement full-text search
4. **Sync** - Firebase/cloud backup
5. **Sharing** - Collaborate on stashes (future)
6. **Themes** - Dark mode, custom colors
7. **Advanced Sorting** - Filter, sort by multiple fields

---

## Success Metrics (MVP)

- App launches without errors
- Can create and view stashes
- UI feels premium (not default Android)
- All navigation works smoothly
- No crashes on typical workflows
- Build time < 60 seconds

---

## Known Issues / Tech Debt

- Placeholder screens need full implementation
- No error handling for edge cases yet
- Item counts are hardcoded (should query DB)
- No input validation on stash creation
- Share intent not yet integrated
- Search not implemented

---

## Running & Testing

```bash
# Build
./gradlew clean build

# Run on emulator
./gradlew installDebug

# Launch
adb shell am start -n com.stashapp/.MainActivity

# View logs
adb logcat com.stashapp:V *:S
```

---

**Last Updated**: 2026-06-21
**Status**: MVP UI Complete, Ready for Core Feature Development
