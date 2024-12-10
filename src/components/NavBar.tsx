import { ReactNode, useState } from "react";

interface NavBarProps {
    title: string;
    pages: {
        name: string;
        path: string;
        component: () => ReactNode;
        disabled: boolean;
    }[];
}

function NavBar({ title, pages }: NavBarProps) {
    const [hamburgerShown, setHamburgerShown] = useState(false);
    const [hamburgerAnimation, setHamburgerAnimation] = useState(false);

    return (
        // NavBar breakpoint setting: -sm|-md|-lg|-xl|-xxl
        <nav className="navbar bg-body-tertiary fixed-top navbar-expand-md">
            <div className="container-fluid">
                {/* Title */}
                <a className="navbar-brand" href="/">
                    {title}
                </a>
                {/* Hamburger menu button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                    onClick={() => {
                        setHamburgerShown(true);
                        setHamburgerAnimation(true);
                    }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Hamburger menu */}
                <div
                    className={
                        "offcanvas offcanvas-end " +
                        (hamburgerShown
                            ? "show showing"
                            : hamburgerAnimation
                            ? "hiding"
                            : "")
                    }
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    aria-modal="true"
                    role="dialog"
                >
                    {/* Hamburger menu title and cross*/}
                    <div className="offcanvas-header">
                        <h5
                            className="offcanvas-title"
                            id="offcanvasNavbarLabel"
                        >
                            {title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            onClick={() => {
                                setHamburgerShown(false);
                                setTimeout(
                                    () => setHamburgerAnimation(false),
                                    500
                                );
                            }}
                        ></button>
                    </div>
                    {/* Menu items */}
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                            {pages.map(({ path, name, disabled }) => (
                                <li className="nav-item">
                                    <a
                                        className={
                                            "nav-link " +
                                            (disabled ? "disabled" : "active")
                                        }
                                        aria-current="page"
                                        href={path}
                                        key={name}
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Hamburger menu backdrop */}
                {hamburgerAnimation && (
                    <div
                        className={
                            "offcanvas-backdrop fade " +
                            (hamburgerShown ? "fade show showing" : "hiding")
                        }
                        onClick={() => {
                            setHamburgerShown(false);
                            setTimeout(() => setHamburgerAnimation(false), 500);
                        }}
                    ></div>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
