import { ReactNode } from "react";

interface CardProps {
    topElement?: ReactNode;
    title?: string;
    text?: string;
    bottomElement?: ReactNode;
    width?: string;
}

/**
 * A Card component that displays a card with optional top and bottom elements,
 * a title, and text content. The width of the card can be customized.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.topElement - An optional element to be displayed at the top of the card.
 * @param {string} props.title - An optional title for the card.
 * @param {string} props.text - Optional text content for the card.
 * @param {React.ReactNode} props.bottomElement - An optional element to be displayed at the bottom of the card.
 * @param {string} [props.width="18rem"] - The width of the card. Defaults to "18rem".
 *
 * @returns {JSX.Element} The rendered Card component.
 */
function Card({
    topElement,
    title,
    text,
    bottomElement,
    width = "18rem",
}: CardProps) {
    return (
        <div className="card" style={{ width: width, padding: "0" }}>
            {topElement}
            <div className="card-body">
                {title && <h5 className="card-title">{title}</h5>}
                {text && <p className="card-text">{text}</p>}
                {bottomElement}
            </div>
        </div>
    );
}

export default Card;
