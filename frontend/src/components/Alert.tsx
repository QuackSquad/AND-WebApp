import { ReactNode } from "react";

interface AlertProps {
    children: ReactNode;
    type?:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "light"
        | "dark";
}

const Alert = ({ children, type = "primary" }: AlertProps) => {
    return (
        <div className={"alert alert-" + type} role="alert">
            {children}
        </div>
    );
};

export default Alert;
