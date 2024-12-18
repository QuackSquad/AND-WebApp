import { ReactNode } from "react";

interface ListCardProps {
    title?: string;
    width?: string;
    height?: string;
    listHeaders: string[] | ReactNode[];
    list: string[][] | ReactNode[][];
    maxWidth?: string;
    minWidth?: string;
}

/**
 * A React component that renders a card with a title and a list in a table format.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the card.
 * @param {string} [props.width="18rem"] - The width of the card.
 * @param {string} [props.height="400px"] - The height of the card.
 * @param {string[]} props.listHeaders - The headers for the list table.
 * @param {Array<Array<string>>} props.list - The list data to be displayed in the table.
 * @param {string} [props.maxWidth="none"] - The maximum width of the card.
 * @param {string} [props.minWidth="none"] - The minimum width of the card.
 *
 * @returns {JSX.Element} The rendered ListCard component.
 */
function ListCard({
    title,
    width = "18rem",
    height = "400px",
    listHeaders,
    list,
    maxWidth = "none",
    minWidth = "none",
}: ListCardProps) {
    return (
        <div
            className="card"
            style={{
                width: width,
                height: height,
                padding: "0",
                maxWidth: maxWidth,
                minWidth: minWidth,
            }}
        >
            {/* Card title */}
            <div className="card-body">
                {title && <h5 className="card-title">{title}</h5>}
            </div>
            {/* Card table */}
            <div
                className="overflow-y-auto overflow-x-hidden"
                style={{
                    height: `calc(${height} - 2rem)`,
                }}
            >
                <table
                    className="table table-hover list-card-table no-select"
                    style={{
                        width: `calc(${width} - 2px)`,
                        overflow: "hidden",
                    }}
                >
                    {/* Table headers */}
                    <thead>
                        <tr>
                            {listHeaders.map((header, index) => (
                                <th
                                    scope="col"
                                    className="text-center"
                                    key={index}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* Table data */}
                    <tbody>
                        {list.map((row, index) => (
                            <tr className="text-center" key={index}>
                                {row.map((cell, index) => (
                                    <td key={index}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListCard;
