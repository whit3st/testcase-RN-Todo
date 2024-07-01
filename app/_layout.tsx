import { Stack } from "expo-router";
import { UserProvider } from "@/src/hooks/useGetUserInformation";
export default function RootLayout() {
    return (
        <UserProvider>
            <Stack />
        </UserProvider>
    );
}
