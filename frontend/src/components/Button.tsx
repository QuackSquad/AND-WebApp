import { ReactNode } from "react";

interface ButtonBaseProps {
    onClick: () => void;
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

function Button({ children, type = "primary", onClick }: ButtonProps) {
    return (
        <button type="button" className={`btn btn-${type}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
