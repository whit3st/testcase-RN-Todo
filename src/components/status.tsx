import React from "react";
import { Text } from "react-native";
const Status = ({ status }: { status: boolean }) => {
    if (status) {
        return (
            <Text className="bg-emerald-200 text-emerald-900 border border-emerald-500 text-xs px-2 py-1 rounded-md font-semibold">
                Completed
            </Text>
        );
    }
    return (
        <Text className="bg-red-200 text-red-900 border border-red-500 text-xs px-2 py-1 rounded-md font-semibold">
            Unfinished
        </Text>
    );
};

export default Status;
