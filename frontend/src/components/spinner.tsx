import { useEffect, useRef } from "react";

interface SpinnerProps {
    type?:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "default"
        | "light"
        | "dark";
}

const Spinner = ({ type = "default" }: SpinnerProps) => {
    const typeRef = useRef(type);

    useEffect(() => {
        if (typeRef.current === "default") {
            const theme = localStorage.getItem("theme") || "dark";
            typeRef.current = theme === "dark" ? "light" : "dark";
        }
    }, [type]);

    return (
        <div className={"spinner-border text-" + typeRef.current} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default Spinner;
