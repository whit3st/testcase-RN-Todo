import { useState } from "react";
import useGetAllTodos from "@/src/hooks/useGetAllTodos";
import { View, Text, ScrollView, Modal } from "react-native";
import { Stack } from "expo-router";
import Todo from "./todo";
import { X, LogOut, PlusCircle } from "lucide-react-native";
import NewTodoForm from "./new-todo-form";
import { UseGetUserInformation } from "../hooks/useGetUserInformation";
const Home = () => {
    const { userInformation, setUserInformation } = UseGetUserInformation();
    const [modalVisible, setModalVisible] = useState(false);
    const { allTodos, error, loading } = useGetAllTodos();

    const logoutHandler = () => {
        setUserInformation(null);
    };

    return (
        <View className="relative flex flex-col py-2 w-full h-full bg-emerald-50">
            <Stack.Screen
                options={{
                    title: userInformation?.username,
                    headerRight: () => (
                        <View className="flex flex-row gap-x-5">
                            <PlusCircle
                                size={24}
                                onPress={() => setModalVisible(true)}
                                color={"black"}
                            />
                            <LogOut size={24} onPress={logoutHandler} color={"black"} />
                        </View>
                    ),
                    headerStyle: { backgroundColor: "#d1fae5" },
                }}
            />
            {error && <Text>{error.message}</Text>}
            {loading && <Text className="text-2xl m-auto">Loading...</Text>}
            {allTodos && (
                <ScrollView className="flex flex-col w-full p-3 gap-y-4">
                    <Text className="text-2xl text-emerald-800">Completed</Text>
                    {allTodos
                        ?.filter((todo) => todo.completed)
                        .map((todo) => (
                            <Todo key={todo.id} todo={todo} />
                        ))}
                    <Text className="text-2xl text-red-800 pt-6">Not Completed</Text>
                    {allTodos
                        ?.filter((todo) => !todo.completed)
                        .map((todo) => (
                            <Todo key={todo.id} todo={todo} />
                        ))}
                </ScrollView>
            )}
            {/* New Todo Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View className="flex flex-col w-full h-full px-4 py-8 bg-emerald-50">
                    {/* Modal Header */}
                    <View className="flex flex-row justify-between items-center w-full mx-auto">
                        <Text className="text-2xl font-semibold">Create New Todo</Text>
                        <X
                            size={32}
                            color={"black"}
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                    {/* Modal Content */}
                    <NewTodoForm setModalVisible={setModalVisible} />
                </View>
            </Modal>
        </View>
    );
};

export default Home;
