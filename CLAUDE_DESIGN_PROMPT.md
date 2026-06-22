# Claude Design Prompt - Stash Anything Home Screen

## App Overview

**Stash Anything** is a vibrant, premium content-saving mobile app where users create themed collections called "stashes" and save content from anywhere into them. The app has a warm, inviting, playful-but-sophisticated premium feel—not minimalist, not Material Design defaults, but custom and intentional.

**Design Target**: Premium iOS-like Android experience with playful, vibrant visual language inspired by modern design systems like Nestie, Bezel, or Alto.

---

## Primary Brand Color & Palette

**Hero/Primary Color**: Red Roo Rust #C1703F
- Used for: CTAs, FAB, notifications, active states, accents
- Warm, earthy, premium feeling

**Supporting Palette**:
- Outback Terracotta #D85C36 (red earth tone, secondary CTA)
- Eucalyptus #2F6B5E (deep woodland green, secondary brand)
- Acacia Gold #E8A33D (wattle-flower gold, accent/highlight)
- Sage Mist #9BAA8C (muted plains green, secondary surfaces)
- White #FFFFFF (backgrounds, primary surfaces)
- Black #000000 (text, dark elements)

**Mood**: Warm, inviting, vibrant, premium but approachable. Use these colors intentionally throughout.

---

## Typography

- **Font Family**: San Francisco (or SF Pro Display if available)
- **Headers** (28-32sp, SemiBold): "Hello, User 👋"
- **Subheaders** (18sp, SemiBold): "Your Stashes" title
- **Secondary** (14sp, Regular): "3 Stashes" count, item count on cards
- **Body** (16sp, Regular): Main content
- Style: Clean, modern, friendly, warm tone (not playful-rounded, but approachable)

---

## Spacing & Sizing

- **Top Safe Area**: 40dp (notch + breathing room)
- **Section Gaps**: 28dp (between Hello User → Search → Stashes → Grid)
- **Side Padding**: 20dp left/right
- **Card Height**: 160dp
- **Border Radius**: 16dp (stash cards), 12dp (search bar)
- **Bell Icon Background**: 56dp circle
- **FAB Size**: 56dp rounded square
- **Bottom Offset**: 100dp from bottom (above nav bar)
- **Gap Between Cards in Grid**: 12dp

---

## Home Screen Layout & Design

### Header Section
- **"Hello, User 👋"** (28sp, SemiBold, black text)
  - Warm greeting, friendly tone
  - Left-aligned, ample space
