import { useEffect, useState, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import z from "zod";

export const userSchema = z.object({
    id: z.number().default(Math.floor(Math.random() * 100)),
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    keepLoggedIn: z.boolean(),
});

export type User = z.infer<typeof userSchema>;
type UserContextType = {
    userInformation: User | null;
    setUserInformation: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userInformation, setUserInformation] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const value = JSON.parse(
                    (await AsyncStorage.getItem("userInformation")) as string
                ) as User;
                if (value !== null && value.keepLoggedIn) {
                    const data = value;
                    setUserInformation(data);
                } else {
                    setUserInformation(null);
                }
            } catch (e) {
                alert((e as Error).message);
            }
        };

        fetchUserInformation();
    }, []);

    return (
        <UserContext.Provider value={{ userInformation, setUserInformation }}>
            {children}
        </UserContext.Provider>
    );
};

export const UseGetUserInformation = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyContextProvider");
    }
    return context;
};
