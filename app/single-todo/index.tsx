import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Check } from "lucide-react-native";
import React, { useState } from "react";
import { Text, View, TextInput, Switch, Vibration, Alert, Button } from "react-native";
import UseGetSingleTodo from "@/src/hooks/useGetSingleTodo";
import Status from "@/src/components/status";
const SingleTodo = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams() as {
        id: string;
    };
    const [emptyTodo, setEmptyTodo] = useState(false);
    const { error, loading, todo, setTodo } = UseGetSingleTodo(id);

    const updateTodo = async () => {
        if (!todo || !todo.todo) {
            setEmptyTodo(true);
            Vibration.vibrate(400);
            return;
        }
        try {
            setEmptyTodo(false);
            const res = await fetch(`https://dummyjson.com/todos/${id}`, {
                method: "PUT" /* or PATCH */,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    todo: todo.todo,
                    completed: todo.completed,
                }),
            });
            const data = await res.json();
            Alert.alert("Todo updated successfully", JSON.stringify(data, null, 2));
            Vibration.vibrate(400);
            router.back();
        } catch (e) {
            const error = e as Error;
            console.log(error.message);
            Alert.alert("Error Updating Todo", error.message);
        }
    };

    const deleteTodo = async () => {
        if (!todo) return;
        try {
            const res = await fetch(`https://dummyjson.com/todos/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            Alert.alert("Todo deleted successfully", JSON.stringify(data, null, 2));
            Vibration.vibrate(400);
            router.back();
        } catch (e) {
            const error = e as Error;
            console.log(error.message);
            alert(error.message);
        }
    };

    if (error) {
        return (
            <Text>
                <Stack.Screen
                    options={{
                        title: `Edit Todo ${id}`,
                        headerRight: () => <Check size={24} color={"black"} onPress={updateTodo} />,
                    }}
                />
                {error.message}
            </Text>
        );
    }

    if (loading) {
        return (
            <Text>
                <Stack.Screen
                    options={{
                        title: `Edit Todo ${id}`,
                        headerRight: () => <Check size={24} color={"black"} onPress={updateTodo} />,
                    }}
                />
                Loading...
            </Text>
        );
    }
    return (
        <View className="p-4 bg-emerald-50">
            <Stack.Screen
                options={{
                    headerRight: () => <Check size={24} color={"black"} onPress={updateTodo} />,
                    headerStyle: { backgroundColor: "#d1fae5" },
                    headerTitleAlign: "center",
                    headerTitle: "Edit Todo",
                }}
            />
            {todo && (
                <View className="h-full">
                    {/* todo.todo */}
                    <View className="flex flex-row justify-between bg-emerald-50">
                        <Text className="text-lg my-1 font-bold">Todo</Text>
                        <View className="flex flex-row items-center gap-2">
                            <Status status={todo?.completed} />
                            <Switch
                                value={todo?.completed}
                                onValueChange={(value) => setTodo({ ...todo, completed: value })}
                            />
                        </View>
                    </View>
                    <TextInput
                        className="text-black/90 p-2 text-lg border rounded-md"
                        defaultValue={todo?.todo}
                        onChangeText={(text) => setTodo({ ...todo, todo: text })}
                    ></TextInput>
                    {emptyTodo && <Text className="text-red-500">Todo cannot be empty</Text>}
                    <Text
                        className="text-lg my-2 font-bold bg-red-300 border border-red-500 text-center py-1.5 rounded-md"
                        onPress={deleteTodo}
                    >
                        Delete
                    </Text>
                </View>
            )}
        </View>
    );
};

export default SingleTodo;
