// Brand palette — mirrors the Figma mockup (AppUIMockup/src/app/App.tsx)
export const COLORS = {
  rust: "#eb9d4b",
  terracotta: "#D85C36",
  eucalyptus: "#2F6B5E",
  gold: "#E8A33D",
  sage: "#9BAA8C",
  indigo: "#5B6FA6",
  mauve: "#8B5E8B",
  slate: "#4A6B7A",
};

// Neutral / UI colors used across screens
export const UI = {
  white: "#FFFFFF",
  black: "#000000",
  settingsBg: "#F2F2F7",
  field: "#F5F5F5",
  fieldAlt: "#F0F0F0",
  cancel: "#F0F0F0",
  textSecondary: "#8E8E93",
  textMuted: "#999999",
  placeholder: "#9CA3AF",
  hairline: "rgba(0,0,0,0.16)",
  activeTabPill: "#F2E4D8",
  inactiveTab: "#999999",
  tabInactive: "#1C1C1E",
  chevron: "#C7C7CC",
  danger: "#FF3B30",
  success: "#34C759",
};

// Font family names — must match the keys registered in app/_layout.tsx useFonts().
// Apple uses "Display" cuts at >= 20pt and "Text" cuts below; fontFamily() picks for us.
type Weight = "regular" | "medium" | "semibold" | "bold";
const WEIGHT_SUFFIX: Record<Weight, string> = {
  regular: "Regular",
  medium: "Medium",
  semibold: "Semibold",
  bold: "Bold",
};

export function fontFamily(size: number, weight: Weight): string {
  const variant = size >= 20 ? "Display" : "Text";
  return `SFPro${variant}-${WEIGHT_SUFFIX[weight]}`;
}

// Floating bottom tab bar geometry (overlay style).
export const TAB_BAR = { height: 62, marginH: 16, marginB: 10 };

// Bottom space a scrollable/blocking screen should reserve so its content can
// scroll clear of the floating tab bar (which overlays the bottom of the scene).
export function tabBarClearance(insetsBottom: number): number {
  return insetsBottom + TAB_BAR.marginB + TAB_BAR.height + 16;
}

// 3-column grid item size given screen width, horizontal page padding and gap.
export function gridItemSize(
  screenWidth: number,
  cols = 3,
  padH = 20,
  gap = 12,
): number {
  // Floor so sub-pixel rounding never pushes the last column past the row width
  // (otherwise flexWrap drops it to the next line).
  return Math.floor((screenWidth - padH * 2 - gap * (cols - 1)) / cols);
}
