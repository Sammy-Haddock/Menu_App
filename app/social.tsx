import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Heart, MessageCircle, Share, Users } from "lucide-react-native";

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  recipe: {
    name: string;
    image: string;
    cuisine: string;
  };
  likes: number;
  comments: number;
  timeAgo: string;
}

const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    recipe: {
      name: "Homemade Pasta Carbonara",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&q=80",
      cuisine: "Italian",
    },
    likes: 24,
    comments: 8,
    timeAgo: "2h ago",
  },
  {
    id: "2",
    user: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
    recipe: {
      name: "Spicy Thai Green Curry",
      image:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&q=80",
      cuisine: "Thai",
    },
    likes: 18,
    comments: 5,
    timeAgo: "4h ago",
  },
  {
    id: "3",
    user: {
      name: "Emma Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    },
    recipe: {
      name: "Avocado Toast Deluxe",
      image:
        "https://images.unsplash.com/photo-1603046891744-76e6300f6869?w=500&q=80",
      cuisine: "American",
    },
    likes: 32,
    comments: 12,
    timeAgo: "6h ago",
  },
];

const PostCard = ({ post }: { post: Post }) => {
  return (
    <View className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
      {/* User Header */}
      <View className="flex-row items-center p-4 pb-2">
        <Image
          source={{ uri: post.user.avatar }}
          className="w-10 h-10 rounded-full"
          contentFit="cover"
        />
        <View className="ml-3 flex-1">
          <Text className="font-semibold text-gray-800">{post.user.name}</Text>
          <Text className="text-sm text-gray-500">{post.timeAgo}</Text>
        </View>
      </View>

      {/* Recipe Image */}
      <Image
        source={{ uri: post.recipe.image }}
        className="w-full h-64"
        contentFit="cover"
      />

      {/* Recipe Info */}
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800 mb-1">
          {post.recipe.name}
        </Text>
        <Text className="text-sm text-gray-600 mb-3">
          {post.recipe.cuisine}
        </Text>

        {/* Action Buttons */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity className="flex-row items-center">
              <Heart size={20} color="#EF4444" />
              <Text className="ml-1 text-gray-700">{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
              <MessageCircle size={20} color="#6B7280" />
              <Text className="ml-1 text-gray-700">{post.comments}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Share size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function SocialScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <View className="flex-row items-center mb-6">
            <Users size={28} color="#3B82F6" />
            <Text className="text-3xl font-bold text-gray-800 ml-2">
              Social Feed
            </Text>
          </View>
          <Text className="text-gray-600 mb-6">
            Discover recipes shared by the community
          </Text>

          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
