# Stash Anything - Vibrant Premium Mobile App

## Executive Summary

**Stash Anything** is a vibrant, premium content-saving mobile app for iOS-like Android experience. Users save content from anywhere into themed collections ("stashes"). The design is playful, colorful, and premium—inspired by modern design systems like Dribbble's top products. It feels custom, joyful, and intentional. Not minimalist. Not Material Design. Premium and vibrant.

**Design Inspiration**: Playful-colorful aesthetic like Nestie, Bezel, or Alto. Warm, inviting, premium-feeling.

---

## Visual Design System

### Color Palette

**Primary Brand Color (Hero/CTA)**
- **Red Roo Rust** #C1703F - Main brand color, used for CTAs, highlights, key UI elements
  - Warm, earthy, premium feeling
  - Used for: FAB, buttons, active states, key highlights
  - Conveys: Warmth, adventure, premium quality

**Secondary/Supporting Colors**
- **Outback Terracotta** #D85C36 - Red earth tone, alt CTA/strong accent
- **Eucalyptus** #2F6B5E - Deep woodland green, secondary brand color
- **Acacia Gold** #E8A33D - Wattle-flower gold, accent/highlight for badges, highlights
- **Sage Mist** #9BAA8C - Muted plains green, secondary surfaces, card backgrounds
- **White** #FFFFFF - Primary background, card backgrounds
- **Black** #000000 - Text, dark elements

### Typography

