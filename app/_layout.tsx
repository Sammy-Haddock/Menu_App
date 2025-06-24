import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "../global.css";
import { Platform, View, TouchableOpacity, Text, Modal } from "react-native";
import {
  Home,
  Users,
  Plus,
  Menu,
  Settings,
  User,
  LogIn,
  Crown,
} from "lucide-react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("John Doe");

  useEffect(() => {
    if (process.env.EXPO_PUBLIC_TEMPO && Platform.OS === "web") {
      const { TempoDevtools } = require("tempo-devtools");
      TempoDevtools.init();
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <View style={{ flex: 1 }}>
        {/* Burger Menu Button */}
        <View className="absolute top-12 right-4 z-50">
          <TouchableOpacity
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-white rounded-full p-3 shadow-lg border border-gray-200"
          >
            <Menu size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <View className="absolute top-20 right-4 z-40 bg-white rounded-lg shadow-xl border border-gray-200 min-w-48">
            <View className="py-2">
              <TouchableOpacity className="px-4 py-3 flex-row items-center">
                <Crown size={18} color="#D97706" />
                <Text
                  className="ml-3 text-base font-semibold"
                  style={{
                    color: "#D97706",
                    textShadowColor: "#FCD34D",
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 3,
                  }}
                >
                  Go Pro
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="px-4 py-3 flex-row items-center">
                <Settings size={18} color="#374151" />
                <Text className="ml-3 text-base text-gray-700">Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity className="px-4 py-3 flex-row items-center">
                <User size={18} color="#374151" />
                <Text className="ml-3 text-base text-gray-700">Account</Text>
              </TouchableOpacity>

              <View className="border-t border-gray-200 mt-1 pt-1">
                <TouchableOpacity
                  className="px-4 py-3 flex-row items-center"
                  onPress={() => setIsLoggedIn(!isLoggedIn)}
                >
                  <LogIn size={18} color="#3B82F6" />
                  <Text className="ml-3 text-base text-blue-600 font-medium">
                    {isLoggedIn ? userName : "Log In"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Overlay to close menu when clicking outside */}
        {isMenuOpen && (
          <TouchableOpacity
            className="absolute inset-0 z-30"
            onPress={() => setIsMenuOpen(false)}
            activeOpacity={1}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
