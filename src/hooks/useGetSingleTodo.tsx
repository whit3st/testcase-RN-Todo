import React, { useEffect, useState } from "react";
import { TodoProps } from "./useGetAllTodos";

const UseGetSingleTodo = (id: string) => {
    const [todo, setTodo] = useState<TodoProps>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();
    useEffect(() => {
        const fetchSingleTodo = async () => {
            try {
                setLoading(true);
                setError(undefined);
                const response = await fetch(`https://dummyjson.com/todos/${id}`);
                const data = await response.json();
                setTodo(data);
                setLoading(false);
            } catch (e) {
                const error = e as Error;
                setError(error);
                setLoading(false);
            }
        };

        fetchSingleTodo();
    }, [id]);
    return { todo, setTodo, loading, error };
};

export default UseGetSingleTodo;
