import { ReactNode } from "react";

interface ButtonBaseProps {
    outline?: boolean;
    onClick: () => void;
    className?: string;
}

interface ButtonWithChildren extends ButtonBaseProps {
    type?:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "light"
        | "dark";
    children: ReactNode;
}

interface CloseButton extends ButtonBaseProps {
    type: "close";
    children?: never;
}

type ButtonProps = ButtonWithChildren | CloseButton;

function Button({
    children,
    type = "primary",
    onClick,
    outline = false,
    className,
}: ButtonProps) {
    const outlineText = () => (outline ? "outline-" : "");

    return (
        <button
            type="button"
            className={`btn btn-${outlineText() + type} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
