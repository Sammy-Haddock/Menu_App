import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import MenuDisplay from "../components/MenuDisplay";
import PreferenceFilters from "../components/PreferenceFilters";

export default function HomeScreen() {
  const [budgetFilter, setBudgetFilter] = useState("$$"); // Default to medium budget
  const [cuisinePreferences, setCuisinePreferences] = useState({
    italian: true,
    asian: true,
    mexican: true,
    american: true,
    mediterranean: true,
  });

  const handleBudgetChange = (budget: string) => {
    setBudgetFilter(budget);
  };

  const handleCuisineToggle = (cuisine: string) => {
    setCuisinePreferences((prev) => ({
      ...prev,
      [cuisine]: !prev[cuisine as keyof typeof prev],
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />
      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Today's Menu
          </Text>
          <Text className="text-gray-600 mb-6">
            Personalized meal suggestions just for you
          </Text>

          <PreferenceFilters
            selectedBudget={budgetFilter}
            cuisinePreferences={cuisinePreferences}
            onBudgetChange={handleBudgetChange}
            onCuisineToggle={handleCuisineToggle}
          />

          <MenuDisplay
            budgetFilter={budgetFilter}
            cuisinePreferences={cuisinePreferences}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
