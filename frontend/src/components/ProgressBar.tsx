interface ProgressBarProps {
    progress: number;
    height?: number;
    showLabel?: boolean;
    type?:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "light"
        | "dark"
        | "default";
}

const ProgressBar = ({
    progress,
    height = 16,
    showLabel = false,
    type = "default",
}: ProgressBarProps) => {
    return (
        <div
            className="progress"
            role="progressbar"
            style={{ height: height + "px" }}
        >
            <div
                className={
                    "progress-bar" + (type !== "default" ? " bg-" + type : "")
                }
                style={{ width: progress + "%", height: height + "px" }}
            >
                {showLabel && progress + "%"}
            </div>
        </div>
    );
};

export default ProgressBar;
