import Home from "@/src/components/home";
import { UseGetUserInformation } from "@/src/hooks/useGetUserInformation";
import Auth from "@/src/components/auth";
export default function Index() {
    const { userInformation } = UseGetUserInformation();

    if (!userInformation) {
        return <Auth />;
    }
    return <Home />;
}