- **Notification Bell Icon**
  - 56dp circle background (light gray #F0F0F0)
  - Rust-colored border (2dp stroke, #C1703F)
  - Bell icon inside (rust colored, 24dp)
  - Right-aligned, balanced with text
  - Optional: Small red dot or count badge if notifications exist

### Search Bar Section
- **Full-width search input** (56dp height, rounded 12dp)
- **Background**: Light gray (#F5F5F5) or white with rust border on focus
- **Magnifying glass icon** (rust colored, 24dp, left side)
- **Placeholder text**: "Search stashes or items" (gray #999999)
- **Interaction**: Tap navigates to Search screen
- **Visual**: Clean, prominent, inviting

### Collections Section
- **"Your Stashes" title** (18sp, SemiBold, black)
- **Count display** (14sp, regular, gray #999999)
  - Right-aligned "3 Stashes" or similar
  - Show total number of user's stashes
- **Spacing**: 28dp gap above and below

### 3-Column Stash Grid
- **Grid Layout**: 3 equal columns with 12dp gaps between cards
- **Card Design** (Each card is 160dp height, rounded 16dp):
  - **Background Color**: User-selected from palette (rust, terracotta, eucalyptus, gold, sage, or custom)
  - **Stash Name**: 18sp, SemiBold, white text, positioned bottom-left area
  - **Item Count**: 14sp, regular, white text with 70% opacity, just below name (e.g., "12 items")
  - **Corners**: Rounded 16dp, no sharp edges
  - **Shadows**: Subtle elevation (2-4dp shadow)
  - **Interaction**: Tap to navigate to stash detail screen
  - **Visual Polish**: Cards feel premium, vibrant, intentional

### Create Stash FAB
- **Position**: Bottom-right corner, 100dp from bottom
- **Size**: 56dp rounded square (or 56dp circle, designer's choice)
- **Background Color**: Red Roo Rust #C1703F
- **Icon**: White plus sign (+), 24dp
- **Interaction**: Tap to open create stash dialog
- **Visual**: Clean, prominent, clear CTA

### Background & Overall
- **Screen Background**: White #FFFFFF
- **Overall Feel**: Clean, spacious, premium
- **No clutter**: Let the stash cards be the hero
- **Breathing room**: Generous spacing throughout

---

## Visual Style Direction

**Mood**: Playful but sophisticated. Premium but approachable. Vibrant but cohesive.

**Key Characteristics**:
1. **Vibrant Color Palette** - Not monochrome, not minimalist. Each stash can be different color from palette.
2. **Generous Spacing** - 40dp top, 28dp gaps, 20dp sides. Premium breathing room.
3. **Rounded Corners** - 16-20dp everywhere. Friendly, modern, premium feel.
4. **No Material Design Defaults** - Custom UI, no ripples, no standard Android look.
5. **Warm & Inviting** - Rust, gold, green tones. Not cold, not clinical.
6. **Simple but Intentional** - Only essential elements. No clutter. Every pixel has purpose.

---

## Specific Requirements

✅ **Must Include**:
- "Hello, User 👋" greeting with emoji
- Notification bell in circle with rust border
- Search bar with magnifying glass
- "Your Stashes" title with count
- 3-column grid of stash cards
- Stash cards with vibrant colors from palette
- FAB for create stash
- White background throughout
- San Francisco font
- Red Roo Rust as primary accent color

❌ **Must NOT Include**:
- Delete buttons on cards
- Material Design ripple effects
- Rounded pill-shaped FAB (use square/rounded square)
- Stock Android UI patterns
- Extra features like "Recently Saved" section
- Micro-animations or complex interactions
- Gradient overlays or visual clutter
- Dark theme (light mode only)

---

## Color Usage Strategy

- **Rust (#C1703F)**: Bell border, search bar accent (on focus), FAB, active states
- **Gold (#E8A33D)**: Optional accent on "Stashes" title or count label
- **White (#FFFFFF)**: Primary background, card text
- **Gray (#F5F5F5 or #F0F0F0)**: Neutral surfaces (search bar background, bell circle)
- **Stash Card Colors**: Show variety using rust, terracotta, eucalyptus, gold, sage
  - Example stashes might be: "Rust" stash, "Eucalyptus" stash, "Gold" stash, etc.

---

## Deliverables

Please generate:

1. **High-fidelity mockup** of the home screen showing:
   - Header with greeting + notification bell
   - Search bar
   - "Your Stashes" section with 3-column grid
   - Example stash cards with different colors from palette
   - FAB button positioned bottom-right
   - Full screen layout (1080 x 2400 resolution, modern phone aspect ratio)

2. **Variations** (optional):
   - Empty state (no stashes yet, with placeholder)
   - With different numbers of stashes (3, 6, 9 to show grid behavior)

3. **Design should feel**:
   - Premium and polished
   - Vibrant and warm
   - Clean and organized
   - Inviting and friendly
   - Custom (not like default Android)

---

## Reference

This prompt is based on the complete Stash Anything MVP specification (PROJECT_MVP.md) provided separately. The app is a content-saving platform with a vibrant, premium aesthetic. The home screen is the primary entry point showcasing user stash collections.

**Inspiration**: Playful-colorful design systems like Nestie, Bezel, Alto, or premium Dribbble designs with warm color palettes and generous spacing.
There are also premium IOS app mockups attached from Dribbble.
---

## Design System Summary (for reference)

- **Primary Brand Color**: Red Roo Rust #C1703F
- **Font**: San Francisco
- **Spacing**: 40dp top, 28dp gaps, 20dp sides
- **Border Radius**: 16-20dp
- **Feel**: Vibrant, premium, warm, playful-but-sophisticated
- **Platform**: iOS-like Android, light mode only
- **Resolution**: 1080 x 2400 (modern phone)

---

**Ready to design!** Use the PROJECT_MVP.md file for complete context and this prompt for specific home screen direction.
