import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

interface BSThemeProps {
    className?: string;
}

function BSTheme({ className }: BSThemeProps) {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <Button
            type="secondary"
            onClick={toggleTheme}
            outline={true}
            className={className}
        >
            <FontAwesomeIcon
                icon={theme === "light" ? faMoon : faSun}
                className="fa-lg"
            />
        </Button>
    );
}

export default BSTheme;
