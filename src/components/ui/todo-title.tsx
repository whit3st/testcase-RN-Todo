import React from "react";
import { Text } from "react-native";
const TodoTitle = ({ title }: { title: string }) => {
    return <Text className="text-black/90 font-semibold text-lg truncate w-4/6">{title}</Text>;
};

export default TodoTitle;
