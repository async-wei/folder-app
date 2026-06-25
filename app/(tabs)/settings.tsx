import {
  ArrowLeftRight,
  Bell,
  BookOpen,
  Camera,
  ChevronRight,
  Cloud,
  Download,
  EyeOff,
  Globe,
  GripVertical,
  Image as ImageIcon,
  LayoutGrid,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Monitor,
  Moon,
  RotateCcw,
  Search,
  Share2,
  Shield,
  Star,
  Sun,
  Trash2,
  Trophy,
  Users,
  Zap,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "../../src/components/Text";
import {
  InsetSep,
  ProgressBar,
  SectionNote,
  SegmentedControl,
  SettingsGroup,
  SettingsRow,
  ToggleRow,
} from "../../src/components/settings";
import { COLORS, UI, tabBarClearance } from "../../src/theme";

const TIPS: { icon: React.ReactNode; bg: string; label: string; sub: string }[] = [
  { icon: <GripVertical size={14} color="#FFFFFF" />, bg: COLORS.indigo, label: "Hold any stash to manage it", sub: "Long-press to start live sharing, send a snapshot, lock it, hide it, or delete it." },
  { icon: <ArrowLeftRight size={14} color="#FFFFFF" />, bg: COLORS.eucalyptus, label: "Drag stashes to reorder", sub: "Hold and drag any stash tile to rearrange your Home screen." },
  { icon: <ArrowLeftRight size={14} color="#FFFFFF" />, bg: COLORS.terracotta, label: "Swipe to sort or delete", sub: "In Unstashed, swipe right to sort into a stash, left to delete." },
  { icon: <Share2 size={14} color="#FFFFFF" />, bg: COLORS.rust, label: "Pin Stash to Share Sheet", sub: "Make Stash the first option when you tap Share in any app." },
  { icon: <Zap size={14} color="#FFFFFF" />, bg: COLORS.gold, label: "Set up shortcut", sub: "Build a screenshot shortcut, then assign Action Button or Back Tap." },
  { icon: <Users size={14} color="#FFFFFF" />, bg: COLORS.sage, label: "Start live shared stashes", sub: "Long-press a stash → tap Start Live Sharing." },
  { icon: <EyeOff size={14} color="#FFFFFF" />, bg: "#8E8E93", label: "Hide stashes for privacy", sub: "Long-press a stash and tap Hide Stash. Pro feature." },
  { icon: <Lock size={14} color="#FFFFFF" />, bg: COLORS.mauve, label: "Lock stashes with Face ID", sub: "Long-press a stash and tap Lock. Pro feature." },
];

const Pill = ({ text, bg }: { text: string; bg: string }) => (
  <View style={{ backgroundColor: bg, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1 }}>
    <AppText size={9} weight="bold" color="#FFFFFF">
      {text}
    </AppText>
  </View>
);

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [badge, setBadge] = useState(false);
  const [smartDate, setSmartDate] = useState(true);
  const [weeklyReminder, setWeeklyReminder] = useState(true);
  const [deleteOriginals, setDeleteOriginals] = useState(true);
  const [pauseSync, setPauseSync] = useState(false);
  const [appearance, setAppearance] = useState("Auto");
  const [textSize, setTextSize] = useState("Standard");

  return (
    <View style={{ flex: 1, backgroundColor: UI.settingsBg }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: insets.top + 8, paddingBottom: tabBarClearance(insets.bottom) }}
        showsVerticalScrollIndicator={false}
      >
        <AppText size={28} weight="semibold" style={{ marginBottom: 16 }}>
          Settings
        </AppText>

        {/* Hero card */}
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: 14, marginBottom: 8 }}>
          <AppText size={15} weight="bold" style={{ marginBottom: 4 }}>
            Your Stash Anything
          </AppText>
          <AppText size={12} color={UI.textSecondary} style={{ lineHeight: 17, marginBottom: 12 }}>
            Keep your best finds together and make Stash Anything more useful by bringing a friend in.
          </AppText>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: UI.settingsBg, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Trophy size={14} color={COLORS.gold} />
              <AppText size={12} weight="semibold">
                1 of 5 setup milestones
              </AppText>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: i === 1 ? COLORS.rust : "#D1D1D6" }} />
              ))}
              <ChevronRight size={12} color={UI.chevron} style={{ marginLeft: 2 }} />
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFF8F0", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10, borderWidth: 1, borderColor: "rgba(235,157,75,0.13)" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <MapPin size={14} color={COLORS.rust} />
              <View>
                <AppText size={12} weight="semibold">
                  Pinned
                </AppText>
                <AppText size={10} color={UI.textSecondary}>
                  4 left — tap to view
                </AppText>
              </View>
            </View>
            <ChevronRight size={12} color={UI.chevron} />
          </View>

          <Pressable style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: COLORS.rust, borderRadius: 10, padding: 10 }}>
            <Share2 size={14} color="#FFFFFF" />
            <AppText size={13} weight="semibold" color="#FFFFFF">
              Share Stash Anything with a Friend
            </AppText>
          </Pressable>

          <AppText size={11} color={UI.textSecondary} style={{ marginTop: 8, lineHeight: 15 }}>
            Stash grows when people share stashes with people they know.
          </AppText>

          <View style={{ flexDirection: "row", gap: 4, marginTop: 8 }}>
            {["Stashed", "Unstashed"].map((label) => (
              <View key={label} style={{ flex: 1, backgroundColor: UI.settingsBg, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, alignItems: "center" }}>
                <AppText size={16} weight="bold">
                  0
                </AppText>
                <AppText size={10} color={UI.textSecondary}>
                  {label}
                </AppText>
              </View>
            ))}
          </View>
        </View>

        {/* Pro */}
        <SettingsGroup>
          <Pressable style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingVertical: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
              <View style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: COLORS.gold, alignItems: "center", justifyContent: "center" }}>
                <Star size={14} color="#FFFFFF" fill="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <AppText size={13} weight="semibold">
                  Upgrade to Stash Anything Pro
                </AppText>
                <View style={{ flexDirection: "row", marginTop: 2 }}>
                  <Pill text="Founder pricing ends in 10 days" bg={COLORS.rust} />
                </View>
              </View>
            </View>
            <ChevronRight size={14} color={UI.chevron} />
          </Pressable>
          <InsetSep left={54} />
          <View style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <AppText size={12} weight="medium">
                Saves
              </AppText>
              <AppText size={12} color={UI.textSecondary}>
                0 / 100 free
              </AppText>
            </View>
            <ProgressBar value={0} max={100} />
          </View>
          <InsetSep left={14} />
          <View style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <AppText size={12} weight="medium">
                Stashes
              </AppText>
              <AppText size={12} color={UI.textSecondary}>
                0 / 10 free
              </AppText>
            </View>
            <ProgressBar value={0} max={10} />
          </View>
          <InsetSep left={14} />
          <View style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
            <AppText size={12} weight="medium" color={COLORS.rust}>
              Restore Purchases
            </AppText>
            <AppText size={11} color={UI.textSecondary} style={{ marginTop: 2, lineHeight: 15 }}>
              Use this if your Pro/Lifetime unlock didn't appear on this device.
            </AppText>
          </View>
        </SettingsGroup>

        {/* Manage */}
        <SettingsGroup>
          <SettingsRow icon={<LayoutGrid size={14} color={COLORS.rust} />} label="Manage Stashes" iconBg="#FFF0E8" />
          <SettingsRow icon={<Search size={14} color={COLORS.eucalyptus} />} label="Discover Stashes" sublabel="19 available" iconBg="#E8F4F2" noBorder />
        </SettingsGroup>

        {/* Setup */}
        <SectionNote text="Set these up once for the fastest saving. Share sheet is required; shortcuts are a powerful optional add-on." />
        <SettingsGroup label="Setup">
          <SettingsRow
            icon={<BookOpen size={14} color={COLORS.indigo} />}
            label="How to use Stash"
            sublabel="Share anything → pick Stash → choose a stash"
            iconBg="#EEF0F8"
            right={
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Pill text="Required" bg={COLORS.rust} />
                <ChevronRight size={14} color={UI.chevron} />
              </View>
            }
          />
          <SettingsRow
            icon={<Zap size={14} color={COLORS.gold} />}
            label="Set up shortcut"
            sublabel="Screenshot shortcut → Action Button or Back Tap"
            iconBg="#FDF5E6"
            right={
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Pill text="Recommended" bg={COLORS.sage} />
                <ChevronRight size={14} color={UI.chevron} />
              </View>
            }
          />
          <SettingsRow icon={<RotateCcw size={14} color="#8E8E93" />} label="Replay Onboarding" sublabel="Walk through the Stash intro again" noBorder />
        </SettingsGroup>

        {/* Import */}
        <SettingsGroup label="Import Screenshots & Photos">
          <SettingsRow
            icon={<ImageIcon size={14} color={COLORS.eucalyptus} />}
            label="Import from Photos"
            sublabel="Pull in existing screenshots and camera roll photos in bulk."
            iconBg="#E8F4F2"
          />
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 11, gap: 12, backgroundColor: "#FFFFFF" }}>
              <View style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: "#FEE8E6", alignItems: "center", justifyContent: "center" }}>
                <Camera size={14} color={UI.danger} />
              </View>
              <View style={{ flex: 1 }}>
                <AppText size={13} weight="medium">
                  Photos Access
                </AppText>
                <AppText size={11} color={UI.danger} style={{ marginTop: 2 }}>
                  Access denied
                </AppText>
              </View>
              <AppText size={12} weight="medium" color={COLORS.rust}>
                Open Settings
              </AppText>
            </View>
            <InsetSep left={54} />
          </View>
          <ToggleRow
            icon={<ImageIcon size={14} color="#8E8E93" />}
            label="Offer to delete originals after import"
            sublabel="Stash never deletes from Photos without your confirmation."
            on={deleteOriginals}
            onToggle={() => setDeleteOriginals((v) => !v)}
            noBorder
          />
        </SettingsGroup>
        <SectionNote text="Stash copies photos to this device instantly — they're available offline right away. Originals stay in Photos until you choose to delete them." />

        {/* Notifications */}
        <SettingsGroup label="Notifications">
          <ToggleRow icon={<Bell size={14} color="#FFFFFF" />} iconBg={COLORS.rust} label="Badge for Unstashed items" sublabel="Show the current Unstashed count on the app icon." on={badge} onToggle={() => setBadge((v) => !v)} />
          <ToggleRow icon={<Sun size={14} color="#FFFFFF" />} iconBg={COLORS.gold} label="Smart date suggestions" sublabel={'When a screenshot mentions an upcoming date, Stash offers a "Remind me?" suggestion.'} on={smartDate} onToggle={() => setSmartDate((v) => !v)} />
          <ToggleRow icon={<Bell size={14} color="#FFFFFF" />} iconBg={COLORS.indigo} label="Unstashed weekly reminder" sublabel="If you've been away for a week and items are piling up, send one gentle nudge." on={weeklyReminder} onToggle={() => setWeeklyReminder((v) => !v)} />
          <SettingsRow icon={<Bell size={14} color="#FFFFFF" />} iconBg={COLORS.rust} label="Notification Settings" sublabel="Manage Stash's notification permissions in Settings." noBorder />
        </SettingsGroup>

        {/* Tips & Tricks */}
        <SettingsGroup label="Tips & Tricks">
          {TIPS.map((item, i) => (
            <SettingsRow key={i} icon={item.icon} iconBg={item.bg} label={item.label} sublabel={item.sub} noBorder={i === TIPS.length - 1} />
          ))}
        </SettingsGroup>

        {/* Appearance */}
        <SettingsGroup label="Appearance">
          <View style={{ paddingHorizontal: 14, paddingVertical: 11, backgroundColor: "#FFFFFF" }}>
            <SegmentedControl options={["Auto", "Light", "Dark"]} value={appearance} onChange={setAppearance} />
          </View>
          <InsetSep left={14} />
          <View style={{ paddingHorizontal: 14, paddingVertical: 11, backgroundColor: "#FFFFFF" }}>
            <AppText size={12} weight="medium" style={{ marginBottom: 8 }}>
              Home Text Size
            </AppText>
            <SegmentedControl options={["Standard", "Large", "X-Large"]} value={textSize} onChange={setTextSize} />
            <AppText size={11} color={UI.textSecondary} style={{ marginTop: 8, lineHeight: 15 }}>
              Makes stash names and save counts easier to read on the Home screen. Saved on this device only.
            </AppText>
          </View>
        </SettingsGroup>

        {/* Spread the Love */}
        <SettingsGroup label="Spread the Love">
          <SettingsRow icon={<Share2 size={14} color="#FFFFFF" />} iconBg={COLORS.rust} label="Share Stash Anything" sublabel="Invite a friend and help Stash Anything grow." />
          <SettingsRow icon={<Star size={14} color="#FFFFFF" fill="#FFFFFF" />} iconBg={COLORS.gold} label="Rate Stash Anything ★★★★★" sublabel="Enjoying Stash Anything? A quick App Store review helps a lot." />
          <SettingsRow icon={<Monitor size={14} color="#FFFFFF" />} iconBg={COLORS.indigo} label="Get Pro free — post about Stash Anything" sublabel="Earn a lifetime Pro code for every 10,000 views on a reel about Stash Anything." />
          <SettingsRow icon={<Users size={14} color="#FFFFFF" />} iconBg={COLORS.eucalyptus} label="Become a Stash Ambassador" sublabel="Love Stash Anything? Partner with us and spread the word." noBorder />
        </SettingsGroup>

        {/* iCloud Sync */}
        <SettingsGroup label="iCloud Sync">
          <View style={{ paddingHorizontal: 14, paddingVertical: 11, backgroundColor: "#FFFFFF" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <AppText size={16}>🐷</AppText>
              <AppText size={13} weight="semibold">
                Synced [iCloud]
              </AppText>
              <AppText size={11} weight="semibold" color={UI.success} style={{ marginLeft: "auto" }}>
                Everything's synced!
              </AppText>
            </View>
            <AppText size={11} color={UI.textSecondary} style={{ lineHeight: 15 }}>
              Library Mode is set to Local Only, so new saves stay on this device and do not upload to iCloud.
            </AppText>
          </View>
          <InsetSep left={14} />
          <View style={{ paddingHorizontal: 14, paddingVertical: 11, backgroundColor: "#FFFFFF" }}>
            <AppText size={13} weight="medium" style={{ marginBottom: 3 }}>
              Sync check — Sync is off by choice
            </AppText>
            <AppText size={11} color={UI.textSecondary} style={{ lineHeight: 15 }}>
              Library Mode is set to Local Only, so new saves stay on this device and do not upload to iCloud. To sync again, go to Settings → Library mode.
            </AppText>
          </View>
          <InsetSep left={14} />
          <View style={{ paddingHorizontal: 14, paddingVertical: 10, backgroundColor: "#FFFFFF" }}>
            <Pressable style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: COLORS.rust, borderRadius: 10, paddingVertical: 9 }}>
              <Cloud size={14} color="#FFFFFF" />
              <AppText size={13} weight="semibold" color="#FFFFFF">
                Sync now
              </AppText>
            </Pressable>
            <AppText size={11} color={UI.textSecondary} style={{ marginTop: 6, lineHeight: 15 }}>
              Uploads and downloads your saves between this device and iCloud.
            </AppText>
          </View>
          <InsetSep left={14} />
          <ToggleRow icon={<Moon size={14} color="#FFFFFF" />} iconBg={COLORS.slate} label="Pause background updates" sublabel="Temporarily stops link previews, thumbnails and cleanup from running. iCloud sync keeps working." on={pauseSync} onToggle={() => setPauseSync((v) => !v)} />
          <SettingsRow
            icon={<Monitor size={14} color="#FFFFFF" />}
            iconBg={COLORS.indigo}
            label="Library mode"
            sublabel="Saves stay on this device only. No iCloud sync."
            right={
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <AppText size={12} color={UI.textSecondary}>
                  Local Only
                </AppText>
                <ChevronRight size={14} color={UI.chevron} />
              </View>
            }
          />
          <SettingsRow icon={<Search size={14} color="#FFFFFF" />} iconBg="#8E8E93" label="More sync help" sublabel="Status, fixes, and a report for support." noBorder />
        </SettingsGroup>

        {/* Backup & Export */}
        <SettingsGroup label="Backup & Export">
          <SettingsRow icon={<Download size={14} color="#FFFFFF" />} iconBg={COLORS.eucalyptus} label="Export Data (.md)" sublabel="Markdown text backup. Media stays in Stash; export references local paths." />
          <SettingsRow icon={<Trash2 size={14} color="#FFFFFF" />} iconBg={COLORS.terracotta} label="Recently Deleted" sublabel="Restore deleted items, or remove them for good. Items kept for 30 days." noBorder />
        </SettingsGroup>

        {/* About */}
        <AppText size={11} color={UI.textSecondary} style={{ textAlign: "center", paddingHorizontal: 4, paddingBottom: 8, lineHeight: 16 }}>
          No snooping · ☁ iCloud sync · No sign-up
        </AppText>
        <SettingsGroup label="About">
          <SettingsRow label="Version" right={<AppText size={12} color={UI.textSecondary}>17 (131)</AppText>} />
          <SettingsRow icon={<Globe size={14} color="#FFFFFF" />} iconBg={COLORS.indigo} label="Website" />
          <SettingsRow icon={<Mail size={14} color="#FFFFFF" />} iconBg={COLORS.eucalyptus} label="Support" />
          <SettingsRow icon={<MessageSquare size={14} color="#FFFFFF" />} iconBg={COLORS.rust} label="Send Feedback" />
          <SettingsRow icon={<Shield size={14} color="#FFFFFF" />} iconBg={COLORS.slate} label="Privacy Policy" noBorder />
        </SettingsGroup>
      </ScrollView>
    </View>
  );
}
