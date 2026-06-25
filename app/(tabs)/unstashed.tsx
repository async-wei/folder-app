import { ArrowDown, Image as ImageIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "../../src/components/Text";
import { CardStack } from "../../src/components/CardStack";
import { DevToggle } from "../../src/components/DevToggle";
import { KangarooPlaceholder } from "../../src/components/Kangaroo";
import { ModeToggle } from "../../src/components/ModeToggle";
import { StashFadeColumn, type StashColumnHandle } from "../../src/components/StashFadeColumn";
import { useStore } from "../../src/store";
import { COLORS, UI, tabBarClearance } from "../../src/theme";

const comingSoon = () =>
  Alert.alert("Import from Photos", "Photo & screenshot import is coming in a later update.");

// ── Tweak these to nudge each section vertically (negative = up) ──
const STASH_COLUMN_OFFSET_Y = -40; // moves ONLY the left stash column
const CARD_STACK_OFFSET_Y = -5; // moves ONLY the right card-stack group

function Header({ right }: { right: React.ReactNode }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <AppText size={28} weight="semibold" style={{ lineHeight: 34 }}>
        Unstashed
      </AppText>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {right}
        <Pressable
          onPress={comingSoon}
          style={{ flexDirection: "row", alignItems: "center", gap: 6, height: 36, paddingHorizontal: 16, borderRadius: 12, backgroundColor: COLORS.rust }}
        >
          <ArrowDown size={14} color="#FFFFFF" strokeWidth={2.5} />
          <AppText size={14} weight="semibold" color="#FFFFFF">
            Import
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

export default function UnstashedScreen() {
  const insets = useSafeAreaInsets();
  const { unstashed, stashes, sortItem, seedInbox, clearInbox } = useStore();
  const [mode, setMode] = useState<"tap" | "drag">("tap");
  const columnRef = useRef<StashColumnHandle>(null);

  const topItem = unstashed[0];
  const empty = !topItem;

  // ── Empty state ──
  if (empty) {
    const dev = <DevToggle isEmpty onPress={seedInbox} />;
    return (
      <View style={{ flex: 1, backgroundColor: UI.white, paddingHorizontal: 20, paddingTop: insets.top + 12 }}>
        <Header right={dev} />
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ marginTop: 100 }}>
            <KangarooPlaceholder />
          </View>
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <AppText size={20} weight="semibold" style={{ marginBottom: 8 }}>
              Nothing Here Yet
            </AppText>
            <AppText size={14} color={UI.textMuted} style={{ textAlign: "center", width: 270, lineHeight: 20, marginBottom: 20 }}>
              Share from any app and it'll land right here. Already have screenshots? Import them from Photos.
            </AppText>
            <Pressable
              onPress={comingSoon}
              style={{ flexDirection: "row", alignItems: "center", gap: 8, height: 50, paddingHorizontal: 20, borderRadius: 16, backgroundColor: COLORS.rust, shadowColor: COLORS.rust, shadowOpacity: 0.4, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 6 }}
            >
              <ImageIcon size={18} color="#FFFFFF" strokeWidth={2} />
              <AppText size={15} weight="semibold" color="#FFFFFF">
                Import from Photos
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  // ── Sort view ──
  // TEMP (testing): double the stashes so the scroll/fade is easy to evaluate.
  const sortStashes = [
    ...stashes,
    ...stashes.map((s) => ({ ...s, id: `${s.id}-x`, name: `${s.name} ·` })),
  ];

  const handleSort = (stashId: string) => sortItem(topItem.id, stashId.replace(/-x$/, ""));
  // Drag handlers delegate to the column; highlight lives inside the column so
  // dragging never re-renders this screen (keeps it smooth).
  const dragStart = () => columnRef.current?.prepare();
  const dragMove = (x: number, y: number) => columnRef.current?.hover(x, y);
  const dragResolve = (x: number, y: number) => columnRef.current?.drop(x, y) ?? null;

  const headerRight = (
    <>
      <ModeToggle mode={mode} onPress={() => setMode((m) => (m === "tap" ? "drag" : "tap"))} />
      <DevToggle isEmpty={false} onPress={clearInbox} />
    </>
  );

  // No horizontal padding on the root so the fade column is full-bleed.
  return (
    <View style={{ flex: 1, backgroundColor: UI.white, paddingTop: insets.top + 12 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Header right={headerRight} />
      </View>
      <View style={{ flex: 1, flexDirection: "row", gap: 12, alignItems: "stretch", paddingRight: 20, overflow: "visible" }}>
        {/* Left: full-bleed fade column.
            STASH_COLUMN_OFFSET_Y (top of file) moves ONLY this column up/down. */}
        <StashFadeColumn
          ref={columnRef}
          stashes={sortStashes}
          onSort={handleSort}
          tapToSort={mode === "tap"}
          offsetY={STASH_COLUMN_OFFSET_Y}
        />

        {/* Right: card stack — padded so it stays centered above the floating bar.
            CARD_STACK_OFFSET_Y (top of file) moves ONLY this group up/down. */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
            paddingBottom: tabBarClearance(insets.bottom),
            transform: [{ translateY: CARD_STACK_OFFSET_Y }],
          }}
        >
          <View style={{ backgroundColor: COLORS.rust, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 2, marginBottom: 12 }}>
            <AppText size={11} weight="semibold" color="#FFFFFF">
              {unstashed.length} to sort
            </AppText>
          </View>

          <CardStack
            items={unstashed}
            mode={mode}
            onSort={handleSort}
            dragStart={dragStart}
            dragMove={dragMove}
            dragResolve={dragResolve}
          />

          <AppText size={11} weight="semibold" color={COLORS.rust} style={{ marginTop: 14 }}>
            {mode === "drag" ? "Drag a card onto a stash" : "Tap a stash to sort"}
          </AppText>
        </View>
      </View>
    </View>
  );
}
