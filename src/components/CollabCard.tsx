import { Pressable, View } from "react-native";
import { AppText } from "./Text";
import type { Collab, Member } from "../data";

// Max 3 avatars shown, remainder collapses into a "+N" chip, anchored bottom-right.
function MemberAvatars({ members }: { members: Member[] }) {
  const MAX = 3;
  const visible = members.slice(0, MAX);
  const overflow = members.length - MAX;

  const chip = (bg: string, label: string, key: string, first: boolean, z: number) => (
    <View
      key={key}
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: bg,
        borderWidth: 1.5,
        borderColor: "rgba(255,255,255,0.85)",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: first ? 0 : -5,
        zIndex: z,
      }}
    >
      <AppText size={7} weight="bold" color="#FFFFFF">
        {label}
      </AppText>
    </View>
  );

  return (
    <View style={{ position: "absolute", bottom: 8, right: 8, flexDirection: "row", alignItems: "center" }}>
      {visible.map((m, i) => chip(m.bg, m.initials, `m${i}`, i === 0, MAX - i))}
      {overflow > 0 && chip("rgba(0,0,0,0.35)", `+${overflow}`, "overflow", false, 0)}
    </View>
  );
}

export function CollabCard({
  collab,
  size,
  onPress,
}: {
  collab: Collab;
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
        backgroundColor: collab.color,
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
      accessibilityLabel={`Open ${collab.name} collab`}
    >
      <View style={{ padding: 12 }}>
        <AppText size={13} weight="semibold" color="#FFFFFF" style={{ lineHeight: 16 }}>
          {collab.name}
        </AppText>
        <AppText size={11} color="#FFFFFF" style={{ marginTop: 2, opacity: 0.72 }}>
          {collab.count}
        </AppText>
      </View>
      <MemberAvatars members={collab.members} />
    </Pressable>
  );
}
