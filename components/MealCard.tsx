import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Tag } from "lucide-react-native";

// Define the Meal type
interface Meal {
  image: string;
  name: string;
  description: string;
  cuisine: string;
  price: "$" | "$$" | "$$$";
}

// Update the MealCardProps interface to include the meal property
interface MealCardProps {
  meal: Meal; // Add the meal property
  onPress?: () => void;
}

const MealCard = ({
  meal,
  onPress = () => { },
}: MealCardProps) => {
  const { image, name, description, cuisine, price } = meal; // Destructure meal properties

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl overflow-hidden shadow-md mb-4 w-[350px] h-[180px] border border-gray-100"
      accessibilityLabel={`View details for ${name}`}
    >
      <View className="flex-row h-full">
        {/* Image Section */}
        <Image
          source={{ uri: image }}
          className="w-1/3 h-full"
          contentFit="cover"
          accessibilityLabel={`Image of ${name}`}
        />
        <View className="p-3 flex-1 justify-between">
          {/* Text Section */}
          <View>
            <Text className="text-lg font-bold text-gray-800">{name}</Text>
            <Text className="text-sm text-gray-600 mt-1" numberOfLines={3}>
              {description}
            </Text>
          </View>

          {/* Footer Section */}
          <View className="flex-row justify-between items-center mt-2">
            {/* Cuisine Tag */}
            <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-full">
              <Tag size={14} color="#4B5563" />
              <Text className="text-xs text-gray-600 ml-1">{cuisine}</Text>
            </View>
            {/* Price */}
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
