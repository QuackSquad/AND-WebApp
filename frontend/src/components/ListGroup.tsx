import { /*MouseEvent,*/ useState } from "react";

interface ListGroupProps {
    items: string[];
    onSelectItem?: (item: string) => void;
}

function ListGroup({ items, onSelectItem }: ListGroupProps) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const getMessages = () => {
        return items.length === 0 && <p>No items</p>;
    };

    return (
        <>
            {getMessages()}
            <ul className="list-group">
                {items.map((item, index) => (
                    <li
                        className={
                            selectedIndex === index
                                ? "list-group-item active"
                                : "list-group-item"
                        }
                        key={index}
                        onClick={() => {
                            if (onSelectItem) {
                                setSelectedIndex(index);
                                onSelectItem(item);
                            }
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ListGroup;
