import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StashProvider } from "../src/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "SFProDisplay-Regular": require("../assets/fonts/SFProDisplay-Regular.otf"),
    "SFProDisplay-Medium": require("../assets/fonts/SFProDisplay-Medium.otf"),
    "SFProDisplay-Semibold": require("../assets/fonts/SFProDisplay-Semibold.otf"),
    "SFProDisplay-Bold": require("../assets/fonts/SFProDisplay-Bold.otf"),
    "SFProText-Regular": require("../assets/fonts/SFProText-Regular.otf"),
    "SFProText-Medium": require("../assets/fonts/SFProText-Medium.otf"),
    "SFProText-Semibold": require("../assets/fonts/SFProText-Semibold.otf"),
    "SFProText-Bold": require("../assets/fonts/SFProText-Bold.otf"),
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <StashProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#FFFFFF" } }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </StashProvider>
    </SafeAreaProvider>
  );
}
