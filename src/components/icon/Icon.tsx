import { type IconProps } from "./types";

export const Icon = ({ size = 48, viewBox = "0 0 164 163", children, ...props }: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            fill="none"
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {children}
        </svg>
    )
};