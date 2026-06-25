import { useRouter } from "expo-router";
import { FolderPlus, LayoutGrid, Plus, Search } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "../../src/components/Text";
import { CollabCard } from "../../src/components/CollabCard";
import { CreateStashModal } from "../../src/components/CreateStashModal";
import { DevToggle } from "../../src/components/DevToggle";
import { KangarooPlaceholder } from "../../src/components/Kangaroo";
import { collabs } from "../../src/data";
import { useStore } from "../../src/store";
import { COLORS, UI, gridItemSize, tabBarClearance } from "../../src/theme";

function MyStashesButton() {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.navigate("/")}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        height: 36,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: COLORS.rust,
      }}
    >
      <LayoutGrid size={14} color="#FFFFFF" strokeWidth={2.2} />
      <AppText size={14} weight="semibold" color="#FFFFFF">
        My Stashes
      </AppText>
    </Pressable>
  );
}

export default function CollabScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { addStash } = useStore();
  const [showCreate, setShowCreate] = useState(false);
  const [previewEmpty, setPreviewEmpty] = useState(false);

  const cardSize = gridItemSize(width);
  const empty = previewEmpty || collabs.length === 0;
  const dev = <DevToggle isEmpty={empty} onPress={() => setPreviewEmpty((v) => !v)} />;

  // ── Empty state ──
  if (empty) {
    return (
      <View style={{ flex: 1, backgroundColor: UI.white, paddingHorizontal: 20, paddingTop: insets.top + 12 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <AppText size={28} weight="semibold" style={{ lineHeight: 34 }}>
            Collab
          </AppText>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            {dev}
            <MyStashesButton />
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ marginTop: 100 }}>
            <KangarooPlaceholder />
          </View>
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <AppText size={20} weight="semibold" style={{ marginBottom: 8 }}>
              Nothing Here Yet
            </AppText>
            <AppText size={14} color={UI.textMuted} style={{ textAlign: "center", width: 270, lineHeight: 20, marginBottom: 20 }}>
              Add your friends to new or existing Stashes and start saving together!
            </AppText>
            <Pressable
              onPress={() => setShowCreate(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                height: 50,
                paddingHorizontal: 24,
                borderRadius: 16,
                backgroundColor: COLORS.rust,
                shadowColor: COLORS.rust,
                shadowOpacity: 0.4,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 6,
              }}
            >
              <FolderPlus size={18} color="#FFFFFF" strokeWidth={2} />
              <AppText size={15} weight="semibold" color="#FFFFFF">
                Create New Stash
              </AppText>
            </Pressable>
          </View>
        </View>
        <CreateStashModal visible={showCreate} onClose={() => setShowCreate(false)} onCreate={addStash} />
      </View>
    );
  }

  // ── Active state ──
  return (
    <View style={{ flex: 1, backgroundColor: UI.white }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: insets.top + 12, paddingBottom: tabBarClearance(insets.bottom) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <AppText size={28} weight="semibold" style={{ lineHeight: 34 }}>
            Collab
          </AppText>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            {dev}
            <MyStashesButton />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            height: 48,
            borderRadius: 12,
            backgroundColor: UI.field,
            paddingHorizontal: 16,
            marginBottom: 28,
          }}
        >
          <Search size={18} color={COLORS.rust} strokeWidth={2} />
          <AppText size={15} color={UI.textMuted}>
            Search collabs...
          </AppText>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <AppText size={18} weight="semibold">
            Your Collabs
          </AppText>
          <AppText size={13} color={UI.textMuted}>
            {collabs.length} collabs
          </AppText>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          {collabs.map((collab) => (
            <CollabCard key={collab.id} collab={collab} size={cardSize} />
          ))}
        </View>
      </ScrollView>

      <Pressable
        onPress={() => setShowCreate(true)}
        style={{
          position: "absolute",
          right: 20,
          bottom: tabBarClearance(insets.bottom) + 20,
          width: 62,
          height: 62,
          borderRadius: 18,
          backgroundColor: COLORS.rust,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: COLORS.rust,
          shadowOpacity: 0.5,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        }}
      >
        <Plus size={31} color="#FFFFFF" strokeWidth={2.5} />
      </Pressable>

      <CreateStashModal visible={showCreate} onClose={() => setShowCreate(false)} onCreate={addStash} />
    </View>
  );
}
