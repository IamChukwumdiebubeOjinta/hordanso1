import React from "react";

export interface Toast {
    LeftSvg?: React.ReactNode;
    RightSvg?: React.ReactNode;
    text?: string;
    className?: string;
    timeout?: number;
}