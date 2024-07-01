import { useState, useEffect } from "react";
import { UseGetUserInformation } from "./useGetUserInformation";
export type TodoProps = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
};

const useGetAllTodos = () => {
    const [allTodos, setAllTodos] = useState<TodoProps[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();
    const { userInformation } = UseGetUserInformation();
    useEffect(() => {
        if (!userInformation?.id) return;

        const fetchAllTodos = async () => {
            try {
                setError(undefined);
                const response = await fetch(
                    `https://dummyjson.com/todos/user/${userInformation.id}`
                );
                const data = await response.json();
                new Promise(() =>
                    setTimeout(() => {
                        setAllTodos(data.todos);
                        setLoading(false);
                    }, 1500)
                );
            } catch (e) {
                setError(e as Error);
            }
        };

        fetchAllTodos();
    }, []);

    return { allTodos, loading, error };
};

export default useGetAllTodos;
