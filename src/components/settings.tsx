import React from "react";
import { Pressable, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { AppText } from "./Text";
import { COLORS, UI } from "../theme";

// Inset hairline — starts after the icon area, doesn't reach the left edge.
export function InsetSep({ left = 54 }: { left?: number }) {
  return <View style={{ height: 1, backgroundColor: UI.hairline, marginLeft: left }} />;
}

export function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <Pressable
      onPress={onToggle}
      style={{
        width: 44,
        height: 26,
        borderRadius: 13,
        backgroundColor: on ? COLORS.rust : "#D1D1D6",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 3,
          left: on ? 21 : 3,
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: "#FFFFFF",
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 2,
          shadowOffset: { width: 0, height: 1 },
          elevation: 2,
        }}
      />
    </Pressable>
  );
}

export function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View style={{ flexDirection: "row", backgroundColor: "#E0E0E5", borderRadius: 9, padding: 2, gap: 2 }}>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={{
              flex: 1,
              height: 28,
              borderRadius: 7,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: active ? "#FFFFFF" : "transparent",
              shadowColor: "#000",
              shadowOpacity: active ? 0.12 : 0,
              shadowRadius: 3,
              shadowOffset: { width: 0, height: 1 },
              elevation: active ? 1 : 0,
            }}
          >
            <AppText size={11} weight={active ? "semibold" : "regular"} color={active ? "#000000" : "#666666"}>
              {opt}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(1, value / max) * 100;
  return (
    <View style={{ height: 3, backgroundColor: "#E5E5EA", borderRadius: 2, overflow: "hidden", marginTop: 4 }}>
      <View style={{ height: "100%", width: `${pct}%`, backgroundColor: COLORS.rust, borderRadius: 2 }} />
    </View>
  );
}

export function SettingsGroup({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <View style={{ marginBottom: 10 }}>
      {label && (
        <AppText size={13} color={UI.textSecondary} style={{ paddingHorizontal: 4, paddingBottom: 6 }}>
          {label}
        </AppText>
      )}
      {/* Outer wrapper carries the shadow; inner clips children to the rounded corners. */}
      <View style={{ borderRadius: 12, boxShadow: "0 1px 5px rgba(0,0,0,0.10)" }}>
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>{children}</View>
      </View>
    </View>
  );
}

export function SectionNote({ text }: { text: string }) {
  return (
    <AppText size={11} color={UI.textSecondary} style={{ paddingHorizontal: 4, paddingTop: 4, paddingBottom: 12, lineHeight: 16 }}>
      {text}
    </AppText>
  );
}

function IconBox({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <View
      style={{
        width: 28,
        height: 28,
        borderRadius: 7,
        backgroundColor: bg ?? "#F2F2F7",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </View>
  );
}

export function SettingsRow({
  icon,
  label,
  sublabel,
  right,
  onPress,
  noBorder,
  iconBg,
}: {
  icon?: React.ReactNode;
  label: string;
  sublabel?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  noBorder?: boolean;
  iconBg?: string;
}) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={{ flexDirection: "row", alignItems: "center", paddingVertical: 11, paddingHorizontal: 14, gap: 12, backgroundColor: "#FFFFFF" }}
      >
        {icon && <IconBox bg={iconBg}>{icon}</IconBox>}
        <View style={{ flex: 1 }}>
          <AppText size={13} weight="medium" style={{ lineHeight: 17 }}>
            {label}
          </AppText>
          {sublabel && (
            <AppText size={11} color={UI.textSecondary} style={{ marginTop: 2, lineHeight: 15 }}>
              {sublabel}
            </AppText>
          )}
        </View>
        {right !== undefined ? right : <ChevronRight size={14} color={UI.chevron} />}
      </Pressable>
      {!noBorder && <InsetSep left={icon ? 54 : 14} />}
    </View>
  );
}

export function ToggleRow({
  icon,
  label,
  sublabel,
  on,
  onToggle,
  noBorder,
  iconBg,
}: {
  icon?: React.ReactNode;
  label: string;
  sublabel?: string;
  on: boolean;
  onToggle: () => void;
  noBorder?: boolean;
  iconBg?: string;
}) {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 11, paddingHorizontal: 14, gap: 12, backgroundColor: "#FFFFFF" }}>
        {icon && <IconBox bg={iconBg}>{icon}</IconBox>}
        <View style={{ flex: 1, paddingRight: 8 }}>
          <AppText size={13} weight="medium" style={{ lineHeight: 17 }}>
            {label}
          </AppText>
          {sublabel && (
            <AppText size={11} color={UI.textSecondary} style={{ marginTop: 2, lineHeight: 15 }}>
              {sublabel}
            </AppText>
          )}
        </View>
        <Toggle on={on} onToggle={onToggle} />
      </View>
      {!noBorder && <InsetSep left={icon ? 54 : 14} />}
    </View>
  );
}
