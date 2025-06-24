import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import {
  Camera,
  Plus,
  X,
  Clock,
  Users,
  ChefHat,
  Upload,
} from "lucide-react-native";

type CuisineType =
  | "Italian"
  | "Asian"
  | "Mexican"
  | "American"
  | "Mediterranean"
  | "Indian";
type DifficultyLevel = "Easy" | "Medium" | "Hard";

export default function CreateScreen() {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [selectedCuisine, setSelectedCuisine] =
    useState<CuisineType>("American");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("Easy");
  const [recipeImage, setRecipeImage] = useState<string | null>(null);

  const cuisineOptions: CuisineType[] = [
    "Italian",
    "Asian",
    "Mexican",
    "American",
    "Mediterranean",
    "Indian",
  ];

  const difficultyOptions: DifficultyLevel[] = ["Easy", "Medium", "Hard"];

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index));
    }
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const handleImageUpload = () => {
    // Simulate image upload - in a real app, you'd use expo-image-picker
    const sampleImages = [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&q=80",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80",
    ];
    const randomImage =
      sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setRecipeImage(randomImage);
  };

  const handleSubmit = () => {
    if (!recipeName.trim()) {
      Alert.alert("Error", "Please enter a recipe name");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Error", "Please enter a description");
      return;
    }
    if (ingredients.some((ing) => !ing.trim())) {
      Alert.alert("Error", "Please fill in all ingredients");
      return;
    }
    if (instructions.some((inst) => !inst.trim())) {
      Alert.alert("Error", "Please fill in all instructions");
      return;
    }

    Alert.alert("Success", "Recipe uploaded successfully!", [
      {
        text: "OK",
        onPress: () => {
          // Reset form
          setRecipeName("");
          setDescription("");
          setIngredients([""]);
          setInstructions([""]);
          setCookingTime("");
          setServings("");
          setRecipeImage(null);
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />
      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <View className="flex-row items-center mb-6">
            <ChefHat size={28} color="#3B82F6" />
            <Text className="text-3xl font-bold text-gray-800 ml-2">
              Create Recipe
            </Text>
          </View>
          <Text className="text-gray-600 mb-6">
            Share your favorite recipe with the community
          </Text>

          {/* Recipe Image */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Recipe Photo
            </Text>
            <TouchableOpacity
              onPress={handleImageUpload}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 items-center justify-center bg-gray-50"
            >
              {recipeImage ? (
                <Image
                  source={{ uri: recipeImage }}
                  className="w-full h-48 rounded-lg"
                  contentFit="cover"
                />
              ) : (
                <View className="items-center">
                  <Camera size={48} color="#9CA3AF" />
                  <Text className="text-gray-500 mt-2">Tap to add photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Recipe Name */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Recipe Name
            </Text>
            <TextInput
              value={recipeName}
              onChangeText={setRecipeName}
              placeholder="Enter recipe name"
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            />
          </View>

          {/* Description */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your recipe"
              multiline
              numberOfLines={3}
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            />
          </View>

          {/* Recipe Details */}
          <View className="flex-row mb-4 space-x-4">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                <Clock size={16} color="#4B5563" /> Cooking Time
              </Text>
              <TextInput
                value={cookingTime}
                onChangeText={setCookingTime}
                placeholder="30 mins"
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                <Users size={16} color="#4B5563" /> Servings
              </Text>
              <TextInput
                value={servings}
                onChangeText={setServings}
                placeholder="4 people"
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              />
            </View>
          </View>

          {/* Cuisine Selection */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Cuisine Type
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row space-x-2">
                {cuisineOptions.map((cuisine) => (
                  <TouchableOpacity
                    key={cuisine}
                    onPress={() => setSelectedCuisine(cuisine)}
                    className={`px-4 py-2 rounded-full ${
                      selectedCuisine === cuisine
                        ? "bg-blue-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <Text
                      className={`${
                        selectedCuisine === cuisine
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {cuisine}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Difficulty Level */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Difficulty Level
            </Text>
            <View className="flex-row space-x-2">
              {difficultyOptions.map((level) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => setDifficulty(level)}
                  className={`px-4 py-2 rounded-full ${
                    difficulty === level ? "bg-blue-500" : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`${
                      difficulty === level ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Ingredients */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Ingredients
            </Text>
            {ingredients.map((ingredient, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <TextInput
                  value={ingredient}
                  onChangeText={(value) => updateIngredient(index, value)}
                  placeholder={`Ingredient ${index + 1}`}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 mr-2"
                />
                {ingredients.length > 1 && (
                  <TouchableOpacity
                    onPress={() => removeIngredient(index)}
                    className="p-2"
                  >
                    <X size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <TouchableOpacity
              onPress={addIngredient}
              className="flex-row items-center justify-center border border-dashed border-gray-300 rounded-lg py-3 mt-2"
            >
              <Plus size={20} color="#3B82F6" />
              <Text className="text-blue-500 ml-2">Add Ingredient</Text>
            </TouchableOpacity>
          </View>

          {/* Instructions */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Instructions
            </Text>
            {instructions.map((instruction, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <Text className="text-gray-600 mr-2 mt-3">{index + 1}.</Text>
                <TextInput
                  value={instruction}
                  onChangeText={(value) => updateInstruction(index, value)}
                  placeholder={`Step ${index + 1}`}
                  multiline
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 mr-2"
                />
                {instructions.length > 1 && (
                  <TouchableOpacity
                    onPress={() => removeInstruction(index)}
                    className="p-2 mt-1"
                  >
                    <X size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <TouchableOpacity
              onPress={addInstruction}
              className="flex-row items-center justify-center border border-dashed border-gray-300 rounded-lg py-3 mt-2"
            >
              <Plus size={20} color="#3B82F6" />
              <Text className="text-blue-500 ml-2">Add Step</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-500 rounded-lg py-4 items-center justify-center flex-row"
          >
            <Upload size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold text-lg ml-2">
              Upload Recipe
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
