import { useEffect, useRef, useMemo } from "react";

interface PlaceholderProps {
    length?: number;
    animation?: "none" | "wave" | "glow";
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

const Placeholder = ({
    length = 2,
    animation = "glow",
    type = "dark",
}: PlaceholderProps) => {
    const animationClass = useRef<string>("");
    const blockLength = useMemo(() => {
        const blocks: number[] = [];
        if (length <= 2) {
            blocks[0] = length;
        } else {
            let total = 0;
            while (total < length) {
                const block = Math.floor(Math.random() * 3) + 1;
                blocks.push(block);
                total += block;
            }
        }
        return blocks;
    }, [length]);

    useEffect(() => {
        if (animation === "wave") {
            animationClass.current = "placeholder-wave";
        } else if (animation === "glow") {
            animationClass.current = "placeholder-glow";
        } else {
            animationClass.current = "";
        }
    }, [animationClass, animation]);

    return (
        <p className={animationClass.current}>
            {blockLength.map((block, index) => (
                <span
                    key={index}
                    className={`placeholder col-${block} bg-${type}`}
                ></span>
            ))}
        </p>
    );
};

export default Placeholder;
