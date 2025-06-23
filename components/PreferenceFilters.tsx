import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ChevronDown, ChevronUp, DollarSign } from "lucide-react-native";

type BudgetOption = "$" | "$$" | "$$$";
type CuisineType =
  | "Italian"
  | "Asian"
  | "Mexican"
  | "American"
  | "Mediterranean"
  | "Indian";

interface PreferenceFiltersProps {
  onBudgetChange?: (budget: BudgetOption[]) => void;
  onCuisineChange?: (cuisines: CuisineType[]) => void;
  selectedBudget?: BudgetOption[];
  selectedCuisines?: CuisineType[];
}

const PreferenceFilters = ({
  onBudgetChange = () => {},
  onCuisineChange = () => {},
  selectedBudget = ["$", "$$"],
  selectedCuisines = ["Italian", "Asian"],
}: PreferenceFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const budgetOptions: BudgetOption[] = ["$", "$$", "$$$"];
  const cuisineOptions: CuisineType[] = [
    "Italian",
    "Asian",
    "Mexican",
    "American",
    "Mediterranean",
    "Indian",
  ];

  const toggleBudget = (budget: BudgetOption) => {
    const newBudget = selectedBudget.includes(budget)
      ? selectedBudget.filter((b) => b !== budget)
      : [...selectedBudget, budget];
    onBudgetChange(newBudget);
  };

  const toggleCuisine = (cuisine: CuisineType) => {
    const newCuisines = selectedCuisines.includes(cuisine)
      ? selectedCuisines.filter((c) => c !== cuisine)
      : [...selectedCuisines, cuisine];
    onCuisineChange(newCuisines);
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-md w-full">
      <TouchableOpacity
        className="flex-row justify-between items-center"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text className="text-lg font-bold text-gray-800">Preferences</Text>
        {isExpanded ? (
          <ChevronUp size={24} color="#4B5563" />
        ) : (
          <ChevronDown size={24} color="#4B5563" />
        )}
      </TouchableOpacity>

      {isExpanded && (
        <View className="mt-4">
          <View>
            <Text className="text-base font-semibold text-gray-700 mb-2">
              Budget
            </Text>
            <View className="flex-row space-x-2">
              {budgetOptions.map((budget) => (
                <TouchableOpacity
                  key={budget}
                  className={`flex-row items-center justify-center px-4 py-2 rounded-full ${selectedBudget.includes(budget) ? "bg-blue-500" : "bg-gray-200"}`}
                  onPress={() => toggleBudget(budget)}
                >
                  <DollarSign
                    size={16}
                    color={
                      selectedBudget.includes(budget) ? "#FFFFFF" : "#4B5563"
                    }
                  />
                  <Text
                    className={`ml-1 ${selectedBudget.includes(budget) ? "text-white" : "text-gray-700"}`}
                  >
                    {budget}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-base font-semibold text-gray-700 mb-2">
              Cuisine
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-4 px-4"
            >
              <View className="flex-row space-x-2">
                {cuisineOptions.map((cuisine) => (
                  <TouchableOpacity
                    key={cuisine}
                    className={`px-4 py-2 rounded-full ${selectedCuisines.includes(cuisine) ? "bg-blue-500" : "bg-gray-200"}`}
                    onPress={() => toggleCuisine(cuisine)}
                  >
                    <Text
                      className={`${selectedCuisines.includes(cuisine) ? "text-white" : "text-gray-700"}`}
                    >
                      {cuisine}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default PreferenceFilters;
