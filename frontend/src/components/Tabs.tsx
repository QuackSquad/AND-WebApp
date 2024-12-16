import { useEffect, useState } from "react";

interface TabsProps {
    items: { name: string; path: string }[];
    selectedPath: string | undefined;
}

function Tabs({ items, selectedPath }: TabsProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (selectedPath) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].path == selectedPath) {
                    setSelectedIndex(i);
                    break;
                }
            }
        }
    }, [selectedPath, items]);

    return (
        <>
            <ul className="nav nav-tabs">
                {items.map((item, index) => (
                    <li className="nav-item" key={index}>
                        <a
                            className={
                                selectedIndex === index
                                    ? "nav-link active"
                                    : "nav-link" +
                                      (item.name
                                          ? ""
                                          : " placeholder-wave active")
                            }
                            aria-current="page"
                            href={item.path}
                            onClick={() => setSelectedIndex(index)}
                        >
                            {item.name || (
                                <p
                                    className="reset-space placeholder"
                                    style={{
                                        display: "block",
                                        color: "var(--bs-link-color)",
                                    }}
                                >
                                    Loading...
                                </p>
                            )}
                        </a>
                    </li>
                ))}
            </ul>
            <ul className="list-group"></ul>
        </>
    );
}

export default Tabs;
