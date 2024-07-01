import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import AuthForm from "./auth-form";
const Auth = () => {
    return (
        <View className="p-4">
            <Stack.Screen options={{ title: "Auth" }} />
            <AuthForm />
        </View>
    );
};

export default Auth;
