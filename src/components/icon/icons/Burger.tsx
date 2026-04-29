import type { IconProps } from "../types";
import { Icon } from "../Icon";

export const Burger = (props: IconProps) => {
    return (
        <Icon size={36} {...props}>
            <path d="M152.669 10.1642H7.94975V29.3855H152.669V10.1642Z" fill="white" />
            <path d="M152.669 69.7642H7.94975V88.9854H152.669V69.7642Z" fill="white" />
            <path d="M152.669 129.38H7.94975V148.601H152.669V129.38Z" fill="white" />
        </Icon>
    )
};