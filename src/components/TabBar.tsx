import { Home, Inbox, Settings, Users } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "./Text";
import { COLORS, TAB_BAR, UI } from "../theme";

const ICONS: Record<string, typeof Home> = {
  index: Home,
  unstashed: Inbox,
  collab: Users,
  settings: Settings,
};

const LABELS: Record<string, string> = {
  index: "Home",
  unstashed: "Unstashed",
  collab: "Collab",
  settings: "Settings",
};

// Minimal structural type for the fields we read — compatible with the
// BottomTabBarProps expo-router passes, without importing its vendored path.
type TabBarProps = {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: {
    emit: (e: { type: "tabPress"; target: string; canPreventDefault: true }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
};

export function TabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    // box-none: the transparent margins let touches fall through to the content
    // behind, so only the rounded bar itself intercepts taps.
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: TAB_BAR.marginH + 7,
        paddingBottom: insets.bottom + TAB_BAR.marginB,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: TAB_BAR.height,
          borderRadius: 28,
          backgroundColor: UI.white,
          paddingHorizontal: 8,
          borderWidth: 1,
          borderColor: "#ffffff",
          boxShadow: '0 0 15px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        {state.routes.map((route, index) => {
          const Icon = ICONS[route.name];
          if (!Icon) return null;
          const isActive = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
            if (!isActive && !event.defaultPrevented) navigation.navigate(route.name);
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              {/* Fixed-size highlight, identical on every tab, rounded like the bar.
                  Rendered as a separate conditionally-mounted view so Android always
                  applies its borderRadius (toggling backgroundColor on a persistent
                  view drops the rounding after the first tab switch). */}
              <View style={{ width: 76, height: 48, alignItems: "center", justifyContent: "center", gap: 3 }}>
                {isActive && (
                  <View
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      borderRadius: 16,
                      backgroundColor: UI.activeTabPill,
                    }}
                  />
                )}
                <Icon size={22} color={isActive ? COLORS.rust : UI.tabInactive} strokeWidth={isActive ? 2.4 : 2} />
                <AppText size={11} weight="semibold" color={isActive ? COLORS.rust : UI.tabInactive} numberOfLines={1}>
                  {LABELS[route.name]}
                </AppText>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
