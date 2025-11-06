import { Stack } from "expo-router";
import { useFonts, InknutAntiqua_400Regular } from "@expo-google-fonts/inknut-antiqua";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    InknutAntiqua_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}


