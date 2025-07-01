import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../utils/supabaseClient";

const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false);

        if (error) {
            Alert.alert("Login Failed", error.message);
        } else {
            Alert.alert("Success", "Logged in successfully!");
            // navigation.navigate("Home"); // Uncomment if using navigation
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-2xl font-bold mb-6 text-gray-800">Login</Text>
            <TextInput
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                className="bg-blue-600 rounded-md px-6 py-3 w-full items-center"
                onPress={handleLogin}
                disabled={loading}
            >
                <Text className="text-white text-base font-semibold">
                    {loading ? "Logging in..." : "Login"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};