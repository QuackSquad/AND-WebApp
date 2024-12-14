import { ReactNode } from "react";

interface DismissibleAlertProps {
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
    onDismiss: () => void;
}

function DismissibleAlert({ children, onDismiss }: DismissibleAlertProps) {
    return (
        <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
        >
            {children}
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={onDismiss}
            ></button>
        </div>
    );
}

export default DismissibleAlert;
