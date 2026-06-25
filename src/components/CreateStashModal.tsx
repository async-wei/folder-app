import { useState } from "react";
import { Modal, Pressable, TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "./Text";
import { COLORS, UI } from "../theme";

const COLOR_OPTIONS = Object.values(COLORS);

export function CreateStashModal({
  visible,
  onClose,
  onCreate,
}: {
  visible: boolean;
  onClose: () => void;
  onCreate: (name: string, color: string) => void;
}) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>(COLORS.rust);

  const reset = () => {
    setName("");
    setSelectedColor(COLORS.rust);
  };
  const close = () => {
    reset();
    onClose();
  };
  const submit = () => {
    if (!name.trim()) return;
    onCreate(name, selectedColor);
    reset();
    onClose();
  };

  const canCreate = name.trim().length > 0;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={close}>
      <Pressable
        style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.45)" }}
        onPress={close}
      >
        <Pressable
          // Stop backdrop press from closing when tapping the sheet itself.
          onPress={() => {}}
          style={{
            backgroundColor: UI.white,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingHorizontal: 24,
            paddingTop: 12,
            paddingBottom: Math.max(insets.bottom, 24) + 16,
          }}
        >
          <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: "#E5E5EA", alignSelf: "center", marginBottom: 20 }} />
          <AppText size={20} weight="semibold" style={{ marginBottom: 20 }}>
            Create New Stash
          </AppText>

          <View
            style={{
              height: 48,
              borderRadius: 12,
              backgroundColor: UI.field,
              borderWidth: 1.5,
              borderColor: selectedColor,
              paddingHorizontal: 16,
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Stash name..."
              placeholderTextColor={UI.placeholder}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={submit}
              style={{ fontSize: 15, color: UI.black, fontFamily: "SFProText-Regular", padding: 0 }}
            />
          </View>

          <AppText
            size={12}
            weight="semibold"
            color={UI.textMuted}
            style={{ textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 12 }}
          >
            Choose Theme Color
          </AppText>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
            {COLOR_OPTIONS.map((color) => {
              const active = selectedColor === color;
              return (
                <Pressable
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: color,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: active ? 3 : 0,
                    borderColor: UI.white,
                    shadowColor: color,
                    shadowOpacity: active ? 0.6 : 0,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: active ? 4 : 0,
                  }}
                >
                  {active && (
                    <Svg width={18} height={18} viewBox="0 0 16 16" fill="none">
                      <Path
                        d="M3 8l3.5 3.5L13 5"
                        stroke="white"
                        strokeWidth={2.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  )}
                </Pressable>
              );
            })}
          </View>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              onPress={close}
              style={{ flex: 1, height: 48, borderRadius: 12, backgroundColor: UI.cancel, alignItems: "center", justifyContent: "center" }}
            >
              <AppText size={15} weight="semibold">
                Cancel
              </AppText>
            </Pressable>
            <Pressable
              onPress={submit}
              disabled={!canCreate}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 12,
                backgroundColor: canCreate ? selectedColor : COLORS.rust,
                opacity: canCreate ? 1 : 0.45,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AppText size={15} weight="semibold" color="#FFFFFF">
                Create
              </AppText>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
