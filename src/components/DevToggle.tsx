import { Eye, EyeOff } from "lucide-react-native";
import { Pressable } from "react-native";
import { AppText } from "./Text";
import { UI } from "../theme";

// Dev-only header affordance to flip between the empty and populated states on device.
// Shows the action it will perform: "Fill" when currently empty, "Empty" when populated.
export function DevToggle({ isEmpty, onPress }: { isEmpty: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center", gap: 4, height: 28, paddingHorizontal: 10, borderRadius: 8, backgroundColor: UI.fieldAlt }}
    >
      {isEmpty ? <Eye size={13} color={UI.textSecondary} /> : <EyeOff size={13} color={UI.textSecondary} />}
      <AppText size={11} weight="semibold" color={UI.textSecondary}>
        {isEmpty ? "Fill" : "Empty"}
      </AppText>
    </Pressable>
  );
}
