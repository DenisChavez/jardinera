import React, { type SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement>{
    size?: number
    viewBox?: string
    children?: React.ReactNode
    onClick?: () => void
}