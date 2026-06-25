import { Bell, Plus, Search } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "../../src/components/Text";
import { StashCard } from "../../src/components/StashCard";
import { CreateStashModal } from "../../src/components/CreateStashModal";
import { useStore } from "../../src/store";
import { COLORS, UI, gridItemSize, tabBarClearance } from "../../src/theme";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { stashes, addStash } = useStore();
  const [showCreate, setShowCreate] = useState(false);

  const cardSize = gridItemSize(width);

  return (
    <View style={{ flex: 1, backgroundColor: UI.white }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: insets.top + 12, paddingBottom: tabBarClearance(insets.bottom) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <View style={{ flex: 1 }}>
            <AppText size={28} weight="semibold" style={{ lineHeight: 34 }}>
              Hello, Alex 👋
            </AppText>
            <AppText size={14} color={UI.textMuted} style={{ marginTop: 2 }}>
              What are you saving today?
            </AppText>
          </View>
          <Pressable
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: UI.fieldAlt,
              borderWidth: 2,
              borderColor: COLORS.rust,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Bell size={22} color={COLORS.rust} strokeWidth={1.8} />
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  right: 0,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#EF4444",
                  borderWidth: 1.5,
                  borderColor: UI.fieldAlt,
                }}
              />
            </View>
          </Pressable>
        </View>

        {/* Search */}
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
            Search stashes or items...
          </AppText>
        </View>

        {/* Section header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <AppText size={18} weight="semibold">
            Your Stashes
          </AppText>
          <AppText size={13} color={UI.textMuted}>
            {stashes.length} stashes
          </AppText>
        </View>

        {/* Grid */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          {stashes.map((stash) => (
            <StashCard key={stash.id} stash={stash} size={cardSize} />
          ))}
        </View>
      </ScrollView>

      {/* FAB */}
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
