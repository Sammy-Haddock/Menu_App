import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import MealCard from "./MealCard";

interface Meal {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  price: "$" | "$$" | "$$$";
  image: string;
}

interface MenuDisplayProps {
  breakfastOptions?: Meal[];
  lunchOptions?: Meal[];
  dinnerOptions?: Meal[];
  budgetFilter?: "$" | "$$" | "$$$";
  cuisineFilters?: string[];
  onSwipeChange?: (
    mealType: "breakfast" | "lunch" | "dinner",
    direction: "left" | "right",
  ) => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

const MenuDisplay: React.FC<MenuDisplayProps> = ({
  breakfastOptions = [
    {
      id: "b1",
      name: "Avocado Toast",
      description:
        "Whole grain toast topped with mashed avocado, cherry tomatoes, and a poached egg",
      cuisine: "American",
      price: "$$",
      image:
        "https://images.unsplash.com/photo-1603046891744-76e6300f6869?w=500&q=80",
    },
    {
      id: "b2",
      name: "Greek Yogurt Bowl",
      description: "Greek yogurt with honey, mixed berries, and granola",
      cuisine: "Mediterranean",
      price: "$",
      image:
        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=500&q=80",
    },
  ],
  lunchOptions = [
    {
      id: "l1",
      name: "Chicken Caesar Salad",
      description:
        "Romaine lettuce, grilled chicken, parmesan cheese, and Caesar dressing",
      cuisine: "Italian",
      price: "$$",
      image:
        "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80",
    },
    {
      id: "l2",
      name: "Veggie Wrap",
      description:
        "Whole wheat wrap with hummus, mixed vegetables, and feta cheese",
      cuisine: "Mediterranean",
      price: "$",
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80",
    },
  ],
  dinnerOptions = [
    {
      id: "d1",
      name: "Grilled Salmon",
      description: "Grilled salmon fillet with roasted vegetables and quinoa",
      cuisine: "American",
      price: "$$$",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80",
    },
    {
      id: "d2",
      name: "Vegetable Stir Fry",
      description:
        "Mixed vegetables stir-fried with tofu in a savory sauce, served with rice",
      cuisine: "Asian",
      price: "$$",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
    },
  ],
  budgetFilter,
  cuisineFilters,
  onSwipeChange = () => {},
}) => {
  const [currentBreakfastIndex, setCurrentBreakfastIndex] = useState(0);
  const [currentLunchIndex, setCurrentLunchIndex] = useState(0);
  const [currentDinnerIndex, setCurrentDinnerIndex] = useState(0);

  // Animated values for swipe gestures
  const breakfastOffset = useSharedValue(0);
  const lunchOffset = useSharedValue(0);
  const dinnerOffset = useSharedValue(0);

  // Filter meals based on budget and cuisine preferences
  const filteredBreakfastOptions = breakfastOptions.filter((meal) => {
    const budgetMatch = !budgetFilter || meal.price === budgetFilter;
    const cuisineMatch =
      !cuisineFilters?.length || cuisineFilters.includes(meal.cuisine);
    return budgetMatch && cuisineMatch;
  });

  const filteredLunchOptions = lunchOptions.filter((meal) => {
    const budgetMatch = !budgetFilter || meal.price === budgetFilter;
    const cuisineMatch =
      !cuisineFilters?.length || cuisineFilters.includes(meal.cuisine);
    return budgetMatch && cuisineMatch;
  });

  const filteredDinnerOptions = dinnerOptions.filter((meal) => {
    const budgetMatch = !budgetFilter || meal.price === budgetFilter;
    const cuisineMatch =
      !cuisineFilters?.length || cuisineFilters.includes(meal.cuisine);
    return budgetMatch && cuisineMatch;
  });

  // Create swipe gestures for each meal type
  const createSwipeGesture = (
    offset: Animated.SharedValue<number>,
    mealType: "breakfast" | "lunch" | "dinner",
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    options: Meal[],
  ) => {
    return Gesture.Pan()
      .onUpdate((e) => {
        offset.value = e.translationX;
      })
      .onEnd((e) => {
        if (e.translationX < -50 && options.length > 0) {
          // Swipe left
          setIndex((prev) => (prev + 1) % options.length);
          onSwipeChange(mealType, "left");
        } else if (e.translationX > 50 && options.length > 0) {
          // Swipe right
          setIndex((prev) => (prev - 1 + options.length) % options.length);
          onSwipeChange(mealType, "right");
        }
        offset.value = withSpring(0);
      });
  };

  const breakfastGesture = createSwipeGesture(
    breakfastOffset,
    "breakfast",
    setCurrentBreakfastIndex,
    filteredBreakfastOptions,
  );
  const lunchGesture = createSwipeGesture(
    lunchOffset,
    "lunch",
    setCurrentLunchIndex,
    filteredLunchOptions,
  );
  const dinnerGesture = createSwipeGesture(
    dinnerOffset,
    "dinner",
    setCurrentDinnerIndex,
    filteredDinnerOptions,
  );

  // Animated styles for swipe animations
  const breakfastAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: breakfastOffset.value }],
    };
  });

  const lunchAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: lunchOffset.value }],
    };
  });

  const dinnerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: dinnerOffset.value }],
    };
  });

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4 pb-20">
        {/* Breakfast Section */}
        <View className="mb-6">
          <Text className="text-2xl font-bold mb-2 text-gray-800">
            Breakfast
          </Text>
          {filteredBreakfastOptions.length > 0 ? (
            <GestureDetector gesture={breakfastGesture}>
              <Animated.View style={breakfastAnimatedStyle}>
                <MealCard
                  meal={
                    filteredBreakfastOptions[
                      currentBreakfastIndex % filteredBreakfastOptions.length
                    ]
                  }
                />
              </Animated.View>
            </GestureDetector>
          ) : (
            <View className="bg-gray-100 rounded-lg p-4 items-center justify-center h-40">
              <Text className="text-gray-500">
                No breakfast options match your filters
              </Text>
            </View>
          )}
        </View>

        {/* Lunch Section */}
        <View className="mb-6">
          <Text className="text-2xl font-bold mb-2 text-gray-800">Lunch</Text>
          {filteredLunchOptions.length > 0 ? (
            <GestureDetector gesture={lunchGesture}>
              <Animated.View style={lunchAnimatedStyle}>
                <MealCard
                  meal={
                    filteredLunchOptions[
                      currentLunchIndex % filteredLunchOptions.length
                    ]
                  }
                />
              </Animated.View>
            </GestureDetector>
          ) : (
            <View className="bg-gray-100 rounded-lg p-4 items-center justify-center h-40">
              <Text className="text-gray-500">
                No lunch options match your filters
              </Text>
            </View>
          )}
        </View>

        {/* Dinner Section */}
        <View className="mb-6">
          <Text className="text-2xl font-bold mb-2 text-gray-800">Dinner</Text>
          {filteredDinnerOptions.length > 0 ? (
            <GestureDetector gesture={dinnerGesture}>
              <Animated.View style={dinnerAnimatedStyle}>
                <MealCard
                  meal={
                    filteredDinnerOptions[
                      currentDinnerIndex % filteredDinnerOptions.length
                    ]
                  }
                />
              </Animated.View>
            </GestureDetector>
          ) : (
            <View className="bg-gray-100 rounded-lg p-4 items-center justify-center h-40">
              <Text className="text-gray-500">
                No dinner options match your filters
              </Text>
            </View>
          )}
        </View>

        {/* Swipe instruction */}
        <View className="items-center mt-2 mb-4">
          <Text className="text-gray-500 italic">
            Swipe left or right to see more options
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MenuDisplay;
