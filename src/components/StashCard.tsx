import { Pressable, View } from "react-native";
import { AppText } from "./Text";
import type { Stash } from "../store";

export function StashCard({
  stash,
  size,
  onPress,
}: {
  stash: Stash;
  size: number;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: size,
        height: size,
        borderRadius: 16,
        backgroundColor: stash.color,
        overflow: "hidden",
        justifyContent: "flex-end",
        transform: [{ scale: pressed ? 0.96 : 1 }],
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
      })}
      accessibilityRole="button"
      accessibilityLabel={`Open ${stash.name} stash`}
    >
      <View style={{ padding: 12 }}>
        <AppText size={13} weight="semibold" color="#FFFFFF" style={{ lineHeight: 16 }}>
          {stash.name}
        </AppText>
        <AppText size={11} color="#FFFFFF" style={{ marginTop: 2, opacity: 0.72 }}>
          {stash.count} items
        </AppText>
      </View>
    </Pressable>
  );
}
