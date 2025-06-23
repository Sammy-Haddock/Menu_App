import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Tag } from "lucide-react-native";

interface MealCardProps {
  image?: string;
  name?: string;
  description?: string;
  cuisine?: string;
  price?: "$" | "$$" | "$$$";
  onPress?: () => void;
}

const MealCard = ({
  image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
  name = "Avocado Toast",
  description = "Fresh avocado on toasted sourdough bread with cherry tomatoes and microgreens",
  cuisine = "Breakfast",
  price = "$$",
  onPress = () => {},
}: MealCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl overflow-hidden shadow-md mb-4 w-[350px] h-[180px] border border-gray-100"
    >
      <View className="flex-row h-full">
        <Image
          source={{ uri: image }}
          className="w-1/3 h-full"
          contentFit="cover"
        />
        <View className="p-3 flex-1 justify-between">
          <View>
            <Text className="text-lg font-bold text-gray-800">{name}</Text>
            <Text className="text-sm text-gray-600 mt-1" numberOfLines={3}>
              {description}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mt-2">
            <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-full">
              <Tag size={14} color="#4B5563" />
              <Text className="text-xs text-gray-600 ml-1">{cuisine}</Text>
            </View>
            <Text className="text-base font-semibold text-gray-800">
              {price}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MealCard;