- **Font Family**: San Francisco (Apple's native font)
- **Style**: Clean, modern, friendly (not playful-rounded, but warm and approachable)
- **Sizes**:
  - **Headers** (28-32sp, SemiBold): Section titles, screen titles
  - **Subheaders** (20-22sp, SemiBold): Feature names, category labels
  - **Body** (16sp, Regular): Primary content text
  - **Secondary** (14sp, Regular): Secondary info, labels
  - **Labels** (12sp, SemiBold): Tags, badges, metadata
  - **Captions** (11sp, Regular): Descriptions, helper text

### Spacing & Sizing

- **Padding Standard**: 16-24dp (generous, not cramped)
- **Border Radius**: 16-20dp (rounded, premium feel)
- **Icon Size**: 24-28dp (clear, readable)
- **Card Height**: Variable (160-180dp for stash cards)
- **Gap Between Elements**: 12-16dp (consistent breathing room)
- **Safe Padding (edges)**: 20dp left/right
- **Top Safe Area**: 40dp (notch + breathing room)
- **Bottom Safe Area**: 100dp (above bottom nav)

### Visual Style

- **Background**: Warm white or very light cream undertones
- **Cards**: White with subtle shadows (elevation 2-4dp)
- **Shadows**: Soft, subtle (not bold)
- **Corners**: Rounded 16-20dp (friendly, premium)
- **Icons**: Outlined or filled, 24-28dp, vibrant rust/green tones
- **Illustrations**: Optional, friendly, warm palette
- **Mood**: Playful but sophisticated. Premium but approachable. Vibrant but cohesive.

---

## Core Features & Screens

### 1. Home Screen (Primary)

**Purpose**: Browse all stashes, quick access to recent items, create new stash.

**Layout**:
```
[Header Section]
├─ "Hello, User 👋" (28sp, SemiBold, Black)
├─ Notification bell icon (rust circle background, 56dp)
│
[Search Section]
├─ Search bar (rust accent, 48dp height, rounded 12dp)
│
[Collections Section]
├─ "Your Stashes" title + count
├─ 3-Column Grid of Stash Cards
│  └─ Each card: 160dp height, rounded 16dp
│     ├─ Stash color (primary background)
│     ├─ Stash name (18sp, SemiBold, white)
│     ├─ Item count (14sp, white, 70% opacity)
│     └─ Delete icon (temporary, top-right)
│
[FAB]
└─ Create Stash button (56dp, rust color, bottom-right, rounded)
```

**Design Notes**:
- Background: White
- Header spacing: 40dp top, 28dp gaps
- Stash cards use vibrant colors from user selection (rust, terracotta, eucalyptus, gold, sage)
- Smooth transitions between stashes
- 3-column grid optimized for modern screens

**Interactions**:
- Tap stash → Detail screen
- Tap search → Search screen
- Tap FAB → Create dialog
- (Future) Long-press stash → Drag to rearrange

---

### 2. Stash Detail Screen

**Purpose**: View all items in a stash, add items, manage stash.

**Layout**:
```
[Header]
├─ Back arrow (40dp from top, rust color)
├─ Stash name (24sp, SemiBold)
├─ Item count badge (rust, 28dp, rounded full)
│
[Filter/Sort Section]
├─ Filter chips (sort by date, name, favorite)
│
[Items Grid]
├─ 2-Column grid (or 3-column for dense view)
├─ Each item card: Variable height
│  ├─ Preview image/icon (dominant)
│  ├─ Title + description
│  ├─ Source badge (instagram, link, etc.)
│  ├─ Favorite heart (rust when favorited)
│  └─ Share icon
│
[FAB]
└─ Add item to stash (56dp, rust)
```

**Design Notes**:
- Background: White
- Header: Rust accents, prominent back button
- Item cards: Clean, image-forward, with metadata
- Favorite heart animates to rust on tap
- Source badges use secondary colors (gold for special, sage for regular)

---

### 3. Create Stash Dialog

**Purpose**: Collect stash name and select theme color.

**Layout**:
```
[Dialog Box - rounded 20dp]
├─ Title: "Create New Stash" (20sp, SemiBold, black)
├─
├─ Input Field
│  └─ "Stash name" placeholder (light rust border, 48dp)
├─
├─ Color Picker Grid
│  ├─ Title: "Choose Theme Color" (14sp, SemiBold)
│  └─ 5x2 grid of color circles (56dp each, rounded full)
│     ├─ Red Roo Rust (#C1703F)
│     ├─ Outback Terracotta (#D85C36)
│     ├─ Eucalyptus (#2F6B5E)
│     ├─ Acacia Gold (#E8A33D)
│     ├─ Sage Mist (#9BAA8C)
│     └─ Plus custom color option
│  └─ Selected color shows checkmark (white, 24dp)
├─
├─ Button Row
│  ├─ Cancel (light gray bg, black text, 44dp, rounded 10dp)
│  └─ Create (rust bg, white text, 44dp, rounded 10dp)
```

**Design Notes**:
- Dialog background: White
- Prominent color palette showcasing brand colors
- Input field has rust accent on focus
- Buttons are large, clear, accessible

---

### 4. Search Screen

**Purpose**: Global search across all items and stashes.

**Layout**:
```
[Header]
├─ Back arrow (rust, 40dp)
├─ Search input (rust accent, 56dp, rounded 16dp)
│  └─ Clear button (rust X icon)
│
[Filter Chips]
├─ Stash filter chips (horizontal scroll)
├─ Date range chips
├─ Source app chips (instagram, link, etc.)
│
[Results]
├─ If no query: "Recent searches" or empty state illustration
├─ If query entered:
│  ├─ Stash matches (if any)
│  │  └─ Stash cards, rounded, rust accent
│  ├─ Item matches (if any)
│  │  └─ Item preview cards, 2-column grid
│
[Empty State]
└─ Illustration + "No results" message (friendly, warm tones)
```

**Design Notes**:
- Background: White
- Search input prominent, rust-accented
- Filter chips: Light rust background, rust text
- Results: Same visual language as elsewhere

---

### 5. Unstashed/Recent Items Screen

**Purpose**: View items not assigned to a stash, or recent saves.

**Layout**:
```
[Header]
├─ Title: "Recent Items" or "Unstashed" (28sp, SemiBold)
│
[Quick Filter]
├─ Chips: "All", "Today", "This Week", "This Month"
├─ Stash chips (if filtering by stash)
│
[Items Grid]
├─ 2-Column grid of item preview cards
├─ Each card: Variable height
│  ├─ Image/preview (dominant)
│  ├─ Title + description
│  ├─ Date badge (sage background, 12sp)
│  ├─ Source badge (gold, 12sp)
│  ├─ Favorite heart (rust when active)
│  └─ Add to stash button (small, rust outline)
│
[Empty State]
└─ Illustration + "No items" message
```

**Design Notes**:
- Background: White
- Date badges: Sage Mist background, dark text
- Source badges: Acacia Gold background
- Cards have clean, minimal design

---

### 6. Settings Screen

**Purpose**: User preferences, theme, data management.

**Layout**:
```
[Header]
├─ Title: "Settings" (28sp, SemiBold)
│
[Preference Sections]
├─
├─ Section: Display
│  ├─ Theme toggle (Light/Dark) with rust toggle
│  ├─ Layout preference (2-column/3-column grid)
│  ├─ Font size adjuster
│
├─ Section: Data
│  ├─ Export stashes (button, rust outline)
│  ├─ Backup to cloud (button, rust)
│  ├─ Clear cache (button, terracotta)
│  ├─ Delete account (button, red alert)
│
├─ Section: About
│  ├─ App version
│  ├─ Privacy policy (link, rust)
│  ├─ Terms of service (link, rust)
│  ├─ Contact/Feedback (link, rust)
│
└─ Footer: "Made with ❤️ by [Team]"
```

**Design Notes**:
- Background: White
- Toggle switches: Rust when active
- Buttons use vibrant colors for hierarchy
- Destructive actions: Red/terracotta

---

### 7. Bottom Navigation

**Layout**:
```
┌─────────────────────────────────┐
│  [Home] [Unstashed] [Search] [Settings] │
│  ✓ (active tab)                  │
└─────────────────────────────────┘
```

**Design**:
- Height: 64dp
- Background: White
- Active tab: Light rust background (#E8D4C8), rust icon + text
- Inactive tabs: Gray icon (#999999) + text
- Icons: 24dp, rounded 12dp background
- Labels: 10sp, SemiBold
- No ripple effects—solid highlights only

---

## Data Model

### StashEntity
```
- id: Int (primary key)
- name: String (user-defined)
- color: String (hex, from palette or custom)
- description: String (optional)
- itemCount: Int (cached from SavedItem count)
- createdAt: Long (timestamp)
- updatedAt: Long (timestamp)
- sortOrder: Int (for drag-to-rearrange)
- isShared: Boolean (future)
- collaborators: String (JSON, future)
```

### SavedItemEntity
```
- id: Int (primary key)
- stashId: Int (foreign key)
- title: String
- description: String
- url: String (normalized)
- imageUrl: String (local cache)
- tags: String (CSV)
- sourceApp: String (instagram, twitter, safari, etc.)
- savedAt: Long (timestamp)
- isFavorite: Boolean
- isLocalOnly: Boolean (not synced)
- raw: String (raw metadata as JSON)
- sortOrder: Int (for custom sorting)
```

---

## Key Interactions & Micro-interactions

### Favorite Heart
- Tap heart → Animates to rust color (0.3s spring animation)
- Tap again → Animates back to gray

### Stash Tap
- Tap card → Smooth transition to Detail screen
- Visual feedback: Card elevation increases, slight scale

### Create Stash
- Tap FAB → Dialog slides up with spring animation
- Color picker: Tap color → Shows checkmark, animates selection
- Create button: Disabled if name is empty, tap creates stash + navigates

### Search
- Type in search → Real-time results (debounced 300ms)
- Clear button (X) appears → Clears search smoothly
- Filter chips: Tap to toggle, highlight changes to rust

### Notifications Bell
- Bell icon has circle background (56dp)
- Tap → Shows notification center (overlay or new screen)
- Badge number (red dot or count) if unread

### Delete (Temporary)
- Tap trash icon on stash card → Confirmation dialog
- Confirm → Card animates out, deleted from grid

---

## Animation & Motion

- **Transitions**: Smooth, 300-400ms
- **Scale**: Buttons scale to 0.95 on press
- **Opacity**: Inactive elements fade to 70%
- **Color Transitions**: 250ms when colors change
- **Screen Transitions**: Slide from right (new screens), slide to left (back)

---

## Accessibility & Responsiveness

- **Min Safe Area**: 20dp sides, 40dp top
- **Touch Targets**: Minimum 48dp x 48dp
- **Color Contrast**: WCAG AA (all text/bg combos)
- **Font Scaling**: Supports system font scaling (up to 200%)
- **Dark Mode**: Future support (invert colors, maintain rust as primary)
- **Responsiveness**: Designed for 360dp-480dp width (phones), scales for tablets

---

## Typography Hierarchy

```
28-32sp, SemiBold    → Screen titles ("Hello, User", "Your Stashes")
20-22sp, SemiBold    → Section titles, features
18sp, SemiBold       → Card titles, stash names
16sp, Regular        → Body text, descriptions
14sp, Regular        → Secondary text, helper text
12sp, SemiBold       → Labels, badges, tags
11sp, Regular        → Captions, metadata
```

---

## Premium Feel Checklist

✅ **Vibrant, intentional color palette** (not minimalist, not default)
✅ **Generous spacing & padding** (breathing room, premium quality)
✅ **Rounded corners everywhere** (16-20dp, friendly, premium)
✅ **Custom interactions** (no Material ripples, spring animations)
✅ **Warm, inviting visual language** (rust, gold, sage, green)
✅ **iOS-native font** (San Francisco)
✅ **Playful but sophisticated** (not cutesy, not cold)
✅ **Smooth, purposeful animations** (not gratuitous)
✅ **High-quality visual hierarchy** (clear, organized, intentional)
✅ **Custom UI components** (no default Material Design)

---

## Feature Roadmap

### MVP (Phase 1 - Now)
✅ Create stashes with color selection
✅ View stashes in 3-column grid
✅ Placeholder screens for tabs
✅ Premium visual design

### Phase 2 (Near-term)
- [ ] Share intent (save from other apps)
- [ ] Stash detail screen (view items in stash)
- [ ] Full search implementation
- [ ] Item favorites
- [ ] Stash sorting/filtering

### Phase 3 (Medium-term)
- [ ] Drag-to-rearrange stashes
- [ ] Cloud sync/backup
- [ ] Sharing stashes with friends
- [ ] Advanced filtering & sorting
- [ ] Item annotations (notes, tags)

### Phase 4 (Future)
- [ ] Dark mode
- [ ] Stash templates/suggestions
- [ ] Collaborative stashes
- [ ] AI-powered categorization
- [ ] Export/import tools

---

## Technical Stack

- **Language**: Kotlin
- **UI Framework**: Jetpack Compose
- **Database**: Room + SQLite
- **State Management**: StateFlow + coroutines
- **Architecture**: MVVM + Repository pattern
- **Min API**: 26 (Android 8.0)
- **Target API**: 34

---

## Success Metrics

- Build time < 60 seconds
- App launches in < 2 seconds
- All animations 60fps
- Premium, vibrant, intentional feel
- No crashes on typical workflows
- Accessible (WCAG AA)

---

## Design Files & References

- **Dribbble Inspiration**: imagreferencedribble folder
- **Color Hex Values**: Documented above
- **Typography**: San Francisco family, all weights available
- **Icon Set**: Material Icons Extended (customized)

---

**Last Updated**: 2026-06-21  
**Status**: Ready for Claude Design + Figma Make  
**Next**: Generate high-fidelity mockups from this spec

