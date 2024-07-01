import React from "react";
import { Link, router } from "expo-router";
import { View, Text } from "react-native";
import type { TodoProps } from "@/src/hooks/useGetAllTodos";
import { Pencil } from "lucide-react-native";
import Status from "./status";
import TodoTitle from "./ui/todo-title";
type ComponentProps = {
    todo: TodoProps;
};
const Todo = ({ todo }: ComponentProps) => {
    return (
        <View className="flex flex-row items-center justify-between w-full py-4 border-b">
            <TodoTitle title={todo.todo} />
            <View className="flex flex-row gap-x-2 items-center w-2/6">
                <Status status={todo.completed} />
                <Link
                    href={{
                        pathname: "/single-todo",
                        params: { id: todo.id },
                    }}
                >
                    <Pencil size={20} color="black" />
                </Link>
            </View>
        </View>
    );
};

export default Todo;
