import React, { forwardRef } from "react";
import { TextInput as RNTextInput } from "react-native";
import type { TextInputProps } from "react-native";
import { cn } from "@/src/lib/cn";

const TextInput = forwardRef<RNTextInput, TextInputProps>(({ className, ...props }, ref) => {
    return (
        <RNTextInput
            {...props}
            ref={ref}
            className={cn(
                "h-10 bg-emerald-50 font-semibold border-emerald-500 border rounded-md px-2 my-1",
                className
            )}
        />
    );
});

export default TextInput;
