import React, { useState, useRef } from "react";
import { View, Text, Switch, Alert, TextInput as RNTextInput } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseGetUserInformation, type User, userSchema } from "../hooks/useGetUserInformation";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInput from "./ui/text-input";
import Button from "./ui/button";
const AuthForm = () => {
    const usernameRef = useRef<RNTextInput>(null);
    const [state, setState] = useState<"login" | "register">("login");
    const { setUserInformation } = UseGetUserInformation();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<User>({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = async (data: User) => {
        if (state === "register") {
            AsyncStorage.setItem("userInformation", JSON.stringify(data));
            setUserInformation(data);
        }

        if (state === "login") {
            const userDataFromLocalStorage = JSON.parse(
                (await AsyncStorage.getItem("userInformation")) as string
            ) as User;
            if (
                userDataFromLocalStorage &&
                userDataFromLocalStorage?.username === data.username &&
                userDataFromLocalStorage?.password === data.password
            ) {
                setUserInformation(data);
                Alert.alert("Login Successful", JSON.stringify(userDataFromLocalStorage, null, 2));
            } else {
                Alert.alert("Login Failed", "Username or password is incorrect");
            }
        }
    };

    const stateChangeHandler = () => {
        setState(state === "login" ? "register" : "login");
        usernameRef.current?.focus();
        reset();
    };
    return (
        <View className="flex flex-col justify-center h-full">
            <Text className="text-2xl font-semibold text-center my-4 capitalize">{state}</Text>
            <Controller
                control={control}
                name="username"
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                    <TextInput
                        ref={usernameRef}
                        id="username"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Username"
                    />
                )}
            />
            {errors.username && <Text className="text-red-500">{errors.username.message}</Text>}
            <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                    <TextInput
                        id="password"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Password"
                        secureTextEntry
                    />
                )}
            />
            {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
            <View
                className={`flex flex-row items-center justify-center ${
                    state === "login" ? "" : "hidden"
                }`}
            >
                <Text>Keep me logged in</Text>
                <Controller
                    control={control}
                    name="keepLoggedIn"
                    defaultValue={true}
                    render={({ field: { value, onChange } }) => (
                        <Switch value={value} onValueChange={onChange} />
                    )}
                />
            </View>
            {errors.keepLoggedIn && (
                <Text className="text-red-500">{errors.keepLoggedIn.message}</Text>
            )}
            <Button className="capitalize" onPress={handleSubmit(onSubmit)}>
                {state}
            </Button>
            <View className="flex flex-row items-center justify-center my-2">
                <Text>
                    {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                </Text>
                <Text
                    className="text-emerald-600 underline capitalize"
                    onPress={() => stateChangeHandler()}
                >
                    {state === "login" ? "Register" : "Login"}
                </Text>
            </View>
        </View>
    );
};

export default AuthForm;
