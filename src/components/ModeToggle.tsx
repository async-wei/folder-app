import { Hand, Pointer } from "lucide-react-native";
import { Pressable } from "react-native";
import { AppText } from "./Text";
import { UI } from "../theme";

// Dev/temp toggle: switch the Unstashed sort interaction between tap and drag.
export function ModeToggle({ mode, onPress }: { mode: "tap" | "drag"; onPress: () => void }) {
  const isDrag = mode === "drag";
  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center", gap: 4, height: 28, paddingHorizontal: 10, borderRadius: 8, backgroundColor: UI.fieldAlt }}
    >
      {isDrag ? <Hand size={13} color={UI.textSecondary} /> : <Pointer size={13} color={UI.textSecondary} />}
      <AppText size={11} weight="semibold" color={UI.textSecondary}>
        {isDrag ? "Drag" : "Tap"}
      </AppText>
    </Pressable>
  );
}
