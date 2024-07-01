import {} from "react";
import { Text } from "react-native";
import type { TextProps } from "react-native";
import { cn } from "@/src/lib/cn";
const Button = ({ children, className, ...props }: TextProps) => {
    return (
        <Text
            {...props}
            className={cn(
                "font-bold text-sm text-white bg-emerald-500 border border-emerald-500 rounded-md px-4 py-2 my-2 text-center",
                className
            )}
        >
            {children}
        </Text>
    );
};

export default Button;
