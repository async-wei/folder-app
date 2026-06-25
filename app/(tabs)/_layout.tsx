import { Tabs } from "expo-router";
import { TabBar } from "../../src/components/TabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: "#FFFFFF" } }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="unstashed" />
      <Tabs.Screen name="collab" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
