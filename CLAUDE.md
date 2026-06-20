# Stash Anything - Android App Development Guide

## Project Overview
We're building an Android version of the Stash Anything app - a digital vault for saving and organizing content (links, screenshots, articles, recipes, videos, etc.) with one-tap share integration.

**Reference**: Original iOS app at https://apps.apple.com/us/app/stash-anything-digital-vault/id6758998468

## Key Principles

### Design Approach
- **Inspired by, not copied from**: We use Stash Anything's core concepts (stashes, one-tap save, organization) but build our own UI/UX
- **Reference images**: In `imagereference/` folder (9 app screenshots) - study for flow/features, not UI design
- **Own design identity**: Create distinctive Android UI using Material 3

### Development Philosophy
- **Fundamentals first**: Focus on core functionality before advanced features
- **Kotlin + Compose**: Modern Android stack, not legacy Views
- **MVVM architecture**: Clean separation of concerns for testing
- **Local-first**: Data stored locally first, sync comes later
- **Incremental features**: Build and test features one at a time

## Current State

### Phase 1: ✅ COMPLETE - Android Project Setup
- Build system configured (Gradle, dependencies)
- Database layer created (Room entities, DAOs)
- Repository pattern implemented
- ViewModel with state management
- Basic Compose screens (HomeScreen, StashDetailScreen)
- Material 3 theme setup
- Dependency injection (Hilt) configured
- Manifest with share intent filters ready

### Key Files
- `app/build.gradle.kts` - Dependencies and build config
- `app/src/main/java/com/stashapp/` - Source code
- `app/src/main/AndroidManifest.xml` - Permissions, intent filters
- `PROJECT_STRUCTURE.md` - Detailed architecture docs

## Core Features to Build

### MVP (Must Have)
1. ✅ Database: Save stashes and items
2. ✅ Create stash (category)
3. ✅ Save items to stash
4. ✅ View stashes and items
5. ✅ Share sheet integration (backend ready)
6. ✅ Search items
7. **Next**: Edit/delete stashes
8. **Next**: Edit/delete items
9. **Next**: Tags and favorites UI
10. **Next**: Item detail screen

### Phase 2 (Should Have)
- Cloud sync backend
- User authentication
- Collaborative stashes
- Export to Markdown/PDF
- Offline mode with sync conflict resolution
- Advanced search/filtering
- Widget support

### Phase 3+ (Nice to Have)
- Social features (comments, sharing)
- AI-powered tagging
- Full-text search
- Mobile web sync
- Siri Shortcuts integration
- Dark mode refinements

## Architecture

```
MainActivity.kt (Share receiver)
    ↓
StashViewModel (State & logic)
    ↓
StashRepository (Data layer)
    ↓
StashDatabase (Room)
    ├─ StashEntity (stashes/folders)
    └─ SavedItemEntity (saved content)
```

**Key Pattern**: All data flows through ViewModel → StateFlow → UI recomposition

## Important Notes

### Kotlin/Compose Best Practices
- Use `StateFlow` for state management (not `MutableState` in ViewModel)
- Compose screens are reusable, testable functions
- Keep ViewModels lean - business logic in Repository
- Use `collectAsState()` in Compose to subscribe to flows

### Database Patterns
- Entities = data classes with @Entity annotation
- DAOs = query interfaces with Flow return types
- Repository = single source of truth for data access
- Never expose DAO directly to ViewModel

### Testing Strategy
- Unit tests for ViewModels
- Database tests for DAOs
- UI tests for Compose screens (future)

## Common Tasks

### Adding a New Screen
1. Create screen file in `presentation/screens/`
2. Add navigation route in MainActivity
3. Create/use ViewModel
4. Use `collectAsState()` for reactive data

### Adding a New Database Entity
1. Create entity in `data/database/StashEntity.kt`
2. Add DAO methods in `data/database/StashDao.kt`
3. Add migration if schema changes
4. Update Repository with new methods

### Sharing & Intents
- `MainActivity.handleIncomingIntent()` processes shares
- `ViewModel.handleSharedText()` for text/links
- `ViewModel.handleSharedMedia()` for images/videos
- Currently saves to pending state, needs UI dialog to choose stash

## Dev Workflow

### To Test Share Integration
1. Open any app (Chrome, Reddit, TikTok, etc.)
2. Long-press content
3. Tap "Share" → "Stash Anything"
4. App opens with share preview

### To Debug Database
- Use Android Studio's Database Inspector
- Or query SQLite directly: `adb shell sqlite3 /data/data/com.stashapp/databases/stash_database`

### To Check Logs
```bash
adb logcat | grep com.stashapp
```

## File Naming Conventions
- `Screens`: `*Screen.kt` (e.g., HomeScreen.kt)
- `ViewModels`: `*ViewModel.kt` (e.g., StashViewModel.kt)
- `Entities`: `*Entity.kt` (e.g., StashEntity.kt)
- `DAOs`: `*Dao.kt` (e.g., StashDao.kt)
- `Repositories`: `*Repository.kt` (e.g., StashRepository.kt)
- `Composables`: PascalCase (e.g., `StashCard`, `SavedItemCard`)

## Dependency Versions (Lock to These)
- Kotlin: 1.9.20
- Gradle: 8.2.0
- Compose: 1.6.1
- Room: 2.6.1
- Hilt: 2.49
- Min SDK: 26, Target: 34

## Known Limitations / TODOs
- Share sheet shows dialog but needs stash selection UI
- No item detail screen yet
- No offline sync conflict resolution
- Images stored locally only (no cloud backup)
- No user authentication system
- Search UI not integrated into HomeScreen

## Quick Reference Links
- Material 3 Components: https://m3.material.io/
- Compose Modifier Documentation: https://developer.android.com/reference/kotlin/androidx/compose/ui/Modifier
- Room Database Guide: https://developer.android.com/jetpack/androidx/releases/room
- Hilt Dependency Injection: https://dagger.dev/hilt/

---

**Last Updated**: 2026-06-19
**Phase**: Setup Complete, Ready for Feature Development
