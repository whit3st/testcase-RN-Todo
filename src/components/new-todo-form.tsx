import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Switch, View, Text, Alert } from "react-native";
import { UseGetUserInformation } from "../hooks/useGetUserInformation";

const formSchema = z.object({
    todo: z.string().min(1, { message: "Todo is required" }),
    completed: z.boolean(),
    userId: z.number(),
});

type FormValues = z.infer<typeof formSchema>;

const NewTodoForm = ({
    setModalVisible,
}: {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { userInformation } = UseGetUserInformation();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const addNewTodoHandler = async (data: FormValues) => {
        Alert.alert("Todo Added Successfully", JSON.stringify(data, null, 2));
        setModalVisible(false);
    };

    if (userInformation) {
        return (
            <View className="flex flex-col mt-12 w-full">
                <Controller
                    control={control}
                    name="todo"
                    defaultValue=""
                    render={({ field: { value, onChange } }) => (
                        <View className="flex flex-column my-2">
                            <View className="flex flex-row justify-between items-center">
                                <Text className="text-lg font-semibold">Todo</Text>
                                <Controller
                                    control={control}
                                    name="completed"
                                    defaultValue={false}
                                    render={({ field: { value, onChange } }) => (
                                        <Switch value={value} onValueChange={onChange} />
                                    )}
                                />
                            </View>
                            <TextInput
                                className="px-2 py-1 text-black rounded-md border"
                                value={value}
                                onChangeText={onChange}
                            />
                        </View>
                    )}
                />
                {errors.todo && <Text>{errors.todo.message}</Text>}
                {errors.completed && <Text>{errors.completed.message}</Text>}
                <Controller
                    control={control}
                    name="userId"
                    defaultValue={userInformation?.id}
                    render={({ field: { value, onChange } }) => (
                        <TextInput
                            className="hidden"
                            value={value?.toString()}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.userId && <Text>{errors.userId.message}</Text>}
                <Text
                    className="text-lg font-semibold mt-2 bg-emerald-500 text-white p-2 rounded-md text-center"
                    onPress={handleSubmit(addNewTodoHandler)}
                >
                    Add Todo
                </Text>
            </View>
        );
    }
};

export default NewTodoForm;
