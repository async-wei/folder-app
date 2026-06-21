# Stash Anything - Complete Design Analysis

## 1. ACTUAL APP STRUCTURE (Stash Anything iOS)

### Navigation
- **Bottom Navigation Bar** (4 tabs):
  - Home (grid icon) - main stash browsing
  - Unstashed (bag icon) - inbox for unsorted items
  - Search (magnifying glass) - search all items
  - Settings (gear) - settings & preferences

### Home Screen
- Header: "My Stash" + "Your home for everything worth keeping"
- Top actions: Filter icon + Red "+" button
- What's New section (collapsible cards with feature announcements)
- Stash as you go section (suggested quick stash categories)
- Stashes section with grid of stash cards + Add button

### Stash Creation Dialog
- Title: "New Stash"
- Emoji picker (e.g., Pizza 🍕) with "Tap to change"
- Text input: "Name your stash..."
- Color palette: 9 colors (Red, Blue, Light Blue, Green, Yellow, Pink, Black, Orange, White outline)
- Quick templates: "Or pick a popular one"
  - Watch Later (purple)
  - TV & Film (light blue)
  - Inspo (gray)
  - Ideas (yellow)
  - Wishlist (pink)
  - Learn (gray)
  - Places (tan)
  - Funny (pink)

### Unstashed Tab
- Title: "Unstashed" + "Import" link
- Empty state: Cute mascot character
- Text: "Nothing here yet. Share from any app and it'll land right here. Already have screenshots? Import them from Photos."
- Button: "Import from Photos"

### Settings Tab
- Subscription info (e.g., "Founder pricing ends in 10 days")
- Stats: Saves (0/100), Stashes (0/10)
- Restore Purchases
- Manage Stashes
- Discover Stashes
- Notifications settings
- Tips & Tricks section

## 2. DRIBBBLE DESIGN TEMPLATES ANALYSIS

### Color Palette
- **Primary Colors**: Coral/Red (#FF6B6B or similar), Mint Green (#00D4AA or #49cbeb)
- **Accents**: Pink, Light Blue, Turquoise
- **Background**: Light/White with subtle gradients
- **Dark elements**: Dark Gray/Black for text and important elements

### Design Patterns
- **Rounded Corners**: 20-24 dp radius on all cards and buttons
- **Card-based layout**: Everything in rounded cards with shadows
- **Large buttons**: Primary buttons take up space, text-centered
- **Emoji usage**: Playful emoji and illustrations for visual interest
- **White space**: Generous padding between elements
- **Typography**: Bold, modern fonts for headers, clean sans-serif for body

### Key Features
- Bottom navigation bar with icons
- Feature cards with large, tappable areas
- Gradient backgrounds on featured sections
- Icon-based actions (Home, Search, Settings, Profile)
- Clean, minimal aesthetic
- Playful, approachable design

## 3. IMPLEMENTATION PLAN

### Phase 1: Bottom Navigation & Tab Structure
- Replace top navigation with bottom navigation bar (4 tabs)
- Create navigation routes: home, unstashed, search, settings
- Implement bottom nav bar composable with proper styling

### Phase 2: Home Screen Redesign
- "My Stash" header with tagline
- Top action bar (filter, add)
- What's New section (collapsible announcement cards)
- Stash as you go section (suggested categories)
- Stashes grid with proper styling
- Add button to create stash

### Phase 3: Stash Creation Dialog Redesign
- Emoji picker
- Color palette (9 colors)
- Quick stash templates
- Proper styling and animations

### Phase 4: Unstashed Tab
- Empty state with mascot
- Item list when populated
- Import from Photos button (UI only for now)

### Phase 5: Search Tab
- Search bar
- Results list
- Filters

### Phase 6: Settings Tab
- Subscription/stats
- Notification settings
- About/Help sections

### Phase 7: Visual Polish
- Better spacing and padding
- Rounded corners throughout
- Card shadows and depth
- Color scheme refinement
- Animation and transitions

## 4. COLOR SCHEME (for Stash Anything)
- **Primary**: Coral Red (#FF6B6B)
- **Secondary/Accent**: Mint Green (#00D4AA)
- **Light Background**: #F8F8F8 or #FAFAFA
- **Card Background**: White (#FFFFFF)
- **Text**: Dark Gray (#333333) or Black
- **Stash colors**: 9 distinct colors for user selection
