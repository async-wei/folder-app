import { COLORS } from "./theme";
import type { Stash, UnstashedItem } from "./store";

// Default stashes seeded on first launch (matches the mockup grid).
export const seedStashes: Stash[] = [
  { id: "1", name: "Travel Dreams", count: 24, color: COLORS.eucalyptus },
  { id: "2", name: "Recipes", count: 12, color: COLORS.terracotta },
  { id: "3", name: "Reading List", count: 38, color: COLORS.gold },
  { id: "4", name: "Inspo", count: 7, color: COLORS.indigo },
  { id: "5", name: "Work Stuff", count: 15, color: COLORS.sage },
  { id: "6", name: "Gift Ideas", count: 9, color: COLORS.rust },
  { id: "7", name: "Fitness", count: 21, color: COLORS.mauve },
  { id: "8", name: "Home Decor", count: 44, color: COLORS.slate },
  { id: "9", name: "Music", count: 6, color: COLORS.terracotta },
];

// Sample inbox items awaiting sorting (would arrive via Share/Import later).
export const seedUnstashed: UnstashedItem[] = [
  { id: "u1", label: "Uluru Sunrise", source: "Photos", bg: ["#c9855a", "#a85830"] },
  { id: "u2", label: "Forest Walk", source: "Instagram", bg: ["#3D8B7A", "#1e5248"] },
  { id: "u3", label: "Recipe Idea", source: "Safari", bg: ["#d9a84e", "#b07a20"] },
  { id: "u4", label: "Screenshot", source: "Chrome", bg: ["#7A8FBA", "#4a5f90"] },
];

// Collab collections are sample/static for this build (sharing is a later phase).
export type Member = { initials: string; bg: string };
export type Collab = {
  id: string;
  name: string;
  count: number;
  color: string;
  members: Member[];
};

export const collabs: Collab[] = [
  {
    id: "1",
    name: "Italy Trip",
    count: 18,
    color: COLORS.eucalyptus,
    members: [
      { initials: "JL", bg: "#E8734A" },
      { initials: "MK", bg: "#4A7BE8" },
      { initials: "SR", bg: "#C45AB5" },
      { initials: "TN", bg: "#4AAE8F" },
    ],
  },
  {
    id: "2",
    name: "Dinner Ideas",
    count: 9,
    color: COLORS.terracotta,
    members: [
      { initials: "RA", bg: "#5B6FA6" },
      { initials: "PW", bg: "#E8A33D" },
    ],
  },
  {
    id: "3",
    name: "Inspo Board",
    count: 31,
    color: COLORS.indigo,
    members: [
      { initials: "EL", bg: "#D85C36" },
      { initials: "DK", bg: "#9BAA8C" },
      { initials: "BO", bg: "#E87A4A" },
    ],
  },
  {
    id: "4",
    name: "Gift List",
    count: 5,
    color: COLORS.gold,
    members: [{ initials: "NM", bg: "#4A6B7A" }],
  },
  {
    id: "5",
    name: "Film Club",
    count: 22,
    color: COLORS.mauve,
    members: [
      { initials: "XY", bg: "#C1703F" },
      { initials: "ZA", bg: "#2F6B5E" },
      { initials: "QR", bg: "#5B6FA6" },
      { initials: "LB", bg: "#D85C36" },
      { initials: "CM", bg: "#E8A33D" },
    ],
  },
  {
    id: "6",
    name: "Road Trip",
    count: 14,
    color: COLORS.rust,
    members: [
      { initials: "KL", bg: "#4A7BE8" },
      { initials: "MN", bg: "#8B5E8B" },
    ],
  },
];
