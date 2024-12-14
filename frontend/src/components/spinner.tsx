interface SpinnerProps {
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

const Spinner = ({ type = "dark" }: SpinnerProps) => {
    return (
        <div className={"spinner-border text-" + type} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default Spinner;
