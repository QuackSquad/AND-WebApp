import { useState } from "react";

interface TabsProps {
    items: string[];
    onSelectItem: (item: string) => void;
}

function Tabs({ items, onSelectItem }: TabsProps) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                        Active
                    </a>
                </li>
                {items.map((item, index) => (
                    <li
                        className="nav-item"
                        key={index}
                        onClick={() => {
                            if (onSelectItem) {
                                setSelectedIndex(index);
                                onSelectItem(item);
                            }
                        }}
                    >
                        <a
                            className={
                                selectedIndex === index
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            aria-current="page"
                            href="#"
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
            <ul className="list-group"></ul>
        </>
    );
}

export default Tabs;
