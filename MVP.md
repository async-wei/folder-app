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