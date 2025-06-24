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
import React from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const MenuItem = ({
  icon: Icon,
  label,
  color,
  onPress,
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  color: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    className="px-4 py-3 flex-row items-center"
    onPress={onPress}
    accessibilityLabel={label}
  >
    <Icon size={18} color={color} />
    <Text className="ml-3 text-base" style={{ color }}>
      {label}
    </Text>
  </TouchableOpacity>
);

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
        <TouchableOpacity
          onPress={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute top-12 right-4 bg-white rounded-full p-3 shadow-lg border border-gray-200 z-50"
          accessibilityLabel="Toggle Menu"
        >
          <Menu size={24} color="#374151" />
        </TouchableOpacity>

        {/* Dropdown Menu as Overlay */}
        {isMenuOpen && (
          <Modal transparent={true} animationType="fade" visible={isMenuOpen}>
            <TouchableOpacity
              className="absolute inset-0 bg-black bg-opacity-50"
              onPress={() => setIsMenuOpen(false)}
              activeOpacity={1}
              accessibilityLabel="Close Menu"
            />
            <View className="absolute top-20 right-4 bg-white rounded-lg shadow-xl border border-gray-200 min-w-48 z-50">
              <View className="py-4 px-4">
                <MenuItem
                  icon={Crown}
                  label="Go Pro"
                  color="#D97706"
                  onPress={() => console.log("Go Pro clicked")}
                />
                <View className="border-t border-gray-200 my-2" />
                <MenuItem
                  icon={Settings}
                  label="Settings"
                  color="#374151"
                  onPress={() => console.log("Settings clicked")}
                />
                <MenuItem
                  icon={User}
                  label="Account"
                  color="#374151"
                  onPress={() => console.log("Account clicked")}
                />
                <View className="border-t border-gray-200 my-2" />
                <MenuItem
                  icon={LogIn}
                  label={isLoggedIn ? userName : "Log In"}
                  color="#3B82F6"
                  onPress={() => setIsLoggedIn(!isLoggedIn)}
                />
              </View>
            </View>
          </Modal>
        )}

        {/* Bottom Tab Navigation */}
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#3B82F6",
            tabBarInactiveTintColor: "#6B7280",
            tabBarStyle: {
              backgroundColor: "white",
              borderTopWidth: 1,
              borderTopColor: "#E5E7EB",
              paddingBottom: 8,
              paddingTop: 8,
              height: 70,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "500",
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Menu",
              tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="social"
            options={{
              title: "Social",
              tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: "Create",
              tabBarIcon: ({ color, size }) => <Plus size={size} color={color} />,
            }}
          />
        </Tabs>

        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}
