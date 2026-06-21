# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

# Project-Specific: Stash Anything

## Core Mandate

Build a premium Android app that doesn't feel like Android. Custom UI. Clean. Fast. The opposite of bloated Material Design defaults.

Data flows: UI → ViewModel → Repository → Database. Simple. Predictable. No surprises.

## Architecture (Non-Negotiable)

```
Compose UI ← StateFlow ← ViewModel ← Repository ← Room Database
```

- UI is dumb. It renders state.
- ViewModel manages state and business logic.
- Repository is the single entry point for data.
- Database is the source of truth.

**Don't deviate.** If something doesn't fit this pattern, we're doing it wrong.

## Design (Non-Negotiable)

- **Font**: San Francisco everywhere. No exceptions.
- **Colors**: Black text on white background. Gray accents only.
- **Interactions**: Custom solid highlights (light gray), never ripples.
- **Spacing**: 16-24dp padding standard. 12-20dp border radius on everything.

Look at the app. Does it feel like a premium iOS app? If not, wrong.

## Before You Write Code

1. **What data structure does this feature need?** (Start with entities)
2. **Where does this logic live?** (ViewModel? Repository?)
3. **How does the UI render it?** (Compose last)

If you're starting with Compose, you're thinking backwards.

## Code Patterns

### StateFlow (Reactive State)

```kotlin
// Good: ViewModel exposes observable state
class StashViewModel(repository: StashRepository) {
    private val _stashes = MutableStateFlow<List<StashEntity>>(emptyList())
    val stashes: StateFlow<List<StashEntity>> = _stashes.asStateFlow()
    
    init {
        viewModelScope.launch {
            repository.getAllStashes().collect { _stashes.value = it }
        }
    }
}

// In Compose:
val stashes by viewModel.stashes.collectAsState()
```

**Why**: Single source of truth. Database → Repository → StateFlow → UI. Unidirectional.

### Parsing Colors

```kotlin
// Always handle parse failures
val colorLong = try {
    stash.color.replace("#", "").toLong(16) or 0xFF000000L
} catch (e: Exception) {
    0xFFFF6B6BL  // Safe fallback
}
val color = Color(colorLong)
```

**Why**: User data is messy. Never crash on parsing.

### Custom Clickables (No Ripples)

```kotlin
Box(
    modifier = Modifier
        .clickable(
            indication = null,  // Remove ripple
            interactionSource = remember { MutableInteractionSource() }
        ) {
            onClick()
        }
)
```

**Why**: Material ripples are generic. Our app is custom.

## Rules (Absolute)

❌ **Never** add Material Design ripples.
❌ **Never** hardcode colors or strings.
❌ **Never** put business logic in Composables.
❌ **Never** collect StateFlow in nested composables (recomposition hell).
❌ **Never** assume a feature will be needed before building it.

✅ **Always** ask: "Is this the simplest way?"
✅ **Always** test on emulator after changes.
✅ **Always** commit with clear messages.
✅ **Always** use white backgrounds and San Francisco font.
✅ **Always** remove ripples immediately if you see them.

## File Organization

```
app/src/main/java/com/stashapp/
├── presentation/
│   ├── screens/      ← All screens (HomePremium, etc.)
│   ├── components/   ← All components (StashCard, etc.)
│   └── viewmodels/   ← All ViewModels
├── data/
│   ├── database/     ← Room entities and DAOs
│   └── repository/   ← Data access orchestration
└── ui/theme/         ← Theme, colors, typography
```

No exceptions. Obvious structure. Anyone can find anything.

## When Adding a Feature

1. **Add data entity** if needed (data/database/)
2. **Add DAO query** (data/database/)
3. **Update Repository** (data/repository/)
4. **Update ViewModel** (presentation/viewmodels/)
5. **Build UI** (presentation/screens/ or components/)
6. **Test on emulator**
7. **Commit**

Never skip steps. Never do UI-first.

## Debugging

```bash
# Build
./gradlew clean build

# Install
./gradlew installDebug

# Launch
adb shell am start -n com.stashapp/.MainActivity

# Logs
adb logcat com.stashapp:V *:S
```

Keep it simple. No fancy tooling needed.

## Success Criteria

- App launches without errors
- No crashes on basic workflows
- UI looks premium (San Francisco font, no ripples, white backgrounds)
- Navigation works smoothly
- All features work as designed
- Code is obvious to a junior developer

## Anti-Patterns to Watch

❌ "Let me build this framework first, then the feature"
❌ "I'll add error handling for edge cases that can't happen"
❌ "I'll make this flexible for future requirements"
❌ Creating multiple layers of indirection between UI and data
❌ Collecting StateFlow inside deeply nested composables

**Principle**: If you can't explain it in 2 sentences, too complicated.

---

**Reference**: See `PROJECT_MVP.md` for full architecture, data models, and feature roadmap.
