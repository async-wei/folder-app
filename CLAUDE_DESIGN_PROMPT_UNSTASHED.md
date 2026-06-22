# Claude Design Prompt - Stash Anything Unstashed Tab

## Context

This is the second screen in the Stash Anything app—a vibrant, premium content-saving mobile app. For context on the full design system, refer to PROJECT_MVP.md. This prompt focuses specifically on the Unstashed tab (inbox for recent uncategorized items).

---

## Color Palette (Reference)

- **Primary**: Red Roo Rust #C1703F
- **Accents**: Eucalyptus #2F6B5E, Acacia Gold #E8A33D, Sage Mist #9BAA8C
- **Backgrounds**: White #FFFFFF
- **Text**: Black #000000, Gray #999999
- **Surfaces**: Light gray #F5F5F5, #F0F0F0

---

## Typography (Reference)

- **Font**: San Francisco
- **Headers** (28sp, SemiBold): "Unstashed" or "Recent Items"
- **Subtitle** (14sp, Regular): Count or status text
- **Card Text** (16sp, SemiBold): Item titles
- **Labels** (12sp, Regular): Badges, dates

---

## Spacing & Sizing

- **Top Safe Area**: 40dp
- **Side Padding**: 20dp left/right
- **Section Gaps**: 16dp (between header and content)
- **Grid Gaps**: 12dp (between cards)
- **Card Design**: Variable height (image-forward), rounded 12dp
- **Badge Size**: 28dp height, 12sp text
- **Icon Size**: 24dp (heart, close, etc.)

---

## Unstashed Tab Layout & Design

### Header Section
- **Title**: "Recent Items" or "Unstashed" (28sp, SemiBold, black)
- **Subtitle** (optional): "12 items waiting" or "3 new today" (14sp, gray #999999)
- **Spacing**: 16dp below header

### Filter Chips Section (Optional, minimal)
- **Horizontal scroll row** of filter chips
- **Options**: "All" | "Today" | "This Week" | "This Month"
- **Design**:
  - Unselected: Light gray background (#F5F5F5), gray text
  - Selected: Rust background (#C1703F), white text
  - Height: 32dp, rounded 16dp
  - Spacing: 8dp between chips
- **Note**: Keep simple, optional if feels cluttered

### 2-Column Item Grid
- **Grid Layout**: 2 equal columns, 12dp gap between cards
- **Card Design** (each card - variable height, typically 180-220dp):
  - **Preview Image Area** (dominant, ~60% of height):
    - Shows content thumbnail/preview (image, screenshot, etc.)
    - Rounded 12dp top corners
    - Subtle shadow (2dp)
  - **Content Overlay Area** (bottom 40%):
    - Dark semi-transparent background (dark gray, 80% opacity)
    - Rounded 12dp bottom corners
    - **Title**: Item title, 16sp, SemiBold, white text
    - **Description** (optional): 1-2 lines, 12sp, regular, white (60% opacity)
  - **Badges** (positioned bottom-left, overlaid on content):
    - **Date Badge**: Sage Mist background (#9BAA8C), 12sp, regular text, rounded 4dp
      - Text: "Today", "2 days ago", "1 week ago", etc.
    - **Source Badge**: Acacia Gold background (#E8A33D), 12sp, regular text, rounded 4dp
      - Text: "Instagram", "Link", "Safari", "Pinterest", etc.
  - **Favorite Heart** (positioned top-right):
    - 24dp icon, rust color when favorited, gray when not
    - Tappable
  - **Interaction**: Tap card → View item details + option to add to stash

### Empty State
- **Centered content**:
  - Simple illustration (friendly, warm colors)
  - Headline: "No items yet" (20sp, SemiBold)
  - Message: "Start saving from other apps to see items here" (14sp, regular, gray)
  - CTA Button (optional): "Learn how to save" (rust color, 12sp)

### Background & Overall
- **Screen Background**: White #FFFFFF
- **Feel**: Clean, minimal, image-focused
- **Content-First**: Let the item previews be the hero
- **No Clutter**: Only essential UI elements

---

## Visual Style

**Mood**: Simple, clean, content-focused. Image-forward. Premium but minimal.

**Key Characteristics**:
1. **Image-First**: Preview images are the dominant visual
2. **Minimal UI**: Only what's necessary to identify and organize items
3. **Color Hierarchy**: Rust for interactions, sage/gold for metadata, white backgrounds
4. **Clean Spacing**: 40dp top, 20dp sides, consistent gaps
5. **Soft Corners**: 12dp rounded corners on cards, friendly aesthetic
6. **Premium Feel**: Subtle shadows, clean typography, intentional spacing

---

## Specific Requirements

✅ **Must Include**:
- "Recent Items" or "Unstashed" title (28sp, SemiBold)
- Subtitle showing count or status
- 2-column grid of item cards
- Preview images on cards (dominant)
- Date badge (sage color #9BAA8C) on each card
- Source badge (gold color #E8A33D) on each card (Instagram, Link, Safari, etc.)
- Favorite heart icon (rust when favorited)
- Tap to open item or add to stash
- White background throughout
- San Francisco font
- 40dp top padding, 20dp side padding

❌ **Must NOT Include**:
- 3-column grid (use 2-column only)
- Material Design ripples
- Bulk selection checkboxes
- Delete buttons or trash icons
- Sorting controls or advanced filters
- Micro-animations or complex interactions
- Dark overlays or visual clutter
- Gradient overlays (keep content preview clean)

---

## Color Usage

- **Rust (#C1703F)**: Favorite heart (when active), "Add to Stash" button
- **Sage Mist (#9BAA8C)**: Date badge background
- **Acacia Gold (#E8A33D)**: Source badge background
- **Gray (#F5F5F5)**: Chip background (unselected), favorite heart (inactive)
- **White (#FFFFFF)**: Main background, card text
- **Black/Dark Gray**: Title text, image overlays

---

## Deliverables

Please generate:

1. **High-fidelity mockup** of the Unstashed tab showing:
   - Header with "Recent Items" title and count
   - Optional filter chips (or omit if feels cluttered)
   - 2-column grid with 4-6 example item cards
   - Cards showing:
     - Preview image (different content types)
     - Title and brief description overlay
     - Date badge (sage)
     - Source badge (gold) - various sources (Instagram, Link, Safari, etc.)
     - Favorite heart icon (some favorited, some not)
   - White background throughout
   - Full screen layout (1080 x 2400 resolution)

2. **Empty state variation** (optional):
   - "No items yet" message with friendly illustration
   - Helpful CTA text

3. **Design should feel**:
   - Clean and minimal (simpler than home screen)
   - Image-focused and content-first
   - Premium but approachable
   - Simple to use, no complexity
   - Cohesive with home screen design

---

## Design System Reference

- **Font**: San Francisco
- **Spacing**: 40dp top, 20dp sides, 12dp grid gaps
- **Border Radius**: 12dp (cards)
- **Color Scheme**: Red Roo Rust primary, sage/gold accents
- **Feel**: Clean, minimal, image-first, premium

---

## Note

This tab is intentionally simpler than the home screen. Focus on showing content clearly with minimal UI. Let the item previews do the work. Keep it focused and uncluttered.

Ready to design! 🎨
